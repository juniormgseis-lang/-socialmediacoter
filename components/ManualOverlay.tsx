import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  ShieldCheck, 
  Target, 
  Zap, 
  Smartphone, 
  MessageCircle, 
  BookOpen, 
  Lock, 
  Camera, 
  AlertTriangle,
  ChevronLeft,
  Users
} from 'lucide-react';
import { COTER_LOGO_URL } from '../constants';

interface ManualOverlayProps {
  onClose: () => void;
}

export const ManualOverlay: React.FC<ManualOverlayProps> = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-background flex flex-col"
    >
      {/* Header Fixo */}
      <div className="bg-surface border-b border-border p-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-background rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-text-primary" />
          </button>
          <div className="flex items-center gap-3">
            <img src={COTER_LOGO_URL} alt="Logo" className="h-8 w-auto" referrerPolicy="no-referrer" />
            <h1 className="font-black uppercase tracking-tighter text-sm italic">Manual de Operações</h1>
          </div>
        </div>
        <div className="text-[10px] font-mono text-text-secondary uppercase tracking-widest hidden sm:block">
          Versão 2.0 - Estratégia 2026
        </div>
      </div>

      {/* Conteúdo com Scroll */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 max-w-4xl mx-auto w-full space-y-16 pb-24">
        
        {/* Intro Section */}
        <section className="space-y-6 text-center">
          <div className="inline-flex p-4 bg-primary-theme/10 rounded-3xl mb-4">
            <Target className="w-8 h-8 text-primary-theme" />
          </div>
          <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
            Visão Geral do Sistema
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed font-medium">
            Desenvolvido para o Comando de Operações Terrestres, o Social Media Factory converte diretrizes doutrinárias em conteúdo estratégico, mantendo a sobriedade e precisão necessária para a comunicação militar.
          </p>
        </section>

        {/* Persona Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-surface border border-border p-8 rounded-[32px] space-y-4">
            <Users className="w-6 h-6 text-primary-theme" />
            <h3 className="text-xl font-black uppercase italic tracking-tighter">Persona TC LUIZ ALVES</h3>
            <ul className="space-y-2 text-sm text-text-secondary font-bold">
              <li className="flex items-center gap-2">• Tom Institucional e Técnico</li>
              <li className="flex items-center gap-2">• Doutrina de Comunicações Militares</li>
              <li className="flex items-center gap-2">• Linguagem Sóbria e Resolutiva</li>
              <li className="flex items-center gap-2">• Foco em Influência Estratégica</li>
            </ul>
          </div>
          <div className="bg-surface border border-border p-8 rounded-[32px] space-y-4">
            <Lock className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-black uppercase italic tracking-tighter">Segurança e Acesso</h3>
            <ul className="space-y-2 text-sm text-text-secondary font-bold">
              <li className="flex items-center gap-2">• Senha Restrita: <span className="bg-background px-2 py-0.5 rounded text-primary-theme">@coter</span></li>
              <li className="flex items-center gap-2">• Autenticação por Sessão</li>
              <li className="flex items-center gap-2">• Logout Automático ao fechar aba</li>
              <li className="flex items-center gap-2">• Botão de Sair no Rodapé</li>
            </ul>
          </div>
        </section>

        {/* Fontes de Inteligência */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <FileText className="w-6 h-6 text-info-accent" />
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Fontes de Inteligência</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface border border-border p-8 rounded-[32px] space-y-3 shadow-sm border-l-4 border-l-secondary-theme">
              <div className="flex items-center gap-2 text-secondary-theme/60 group">
                <Target className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-black uppercase tracking-widest">Contexto Situacional</span>
              </div>
              <h4 className="text-lg font-black uppercase italic tracking-tighter">Missão / Evento</h4>
              <p className="text-xs text-text-secondary leading-relaxed font-bold uppercase tracking-tight">
                Descrição livre da operação. É a base factual para que a IA processe os dados reais da missão.
              </p>
            </div>
            <div className="bg-surface border-2 border-info-accent/20 p-8 rounded-[32px] space-y-6 shadow-lg shadow-info-accent/5 border-l-4 border-l-info-accent md:col-span-2">
              <div className="flex items-center gap-2 text-info-accent/60 group">
                <FileText className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-[10px] font-black uppercase tracking-widest">Doutrina Ativa</span>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-black uppercase italic tracking-tighter mb-2 text-info-accent">Referência Técnica (PDF)</h4>
                  <p className="text-sm text-text-primary leading-relaxed font-bold">
                    O que deve ser inserido é o <span className="text-info-accent">documento base (contexto)</span> que servirá de fonte primária para a inteligência artificial.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-info-accent/60">Conteúdos destinados ao Upload:</p>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <ShieldCheck className="w-4 h-4 text-info-accent shrink-0" />
                        <p className="text-[11px] text-text-secondary font-bold uppercase tracking-tight">
                          <span className="text-text-primary">Diretrizes Estratégicas:</span> Documentos formais e ordens de operações.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <BookOpen className="w-4 h-4 text-info-accent shrink-0" />
                        <p className="text-[11px] text-text-secondary font-bold uppercase tracking-tight">
                          <span className="text-text-primary">Doutrina Militar:</span> Trechos de manuais de campanha ou regulamentos.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <Target className="w-4 h-4 text-info-accent shrink-0" />
                        <p className="text-[11px] text-text-secondary font-bold uppercase tracking-tight">
                          <span className="text-text-primary">Matérias Técnicas:</span> Informações detalhadas sobre a missão ou evento.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <FileText className="w-4 h-4 text-info-accent shrink-0" />
                        <p className="text-[11px] text-text-secondary font-bold uppercase tracking-tight">
                          <span className="text-text-primary">Artigos de Referência:</span> Substância para extração de fatos e métricas.
                        </p>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-info-accent/60">Finalidade do Processamento:</p>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <Zap className="w-4 h-4 text-info-accent shrink-0" />
                        <p className="text-[11px] text-text-secondary font-bold uppercase tracking-tight">
                          Extrair fontes de consulta reais e fidedignas.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <Zap className="w-4 h-4 text-info-accent shrink-0" />
                        <p className="text-[11px] text-text-secondary font-bold uppercase tracking-tight">
                          Alimentar os indicadores de impacto (KPIs).
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <Zap className="w-4 h-4 text-info-accent shrink-0" />
                        <p className="text-[11px] text-text-secondary font-bold uppercase tracking-tight">
                          Realizar análise de risco reputacional profunda.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <Zap className="w-4 h-4 text-info-accent shrink-0" />
                        <p className="text-[11px] text-text-secondary font-bold uppercase tracking-tight">
                          Fundamentação técnica rigorosa no padrão COTER.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-5 bg-info-accent/10 rounded-2xl border-2 border-info-accent/20">
                  <p className="text-[12px] text-info-accent font-black uppercase tracking-wider text-center italic leading-tight">
                    "É onde você 'anexa o conhecimento' para que a IA não invente dados, mas sim refine o que já existe no padrão COTER."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regras de Geração */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <Zap className="w-6 h-6 text-primary-theme" />
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Regras de Formatação</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-red-500/5 border-2 border-red-500/20 p-8 rounded-3xl space-y-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h4 className="font-black uppercase text-red-700 text-sm tracking-widest">Regra Crítica: Ideia-Força</h4>
              </div>
              <p className="text-sm text-text-primary leading-relaxed font-bold">
                A "ideia-força" fornecida <span className="text-red-600 underline">NÃO deve ser reproduzida literalmente</span> no texto final.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase text-red-600/60">Obrigatoriedades:</p>
                  <ul className="text-[11px] font-bold text-text-secondary space-y-1 uppercase">
                    <li>• Interpretação conceitual</li>
                    <li>• Paráfrase obrigatória</li>
                    <li>• Adaptação ao contexto</li>
                    <li>• **Destaque em negrito**</li>
                  </ul>
                </div>
                <div className="space-y-2 bg-white/50 p-4 rounded-xl border border-red-100">
                  <p className="text-[10px] font-black uppercase text-text-secondary">Exemplo Prático:</p>
                  <p className="text-[10px] text-text-secondary leading-tight italic">
                    <span className="text-red-500 line-through block mb-1">Original: "Ressaltar capacidades..."</span>
                    <span className="text-emerald-700 font-bold block">Correto: "**evidenciar o nível de prontidão...**"</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-surface border border-border rounded-2xl">
              <div className="p-4 bg-primary-theme/10 text-primary-theme h-fit rounded-xl">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-black uppercase text-sm">Instagram</h4>
                <p className="text-sm text-text-secondary">Exatamente <strong>3 parágrafos</strong>. A <strong>Paráfrase da Ideia-Força</strong> deve ser integrada em <strong>negrito</strong> no <strong>primeiro parágrafo</strong>. Tom técnico com emojis sóbrios. <strong>Geração de 3 opções de Títulos Institucionais.</strong></p>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-surface border border-border rounded-2xl">
              <div className="p-4 bg-emerald-500/10 text-emerald-600 h-fit rounded-xl">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-black uppercase text-sm">WhatsApp</h4>
                <p className="text-sm text-text-secondary">Texto ágil e direto, focado na rapidez da leitura operacional. Sem limitação rígida de parágrafos. <strong>Inclui Headline COTER e 3 opções de assunto.</strong></p>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-surface border border-border rounded-2xl">
              <div className="p-4 bg-blue-500/10 text-blue-600 h-fit rounded-xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-black uppercase text-sm">Artigo Técnico</h4>
                <p className="text-sm text-text-secondary">Conteúdo denso e detalhado, focado no aprofundamento do tema e fundamentação operacinal militar. <strong>Mínimo de 3 sugestões de Títulos Corporativos.</strong></p>
              </div>
            </div>
          </div>

          <div className="bg-secondary-theme/5 border border-secondary-theme/20 p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-secondary-theme" />
              <h4 className="font-black uppercase text-secondary-theme text-sm tracking-widest">Padrão COTER de Headlines</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              <ul className="space-y-2 text-[11px] font-bold text-text-secondary uppercase tracking-tight">
                <li className="flex items-center gap-2">• Claro, direto e objetivo</li>
                <li className="flex items-center gap-2">• Verbo de ação obrigatório</li>
                <li className="flex items-center gap-2">• Sujeito Institucional explícito</li>
              </ul>
              <ul className="space-y-2 text-[11px] font-bold text-text-secondary uppercase tracking-tight">
                <li className="flex items-center gap-2">• Alinhado à Ideia-Força</li>
                <li className="flex items-center gap-2">• Sobriedade Institucional</li>
                <li className="flex items-center gap-2">• Entre 50 e 70 caracteres</li>
              </ul>
            </div>
            <p className="text-[10px] text-text-secondary font-black bg-white/50 p-3 rounded-lg border border-border inline-block">
              "A INTELIGÊNCIA GERA 3 OPÇÕES E JUSTIFICA A ESCOLHA DA MELHOR COM BASE NA DOUTRINA."
            </p>
          </div>
        </section>

        {/* Gerenciamento de Imagens */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <Camera className="w-6 h-6 text-secondary-theme" />
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Inteligência Visual</h3>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/20 p-8 rounded-3xl space-y-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h4 className="font-black uppercase text-amber-800 text-sm">Controle de Cotas</h4>
            </div>
            <p className="text-sm text-amber-900 leading-relaxed font-bold">
              Devido às limitações de cota dos motores de IA generativa (Gemini), a geração direta de imagens pode falhar. Quando isso ocorre:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-amber-800 font-bold uppercase tracking-wide">
              <li>O sistema exibirá um aviso de "Cota Excedida".</li>
              <li>Será gerado automaticamente um <strong>"Prompt Visual"</strong> em texto.</li>
              <li>Você poderá copiar este texto e utilizá-lo em ferramentas gratuitas como Adobe Firefly ou Bing Designer.</li>
            </ol>
          </div>
        </section>

        {/* Observação Final */}
        <section className="bg-red-500/10 border border-red-500/30 p-8 rounded-3xl">
          <div className="flex gap-4">
            <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
            <div className="space-y-3">
              <h4 className="text-sm font-black uppercase text-red-600 tracking-widest">Observação Importante</h4>
              <p className="text-xs text-text-secondary leading-relaxed font-bold uppercase tracking-tight italic">
                Os textos produzidos por este aplicativo são gerados com o emprego de Inteligência Artificial e possuem caráter sugestivo, destinando-se a orientar a elaboração de matérias em conformidade com os princípios da Comunicação Estratégica no âmbito do Comando de Operações Terrestres, contribuindo para a padronização da linguagem institucional, sem prejuízo da necessária revisão, adequação e validação por parte do usuário.
              </p>
            </div>
          </div>
        </section>

        {/* Créditos */}
        <section className="pt-12 border-t border-border flex flex-col md:flex-row justify-between gap-8 opacity-60">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary">Estratégia 2026</p>
            <p className="text-xs font-bold text-text-primary uppercase italic">Comando de Operações Terrestres</p>
          </div>
          <div className="flex gap-8">
            <div className="space-y-1">
              <p className="text-[8px] font-black uppercase tracking-widest text-text-secondary">Concepção</p>
              <p className="text-[10px] font-bold text-text-primary uppercase">TC Luiz Alves</p>
            </div>
            <div className="space-y-1">
              <p className="text-[8px] font-black uppercase tracking-widest text-text-secondary">Desenvolvimento</p>
              <p className="text-[10px] font-bold text-text-primary uppercase">ST Ernani P. Júnior</p>
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  );
};
