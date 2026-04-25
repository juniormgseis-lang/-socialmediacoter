# 📑 PROMPT MESTRE: COTER AI Factory (Estratégia 2026)

Este documento contém a instrução estruturada para a reprodução fiel da aplicação **COTER AI Factory**, focada em comunicação estratégica militar.

---

## 🎯 Objetivo
Criar uma aplicação full-stack (ou SPA robusta) para o **Exército Brasileiro (COTER)** que utilize IA Generativa para transformar tópicos operacionais em pacotes de mídia (texto e imagem) com rigor doutrinário e fundamentação em fontes reais.

---

## 🛠️ Stack Tecnológica Exigida
- **Framework:** React 18+ com Vite e TypeScript.
- **Estilização:** Tailwind CSS (metodologia utilitária).
- **Componentes:** Lucide React (ícones), motion/react (animações).
- **Processamento de Dados:** 
  - `pdfjs-dist` (extração de texto de PDFs).
  - `jspdf` (geração de documentos de saída).
  - `react-markdown` (renderização de texto rico).
- **IA:** Google Gemini SDK (`@google/genai`).
  - Modelo de Texto: `gemini-3-flash-preview` (com Google Search Grounding).
  - Modelo de Imagem: `gemini-2.5-flash-image`.

---

## 🎨 Identidade Visual e UX
1. **Mood:** "Military Command & Control Center".
2. **Cores:** Fundo Slate-50/950, Emerald-950 (Primária), Emerald-500 (Acento), Red-700 (Alertas).
3. **Elementos:**
   - Header Institucional com textura de fibra de carbono.
   - Uso de brasões oficiais (ex: COTER) e tipografia Inter/Monospace.
   - Feedback visual constante (Loading states animados, Toasts de status).

---

## 🧠 Lógica de Inteligência (System Instructions)
A IA deve assumir a **Persona: Tenente-Coronel Luiz Alves**, 45 anos, Chefe de Comunicação Estratégica.
- **Tom:** Formal, técnico-doutrinário, porém adaptado digitalmente.
- **Raciocínio:** 
  1. Extrair contexto do PDF anexado (Verdade Absoluta).
  2. Complementar via Google Search (Grounding).
  3. Validar se a busca conflita com o PDF e gerar alertas.
  4. Gerar resposta em JSON estrito.

---

## 📋 Requisitos de Funcionalidade
### 1. Entrada de Dados
- Campo de texto para o tópico da missão.
- Upload de PDF (Indexação de Doutrina).
- Upload de até 3 imagens de referência para a IA.
- Seletores de "Linha de Esforço" e "Ideias-Força" (Taxonomia militar).

### 2. Processamento
- Extração assíncrona de PDF.
- Geração paralela de texto e imagem.
- Análise de Risco Reputacional e métricas de impacto (KPIs).

### 3. Saída e Entregáveis
- **Mídia:** Post Instagram, Texto WhatsApp, Artigo Técnico.
- **Imagem:** Layout 1080x1080, sem textos, estilo fotojornalismo militar.
- **Exportação:** Download de Artigo em PDF institucional e Imagem em JPG.

---

## 🔐 Configuração de Segurança
- Suporte a `VITE_GEMINI_API_KEY` em arquivo `.env`.
- Tratamento de exceções para "Quota Excedida" e "Chave Inválida".
- Validação de arquivos (Mime-types permitidos: PDF, PNG, JPG).

---

## 🚀 Como Executar este Prompt
Copie o conteúdo acima e forneça a um assistente de código com a instrução: 
*"Siga rigorosamente estas especificações para construir a aplicação COTER AI Factory do zero, garantindo que a lógica de IA e a estética militar sejam preservadas."*
