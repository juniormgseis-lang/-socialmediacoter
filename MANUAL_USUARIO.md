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
2. **Ideia-Força:** Palavra ou frase chave que deve nortear o argumento e aparecer obrigatoriamente no texto.
3. **Seleção de Formato:** O sistema processa as instruções específicas para o canal desejado.
4. **Geração IA:** O motor baseado em Gemini processa o prompt com as restrições militares aplicadas.

---

## 3. Segurança e Acesso
A plataforma possui uma camada de proteção para garantir que apenas pessoal autorizado utilize o motor de IA:
- **Senha de Acesso:** `@coter`
- **Sessão:** A autenticação é mantida durante a sessão do navegador. Ao clicar no ícone de lixeira (Encerrar Sessão) no cabeçalho ou fechar a aba, a senha será solicitada novamente.

---

## 4. Requisitos de Conteúdo (Implementação Técnica)

Conforme as últimas atualizações, o sistema segue rigorosamente os seguintes parâmetros de formatação:

### 📸 Instagram
- **Estrutura:** Exatamente **3 parágrafos**.
- **Regra de Ouro:** A **Ideia-Força** deve ser integrada obrigatoriamente no **primeiro parágrafo**.
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

REQUISITOS ESPECÍFICOS POR FORMATO:
1. INSTAGRAM: O texto deve ter OBRIGATORIAMENTE exatamente 3 parágrafos distintos. 
   A Ideia-Força deve ser integrada ao texto logo no PRIMEIRO parágrafo.
2. WHATSAPP: Texto ágil, sem limitação de parágrafos.
3. ARTIGO TÉCNICO-DOUTRINÁRIO: Conteúdo denso, com parágrafos necessários para aprofundar o tema.
```

---

## 6. Créditos e Equipe
- **Concepção:** TC Luiz Alves
- **Desenvolvimento e Implementação:** ST Ernani P. Júnior

---
*Documento gerado automaticamente pelo sistema em 24 de Abril de 2026.*
