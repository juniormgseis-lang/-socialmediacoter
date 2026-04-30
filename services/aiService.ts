
import { GoogleGenAI, Type } from "@google/genai";
import { GenerationParams, SocialMediaContent, VisualStyle, AIProvider, IDEIAS_FORCA_MAP, LinhaDeEsforco } from "../types";

const TEXT_MODEL_FLASH = 'gemini-3-flash-preview'; 
const IMAGE_MODEL_GEMINI = 'gemini-2.5-flash-image';

// Tenta obter a chave preferencialmente de process.env.GEMINI_API_KEY (injetado pelo sistema)
const GEMINI_KEY = (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : '') || (import.meta.env.VITE_GEMINI_API_KEY as string) || '';

if (!GEMINI_KEY) {
  console.warn("Chave do Gemini não detectada. O sistema pode falhar.");
}

const genAI = new GoogleGenAI({ apiKey: GEMINI_KEY });

/**
 * Função auxiliar para gerar conteúdo com fallback e tratamento de erros
 */
async function callGeminiWithFallback(contents: any, systemInstruction: string, includeTools: boolean): Promise<any> {
  const modelsToTry = [TEXT_MODEL_FLASH, 'gemini-flash-latest'];
  
  let lastError: any = null;

  for (const modelToTry of modelsToTry) {
    try {
      const response = await genAI.models.generateContent({
        model: modelToTry,
        contents,
        config: {
          systemInstruction,
          tools: includeTools ? [{ googleSearch: {} }] : [],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              instagram: { type: Type.STRING },
              instagramTitle: { type: Type.STRING },
              instagramTitleOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
              instagramTitleJustification: { type: Type.STRING },
              whatsapp: { type: Type.STRING },
              whatsappTitle: { type: Type.STRING },
              whatsappTitleOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
              whatsappTitleJustification: { type: Type.STRING },
              article: { type: Type.STRING },
              articleTitle: { type: Type.STRING },
              articleTitleOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
              articleTitleJustification: { type: Type.STRING },
              riskAnalysis: { type: Type.STRING },
              impactMetrics: { type: Type.STRING },
              sources: { type: Type.ARRAY, items: { type: Type.STRING } },
              conflictWarnings: { type: Type.STRING },
              visualIdentitySuggestion: { type: Type.STRING },
              selectedLinha: { type: Type.STRING },
              selectedIdeia: { type: Type.STRING }
            },
            required: [
              "instagram", "instagramTitle", "instagramTitleOptions", "instagramTitleJustification",
              "whatsapp", "whatsappTitle", "whatsappTitleOptions", "whatsappTitleJustification",
              "article", "articleTitle", "articleTitleOptions", "articleTitleJustification",
              "riskAnalysis", "impactMetrics", "sources", "conflictWarnings", "visualIdentitySuggestion",
              "selectedLinha", "selectedIdeia"
            ]
          }
        }
      });
      return response;
    } catch (error: any) {
      lastError = error;
      const errorStr = JSON.stringify(error);
      
      if (errorStr.includes('429') || errorStr.includes('503') || errorStr.includes('RESOURCE_EXHAUSTED')) {
        console.warn(`Modelo ${modelToTry} falhou. Tentando fallback...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        continue; 
      }
      throw error;
    }
  }
  throw lastError;
}

export async function generateOperationalImage(params: GenerationParams): Promise<string | undefined> {
  try {
    const styleInstruction = params.style === VisualStyle.REAL_PHOTOS 
      ? "Crie uma imagem realista com estética fotográfica profissional, luz natural, alta definição, estilo fotojornalismo militar contemporâneo."
      : "Crie uma ilustração épica e moderna, com estilo cinematográfico, cores sóbrias e impacto visual de alta qualidade.";

    const prompt = `
      ${styleInstruction}
      ASSUNTO DA IMAGEM: Uma cena operacional do Exército Brasileiro executando: "${params.topic}".
      CONTEXTO DOUTRINÁRIO: Relacionado a "${params.linha}" e focado em "${params.ideiaForca}".
      
      ESTRUTURA DE COMPOSIÇÃO (ESTRITAMENTE OBRIGATÓRIA):
      1. FORMATO: Quadrado.
      2. CENÁRIO: A atividade militar descrita deve ocupar todo o quadro com foco na operacionalidade e prontidão.
      
      RESTRIÇÃO ABSOLUTA (ZERO TOLERÂNCIA):
      - NÃO INCLUA NENHUM TEXTO, PALAVRA, LETRA, NÚMERO OU CARACTERE NA IMAGEM.
      - NÃO INCLUA NENHUM LOGOTIPO, BRASÃO, ESCUDO OU SÍMBOLO.
      
      ESTILO: Prontidão e profissionalismo (Persona TC Luiz Alves).
    `;

    if (!GEMINI_KEY) throw new Error("A chave do Gemini não foi detectada. Verifique as configurações do sistema.");
    
    const response = await genAI.models.generateContent({
      model: IMAGE_MODEL_GEMINI,
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "1:1" } }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return undefined;
  } catch (error) {
    console.error("Erro na geração de imagem:", error);
    throw error;
  }
}

export async function generateOperationalContent(params: GenerationParams): Promise<SocialMediaContent> {
  try {
    const isAiDefined = params.linha === LinhaDeEsforco.DEFINIR_POR_IA;
    
    const doctrinalContext = isAiDefined 
      ? `MODO AUTOMÁTICO - DEFINIÇÃO AUTOMÁTICA:
         Analise o tópico "${params.topic}" e escolha a Linha de Esforço e a Ideia-Força mais adequadas da lista oficial do COTER abaixo:
         ${Object.entries(IDEIAS_FORCA_MAP)
           .filter(([key]) => key !== LinhaDeEsforco.DEFINIR_POR_IA)
           .map(([key, ideas]) => `LINHA: ${key}\nIDEIAS:\n- ${ideas.join('\n- ')}`)
           .join('\n\n')}
         Você deve declarar qual foi sua escolha nas propriedades "selectedLinha" e "selectedIdeia" do JSON de retorno. Toda a redação deve ser baseada nessa escolha automática.`
      : "";

    const urlContext = params.referenceUrl 
      ? `URL DE REFERÊNCIA TÉCNICA: ${params.referenceUrl}\nUtilize a busca integrada para acessar e fundamentar o conteúdo com base nesta URL.` 
      : "";

    const customDoctrineContext = `
      ${params.customSource ? `FONTE TÉCNICA (TEXTO/PDF): \n"""\n${params.customSource}\n"""\n` : ""}
      ${urlContext}
      DIRETRIZ: As fontes técnicas fornecidas (PDF, Texto ou URL) são sua base de verdade absoluta. O Grounding (Busca Google) deve ser usado para complementar ou acessar a URL fornecida.
    `;

    const systemInstruction = `
      IDENTIDADE: Você é o Tenente-Coronel Luiz Alves, Chefe da Comunicação Estratégica Operacional do COTER.
      MISSÃO: Produzir conteúdo estratégico alinhado às Diretrizes do Comando.
      REQUISITOS DE LINGUAGEM: Norma culta da língua portuguesa, tom técnico e autoritário.

      ${doctrinalContext}

      GROUNDING: Se uma URL foi fornecida, PRIORIZE as informações contidas nela via busca. Caso contrário, utilize busca na internet para fundamentar o conteúdo em diretrizes oficiais militares brasileiras (Exército Brasileiro, Ministério da Defesa, etc.).

      FORMATO OBRIGATÓRIO: Retorne APENAS um objeto JSON válido.
      
      ESTRUTURA JSON:
      {
        "instagram": "texto da legenda",
        "instagramTitle": "título selecionado como melhor",
        "instagramTitleOptions": ["opção 1", "opção 2", "opção 3"],
        "instagramTitleJustification": "justificativa de 1 linha com base na ideia-força",
        "whatsapp": "texto da mensagem",
        "whatsappTitle": "título selecionado como melhor",
        "whatsappTitleOptions": ["opção 1", "opção 2", "opção 3"],
        "whatsappTitleJustification": "justificativa de 1 linha com base na ideia-força",
        "article": "markdown",
        "articleTitle": "título selecionado como melhor",
        "articleTitleOptions": ["opção 1", "opção 2", "opção 3"],
        "articleTitleJustification": "justificativa de 1 linha com base na ideia-força",
        "riskAnalysis": "texto",
        "impactMetrics": "texto",
        "sources": ["fonte1", "fonte2"],
        "conflictWarnings": "texto ou vazio",
        "visualIdentitySuggestion": "descrição detalhada da imagem sugerida para este conteúdo",
        "selectedLinha": "Nome da linha de esforço utilizada (seja fornecida ou escolhida pela IA)",
        "selectedIdeia": "Texto da ideia-força utilizada (seja fornecida ou escolhida pela IA)"
      }

      INSTRUÇÕES PARA GERAÇÃO DOS TÍTULOS (HEADLINES):
      Atue como um especialista em Comunicação Estratégica do Exército Brasileiro, seguindo o padrão institucional do COTER (Comando de Operações Terrestres).
      Sua missão é criar títulos para matérias institucionais. Para cada formato (Instagram, WhatsApp e Artigo), você deve obrigatoriamente gerar 3 títulos institucionais no padrão COTER, indicar o melhor no campo "Title" e listar as 3 opções no campo "Options", justificando a escolha no campo "Justification".
      
      CRITÉRIOS DOS TÍTULOS:
      1. Título claro, direto e objetivo.
      2. Deve conter VERBO DE AÇÃO (ex: realiza, coordena, participa, reforça, demonstra).
      3. O SUJEITO INSTITUCIONAL deve estar explícito (ex: COTER, Exército Brasileiro ou Força Terrestre).
      4. Deve refletir a Ideia-Força: ${isAiDefined ? "a selecionada por você" : `"${params.ideiaForca}"`}.
      5. Deve estar alinhado à Linha de Esforço: ${isAiDefined ? "a selecionada por você" : `"${params.linha}"`}.
      6. Sobriedade institucional (sem adjetivações excessivas).
      7. Extensão entre 50 e 70 caracteres.
      8. Evite redundâncias.

      REQUISITOS GERAIS PARA TODOS OS TEXTOS:
      1. Os parágrafos devem ser OBRIGATORIAMENTE separados por exatamente DUAS quebras de linha (\n\n) para garantir o espaçamento visual.
      2. Mantenha o tom institucional e técnico (Persona TC Luiz Alves).
      3. **REGRA CRÍTICA DE REDAÇÃO (IDEIA-FORÇA):** A Ideia-Força ${isAiDefined ? "selecionada por você" : `"${params.ideiaForca}"`} NÃO deve ser reproduzida literalmente no texto final. Ela deve ser interpretada, parafraseada obrigatoriamente e adaptada ao contexto de forma natural, integrada ao texto (preferencialmente no início). É PROIBIDO copiar total ou parcialmente a ideia-força original. O trecho que representa essa ideia-força parafraseada DEVE permanecer em **negrito**.

      SUGESTÃO DE IDENTIDADE VISUAL:
      Sempre apresente uma sugestão detalhada de qual imagem ou vídeo deveria acompanhar esta postagem caso não haja uma imagem gerada. Descreva o cenário, os elementos militares, a iluminação e o sentimento que a imagem deve transmitir.

      REQUISITOS ESPECÍFICOS POR FORMATO:
      FOQUE A GERAÇÃO APENAS NESTES FORMATOS: ${params.formats.join(', ')}. 
      Os formatos não incluídos nesta lista devem ter seus valores retornados como string vazia ("") no JSON.

      1. INSTAGRAM: O texto deve ter OBRIGATORIAMENTE exatamente 3 parágrafos distintos. A paráfrase da Ideia-Força ${isAiDefined ? "selecionada" : `"${params.ideiaForca}"`} DEVE ser obrigatoriamente integrada ao texto logo no PRIMEIRO parágrafo e estar em **negrito**. Use emojis de forma sóbria.
      2. WHATSAPP: Texto ágil, sem limitação de parágrafos. A Ideia-Força parafraseada deve estar em **negrito**.
      3. ARTIGO TÉCNICO-DOUTRINÁRIO: Produza um conteúdo denso e detalhado, com quantos parágrafos forem necessários para aprofundar o tema doutrinariamente. A Ideia-Força parafraseada deve aparecer em **negrito** onde for introduzida.

      DESTAQUE GERAL: Nunca use a frase literal da Ideia-Força. Reinterprete-a e aplique o destaque em **negrito** na nova construção textual.
    `;

    const prompt = `Gere conteúdo estratégico para o tópico: "${params.topic}". Contexto: ${customDoctrineContext}`;

    if (!GEMINI_KEY) throw new Error("A chave do Gemini não foi detectada. Verifique as configurações do sistema.");
    
    const isFlash = params.provider === AIProvider.GEMINI_FLASH;

    const contents = { 
      parts: [
        ...params.images.map(img => ({ inlineData: { data: img.data, mimeType: img.mimeType } })), 
        { text: prompt }
      ] 
    };

    const response = await callGeminiWithFallback(contents, systemInstruction, true);

    const rawText = response.text || '{}';
    let jsonContent = rawText;
    
    // Tenta extrair JSON de blocos de código se existirem
    const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/) || rawText.match(/```([\s\S]*?)```/);
    if (jsonMatch && jsonMatch[1]) {
      jsonContent = jsonMatch[1];
    }
    
    const content = JSON.parse(jsonContent) as SocialMediaContent;
    const groundingLinks = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter((chunk: any) => chunk.web)
      ?.map((chunk: any) => ({ title: chunk.web?.title || 'Fonte', uri: chunk.web?.uri || '' })) || [];

    return { ...content, sourceLinks: groundingLinks };
  } catch (error: any) {
    console.error("Erro na geração de conteúdo:", error);
    const errorStr = typeof error === 'string' ? error : JSON.stringify(error);
    
    if (errorStr.includes('429') || errorStr.includes('RESOURCE_EXHAUSTED') || errorStr.includes('quota')) {
      throw new Error("COTA EXCEDIDA: O motor atingiu o limite de envios do plano gratuito.");
    }

    if (errorStr.includes('503')) {
      throw new Error("SISTEMA SOBRECARREGADO: O serviço do Google está com alta demanda.");
    }
    
    throw new Error("Falha na comunicação com a IA: " + (error?.message || "Erro desconhecido"));
  }
}
