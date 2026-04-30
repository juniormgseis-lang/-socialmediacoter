/**
 * CLOUDFLARE WORKER PARA GOOGLE GEMINI API
 * Este código deve ser colado no editor do Cloudflare Worker.
 * Certifique-se de configurar a variável secreta "VITE_GEMINI_API_KEY" no painel do Cloudflare.
 */

export default {
  async fetch(request, env, ctx) {
    // 1. Logs para Debug (Visíveis no Console do Cloudflare)
    console.log("Requisição recebida no Worker");
    
    const API_KEY = env.VITE_GEMINI_API_KEY;
    if (!API_KEY) {
      console.error("ERRO: VITE_GEMINI_API_KEY não configurada nas variáveis de ambiente!");
      return new Response(JSON.stringify({ error: "Chave de API não configurada no servidor." }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. Apenas aceita POST
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Método não permitido. Use POST." }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }

    try {
      // 3. Lê o prompt do corpo da requisição
      const { prompt } = await request.json();
      if (!prompt) {
        return new Response(JSON.stringify({ error: "Campo 'prompt' é obrigatório no JSON." }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      console.log(`Gerando conteúdo para o prompt: ${prompt.substring(0, 50)}...`);

      // 4. Configuração do Gemini (Modelo 1.5-Flash recomendado)
      const MODEL = "gemini-1.5-flash";
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

      const geminiResponse = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await geminiResponse.json();

      // 5. Tratamento de Erros da API do Gemini
      if (!geminiResponse.ok) {
        console.error(`Erro na API do Gemini: ${geminiResponse.status}`, data);
        
        if (geminiResponse.status === 429) {
          return new Response(JSON.stringify({ error: "Cota excedida no Gemini. Tente novamente mais tarde." }), {
            status: 429,
            headers: { "Content-Type": "application/json" }
          });
        }
        
        return new Response(JSON.stringify({ error: "Erro na comunicação com o Gemini.", details: data }), {
          status: geminiResponse.status,
          headers: { "Content-Type": "application/json" }
        });
      }

      // 6. Retorna a resposta com sucesso
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*" // Opcional: permite chamadas de qualquer domínio
        }
      });

    } catch (err) {
      console.error("Erro interno no Worker:", err);
      return new Response(JSON.stringify({ error: "Falha interna no processamento.", message: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};
