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

        {/* Regras de Geração */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <Zap className="w-6 h-6 text-primary-theme" />
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Regras de Formatação</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="flex gap-6 p-6 bg-surface border border-border rounded-2xl">
              <div className="p-4 bg-primary-theme/10 text-primary-theme h-fit rounded-xl">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-black uppercase text-sm">Instagram</h4>
                <p className="text-sm text-text-secondary">Exatamente <strong>3 parágrafos</strong>. A <strong>Ideia-Força</strong> deve ser integrada obrigatoriamente no <strong>primeiro parágrafo</strong>. Tom técnico com emojis sóbrios.</p>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-surface border border-border rounded-2xl">
              <div className="p-4 bg-emerald-500/10 text-emerald-600 h-fit rounded-xl">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-black uppercase text-sm">WhatsApp</h4>
                <p className="text-sm text-text-secondary">Texto ágil e direto, focado na rapidez da leitura operacional. Sem limitação rígida de parágrafos.</p>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-surface border border-border rounded-2xl">
              <div className="p-4 bg-blue-500/10 text-blue-600 h-fit rounded-xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-black uppercase text-sm">Artigo Técnico</h4>
                <p className="text-sm text-text-secondary">Conteúdo denso e detalhado, focado no aprofundamento do tema e fundamentação operacinal militar.</p>
              </div>
            </div>
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
