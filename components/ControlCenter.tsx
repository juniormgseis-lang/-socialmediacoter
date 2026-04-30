
import React from 'react';
import { VisualStyle, ContentTone, AIProvider, ReferenceImage } from '../types';
import { motion } from 'motion/react';
import { Palette, MessageSquare, Bot, Image as ImageIcon, Lightbulb, Camera, Trash2 } from 'lucide-react';

interface ControlCenterProps {
  style: VisualStyle;
  provider: AIProvider;
  generateImageEnabled: boolean;
  images: ReferenceImage[];
  setStyle: (s: VisualStyle) => void;
  setProvider: (p: AIProvider) => void;
  setGenerateImageEnabled: (e: boolean) => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: (id: string) => void;
  onOpenInfo?: () => void;
}

export const ControlCenter: React.FC<ControlCenterProps> = ({ 
  style, 
  provider, 
  generateImageEnabled,
  images,
  setStyle, 
  setProvider,
  setGenerateImageEnabled,
  handleImageUpload,
  handleRemoveImage,
  onOpenInfo
}) => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface p-10 rounded-3xl shadow-2xl border-l-8 border-l-slate-400 border border-border space-y-8"
    >
      <div className="border-b border-border/50 pb-6 mb-2 flex items-center justify-between">
        <h2 className="text-[12px] font-black text-text-secondary uppercase tracking-[0.2em] flex items-center gap-2">
          <div className="w-1 h-4 bg-secondary-theme rounded-full"></div>
          Centro de criação visual
        </h2>
        {onOpenInfo && (
          <button 
            onClick={onOpenInfo}
            className="p-2 hover:bg-amber-400/10 rounded-full transition-all text-amber-500 animate-pulse"
            title="Saiba usar"
          >
            <Lightbulb className="w-5 h-5 fill-amber-400/20" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-[12px] font-black text-text-secondary uppercase tracking-[0.2em] flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-secondary-theme" /> Gerar imagem
          </label>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setGenerateImageEnabled(!generateImageEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ring-2 ring-offset-2 ${generateImageEnabled ? 'bg-secondary-theme ring-secondary-theme' : 'bg-border ring-border'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${generateImageEnabled ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
          </div>
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

      <div className="space-y-4 pt-4 border-t border-border/30">
        <label className="block text-[12px] font-black text-text-secondary uppercase tracking-[0.2em] flex justify-between items-center">
          <span className="flex items-center gap-2"><Camera className="w-4 h-4 text-secondary-theme" /> Referências de Imagem</span>
          <span className="text-secondary-theme font-black text-[10px]">{images.length}/3</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          {images.map(img => (
            <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden group shadow-sm border border-border">
              <img src={img.preview} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <button 
                onClick={() => handleRemoveImage(img.id)} 
                className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
          {images.length < 3 && (
            <label className="aspect-square border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-secondary-theme/5 hover:border-secondary-theme transition-all group">
              <Camera className="w-6 h-6 text-text-secondary group-hover:text-secondary-theme transition-all" />
              <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
            </label>
          )}
        </div>
        <p className="text-[9px] font-bold text-text-secondary uppercase tracking-tight italic opacity-60">
          Anexe referências para orientar o motor visual.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block text-[12px] font-black text-text-secondary uppercase tracking-[0.2em] flex items-center gap-2">
          <Palette className="w-4 h-4 text-secondary-theme" /> Identidade Visual
        </label>
        <div className="flex flex-row gap-2">
          {Object.values(VisualStyle).map((v) => (
            <button
              key={v}
              onClick={() => setStyle(v)}
              className={`py-4 px-4 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all border-2 flex-1 ${
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

    </motion.section>
  );
};
