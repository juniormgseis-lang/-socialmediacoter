# 📑 Manual do Usuário - Social Media Factory (Estratégia 2026)

Este documento detalha o funcionamento, a arquitetura de prompts e os requisitos técnicos da aplicação desenvolvida para o **COTER**.

---

## 1. Visão Geral
A plataforma é uma ferramenta estratégica de apoio à comunicação social, projetada para converter tópicos e diretrizes doutrinárias em conteúdos adaptados para diferentes mídias sociais (Instagram, WhatsApp e Artigos Técnicos).

### Persona Principal: **TC LUIZ ALVES**
Toda a geração de texto é baseada na persona do **TC Luiz Alves**, caracterizada por:
- **Tom:** Institucional, técnico, resolutivo e marcial.
- **Linguagem:** Doutrina de comunicações militares, precisa e sóbria.
- **Objetivo:** Influência estratégica e disseminação de valores institucionais.

---

## 2. Fluxo de Operação
1. **Definição de Tópico:** O usuário insere o assunto principal da postagem.
2. **Ideia-Força:** Conceito central que deve nortear o argumento. **Regra Crítica:** A ideia-força nunca deve ser copiada literalmente; ela deve ser obrigatoriamente parafraseada e destacada em negrito no texto final.
3. **Seleção de Formato:** O sistema processa as instruções específicas para o canal desejado.
4. **Geração IA:** O motor baseado em Gemini processa o prompt com as restrições militares aplicadas.

---

## 3. Segurança e Acesso
A plataforma possui uma camada de proteção para garantir que apenas pessoal autorizado utilize o motor de IA:
- **Senha de Acesso:** `@coter`
- **Sessão:** A autenticação é mantida durante a sessão do navegador. Ao clicar no ícone de lixeira (Encerrar Sessão) no cabeçalho ou fechar a aba, a senha será solicitada novamente.

---

## 4. Fontes de Inteligência e Contexto

Para garantir a precisão doutrinária e o alinhamento estratégico, o sistema utiliza duas fontes principais de dados:

### 🎯 Contexto Situacional (Missão / Evento)
Descrição livre da operação ou evento. É a base factual para que a IA processe os dados reais da missão.

### 📄 Inteligência Técnica (PDF)
Nesta seção, o que deve ser inserido é o documento base (contexto) que servirá de fonte primária para a inteligência artificial. De acordo com a estrutura do sistema, esse campo é destinado ao upload de arquivos em PDF que contenham:

- **Diretrizes Estratégicas:** Documentos formais e ordens de operações.
- **Doutrina Militar:** Trechos de manuais de campanha ou regulamentos que devem embasar o texto.
- **Matérias Técnicas ou Relatórios:** Informações detalhadas sobre a missão ou evento operacional.
- **Artigos de Referência:** Qualquer material escrito que forneça a "substância" técnica para que a persona (**TC Luiz Alves**) possa extrair fatos, fontes e métricas de impacto.

**Processamento de Dados:**
No sistema, esse arquivo é processado (indexado) e usado para:
1. Extrair fontes de consulta reais.
2. Alimentar os indicadores de impacto (KPIs).
3. Realizar a análise de risco reputacional.
4. Garantir que os posts de redes sociais e artigos não sejam apenas criativos, mas tecnicamente fundamentados na doutrina do Exército.

> **Resumo:** É onde você "anexa o conhecimento" para que a IA não invente dados, mas sim refine o que já existe no padrão COTER.

---

## 5. Requisitos de Conteúdo (Implementação Técnica)

Conforme as últimas atualizações, o sistema segue rigorosamente os seguintes parâmetros de formatação:

### 📸 Instagram
- **Estrutura:** Exatamente **3 parágrafos**.
- **Regra de Ouro:** A **Ideia-Força** deve ser integrada obrigatoriamente no **primeiro parágrafo**, mas de forma **parafraseada** (nunca literal) e em **negrito**.
- **Visual:** Uso de emojis de forma sóbria e técnica.
- **Espaçamento:** Parágrafos separados por duas quebras de linha (`\n\n`) no texto gerado.

### 💬 WhatsApp
- **Estrutura:** Texto ágil e direto.
- **Parágrafos:** Sem limitação de quantidade, focado na rapidez da leitura.

### 📝 Artigo Técnico-Doutrinário
- **Estrutura:** Conteúdo denso e detalhado.
- **Extensão:** Sem limite de parágrafos, priorizando o aprofundamento do tema e a fundamentação doutrinária.

---

## 5. Anexo: Lógica do Script (`aiService.ts`)

Abaixo está a representação da lógica de prompt implementada no serviço de IA para garantir a padronização:

```typescript
// Configuração de Prompts no aiService.ts
REQUISITOS GERAIS PARA TODOS OS TEXTOS:
1. Os parágrafos devem ser OBRIGATORIAMENTE separados por exatamente DUAS quebras de linha (\n\n).
2. Mantenha o tom institucional e técnico (Persona TC Luiz Alves).
3. **REGRA DA IDEIA-FORÇA:** É proibido copiar a frase literal da ideia-força. Ela deve ser reinterpretada semanticamente e destacada em **negrito**.

REQUISITOS ESPECÍFICOS POR FORMATO:
1. INSTAGRAM: Exatamente 3 parágrafos. Paráfrase da Ideia-Força em **negrito** no 1º parágrafo.
2. WHATSAPP: Texto ágil, sem limitação de parágrafos.
3. ARTIGO TÉCNICO-DOUTRINÁRIO: Conteúdo denso, com parágrafos necessários para aprofundar o tema.
```

---

## 6. Créditos e Equipe
- **Concepção:** TC Luiz Alves
- **Desenvolvimento e Implementação:** ST Ernani P. Júnior

---

## 7. Observação Legal e Institucional

Os textos produzidos por este aplicativo são gerados com o emprego de Inteligência Artificial e possuem caráter sugestivo, destinando-se a orientar a elaboração de matérias em conformidade com os princípios da Comunicação Estratégica no âmbito do Comando de Operações Terrestres, contribuindo para a padronização da linguagem institucional, sem prejuízo da necessária revisão, adequação e validação por parte do usuário.

---
*Documento gerado automaticamente pelo sistema em 24 de Abril de 2026.*
