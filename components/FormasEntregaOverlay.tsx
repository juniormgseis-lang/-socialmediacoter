
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lightbulb, Camera, MessageSquare, Newspaper, Share2 } from 'lucide-react';

interface FormasEntregaOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormasEntregaOverlay: React.FC<FormasEntregaOverlayProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-auto"
        >
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose} />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] relative flex flex-col max-h-[90vh]"
          >
            <div className="bg-blue-600 p-10 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-6 mb-4">
                <div className="p-4 bg-amber-500 rounded-3xl shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                  <Lightbulb className="w-8 h-8 text-white fill-white/20" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-tight">
                    Formatos de Entrega
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="h-1 w-8 bg-amber-400 rounded-full"></span>
                    <p className="text-amber-400 font-bold uppercase tracking-[0.3em] text-[10px]">Manual de Distribuição</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 overflow-y-auto custom-scrollbar bg-slate-50">
              <div className="grid grid-cols-1 gap-6">
                <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex gap-5">
                  <div className="p-3 bg-pink-100 rounded-2xl h-fit">
                    <Camera className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 uppercase italic mb-1">Redes Sociais (Instagram)</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      Ideal para o público externo. Foco em <strong className="text-pink-600">engajamento</strong>, visual impactante, hashtags e uma linguagem direta.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex gap-5">
                  <div className="p-3 bg-emerald-100 rounded-2xl h-fit">
                    <MessageSquare className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 uppercase italic mb-1">Mensageiros (WhatsApp/Telegram)</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      Focado em <strong className="text-emerald-600">distribuição rápida</strong>. Texto limpo, com tópicos e informações essenciais para leitura em dispositivos móveis.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex gap-5">
                  <div className="p-3 bg-slate-100 rounded-2xl h-fit">
                    <Newspaper className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-800 uppercase italic mb-1">Institucional (Artigos/Doutrina)</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      Linguagem <strong className="text-slate-800">formal e técnica</strong>. Segue os padrões de redação oficial e foca no registro histórico e doutrinário dos eventos.
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="flex gap-4">
                    <Share2 className="w-5 h-5 text-blue-600 mt-1" />
                    <p className="text-xs text-blue-900 font-bold leading-relaxed">
                      Você pode selecionar múltiplos formatos ao mesmo tempo! A IA gerará versões diferentes do mesmo conteúdo para cada canal escolhido.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 flex justify-center bg-white">
              <button
                onClick={onClose}
                className="px-10 py-4 bg-blue-600 text-white font-black uppercase text-xs tracking-[0.3em] rounded-full shadow-xl hover:shadow-blue-200 hover:scale-105 transition-all"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
