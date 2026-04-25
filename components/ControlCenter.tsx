
import React from 'react';
import { VisualStyle, ContentTone, AIProvider } from '../types';
import { motion } from 'motion/react';
import { Palette, MessageSquare, Bot, Image as ImageIcon } from 'lucide-react';

interface ControlCenterProps {
  style: VisualStyle;
  tone: ContentTone;
  provider: AIProvider;
  generateImageEnabled: boolean;
  setStyle: (s: VisualStyle) => void;
  setTone: (t: ContentTone) => void;
  setProvider: (p: AIProvider) => void;
  setGenerateImageEnabled: (e: boolean) => void;
}

export const ControlCenter: React.FC<ControlCenterProps> = ({ 
  style, 
  tone, 
  provider, 
  generateImageEnabled,
  setStyle, 
  setTone, 
  setProvider,
  setGenerateImageEnabled
}) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface p-10 rounded-3xl shadow-2xl border border-border space-y-8"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-[12px] font-black text-text-secondary uppercase tracking-[0.2em] flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-secondary-theme" /> Gerar Imagem IA
          </label>
          <button 
            onClick={() => setGenerateImageEnabled(!generateImageEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ring-2 ring-offset-2 ${generateImageEnabled ? 'bg-secondary-theme ring-secondary-theme' : 'bg-border ring-border'}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${generateImageEnabled ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>
        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-tight italic opacity-80">
          {generateImageEnabled 
            ? "Consome cota de imagem a cada geração." 
            : "Gera apenas texto (Economia de 100% dos créditos de imagem)."}
        </p>
      </div>

      <div className="space-y-4">
        <label className="block text-[12px] font-black text-text-secondary uppercase tracking-[0.2em] flex items-center gap-2">
          <Bot className="w-4 h-4 text-secondary-theme" /> Motor de Inteligência
        </label>
        <div className="grid grid-cols-1 gap-2">
          {Object.values(AIProvider).map((v) => (
            <button
              key={v}
              onClick={() => setProvider(v)}
              className={`py-4 px-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border-2 flex items-center justify-between ${
                provider === v 
                  ? 'bg-secondary-theme/10 text-text-primary border-secondary-theme/20 shadow-sm' 
                  : 'bg-background/40 text-text-secondary border-border hover:border-secondary-theme hover:bg-secondary-theme/5'
              }`}
            >
              <span>{v}</span>
              {provider === v && <div className="w-2 h-2 bg-secondary-theme rounded-full animate-pulse"></div>}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-[12px] font-black text-text-secondary uppercase tracking-[0.2em] flex items-center gap-2">
          <Palette className="w-4 h-4 text-secondary-theme" /> Identidade Visual
        </label>
        <div className="grid grid-cols-2 gap-3">
          {Object.values(VisualStyle).map((v) => (
            <button
              key={v}
              onClick={() => setStyle(v)}
              className={`py-4 px-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border-2 ${
                style === v 
                  ? 'bg-primary-theme text-primary-contrast border-primary-theme shadow-xl' 
                  : 'bg-background/40 text-text-secondary border-border hover:border-secondary-theme hover:bg-secondary-theme/5'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-[12px] font-black text-text-secondary uppercase tracking-[0.2em] flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-secondary-theme" /> Tom de Voz Estratégico
        </label>
        <div className="grid grid-cols-2 gap-3">
          {Object.values(ContentTone).map((v) => (
            <button
              key={v}
              onClick={() => setTone(v)}
              className={`py-4 px-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border-2 ${
                tone === v 
                  ? 'bg-primary-theme text-primary-contrast border-primary-theme shadow-xl' 
                  : 'bg-background/40 text-text-secondary border-border hover:border-secondary-theme hover:bg-secondary-theme/5'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
