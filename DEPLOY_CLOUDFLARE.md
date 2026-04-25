# 🌐 Guia de Deploy - Cloudflare Pages

Este guia orienta o processo de migração da aplicação do AI Studio para o ambiente de produção da Cloudflare.

## 1. Exportação do Código
Para realizar o deploy, você precisa dos arquivos fonte. No AI Studio:
1. Clique no ícone de **Configurações/Exportar**.
2. Selecione **"Export to GitHub"** (melhor para atualizações automáticas) ou **"Download ZIP"**.

## 2. Configuração na Cloudflare
1. Acesse o painel da [Cloudflare](https://dash.cloudflare.com/).
2. Vá em **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Selecione o repositório exportado.

## 3. Configurações de Compilação (Build)
Durante o setup inicial, utilize estes parâmetros:
- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Build Output Directory:** `dist`
- **Node.js Version:** 18 ou superior.

## 4. Variáveis de Ambiente (Segurança)
Para que a geração de textos funcione, você deve configurar a chave da API no painel da Cloudflare:
1. Nas configurações do projeto no Cloudflare Pages, vá em **Settings** > **Environment variables**.
2. Adicione:
   - `GEMINI_API_KEY`: Sua chave privada do Google AI Studio.

## 5. Vantagens Estratégicas
- **Edge Computing:** O conteúdo é servido do servidor mais próximo do usuário, ideal para uso em diferentes comandos militares no Brasil.
- **SSL Automático:** Criptografia de ponta a ponta (HTTPS) sem custo adicional.
- **Previews de Branch:** Cada alteração no código gera um link de teste antes de ir para a versão oficial.

---
*Manual de suporte técnico - Social Media Factory COTER*
