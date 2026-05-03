
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lightbulb, Binary, Users, Target, Zap } from 'lucide-react';

interface TomVozOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TomVozOverlay: React.FC<TomVozOverlayProps> = ({ isOpen, onClose }) => {
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
            <div className="bg-indigo-600 p-10 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-6 mb-4">
                <div className="p-4 bg-amber-500 rounded-3xl shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-tight">
                    Diretriz de Comunicação
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="h-1 w-8 bg-amber-400 rounded-full"></span>
                    <p className="text-amber-400 font-bold uppercase tracking-[0.3em] text-[10px]">Alinhamento Estratégico</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 overflow-y-auto custom-scrollbar bg-slate-50">
              <div className="space-y-8">
                <p className="text-slate-600 font-medium text-center px-10">
                  O Tom de Voz define como a mensagem será "ouvida" pelo seu público. No Exército, equilibramos a precisão técnica com o valor humano.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-500 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full bg-slate-300 group-hover:bg-indigo-500 transition-colors"></div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-slate-100 rounded-lg">
                        <Binary className="w-5 h-5 text-slate-700" />
                      </div>
                      <h4 className="text-lg font-black text-slate-800 uppercase italic">Técnico</h4>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-2 font-bold italic">
                      <li>• Foco em resultados e dados</li>
                      <li>• Linguagem objetiva/formal</li>
                      <li>• Ênfase na Doutrina Militar</li>
                      <li>• Ideal para relatórios e artigos</li>
                    </ul>
                  </div>

                  <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-500 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full bg-slate-300 group-hover:bg-indigo-500 transition-colors"></div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Users className="w-5 h-5 text-indigo-700" />
                      </div>
                      <h4 className="text-lg font-black text-slate-800 uppercase italic">Emotivo</h4>
                    </div>
                    <ul className="text-xs text-slate-600 space-y-2 font-bold italic">
                      <li>• Foco em pessoas e valores</li>
                      <li>• Narrativa de "Mão Amiga"</li>
                      <li>• Ênfase no impacto social</li>
                      <li>• Ideal para Instagram e Reels</li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                  <div className="flex gap-4">
                    <Zap className="w-5 h-5 text-amber-600 mt-1" />
                    <p className="text-xs text-amber-900 font-bold leading-relaxed">
                      DICA: Para operações reais envolvendo a sociedade (como desastres naturais), o tom <span className="text-indigo-600">Emotivo</span> costuma gerar 3x mais engajamento. Já para grandes exercícios militares, o tom <span className="text-indigo-600">Técnico</span> reforça nossa capacidade de dissuasão.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 flex justify-center bg-white">
              <button
                onClick={onClose}
                className="px-10 py-4 bg-indigo-600 text-white font-black uppercase text-xs tracking-[0.3em] rounded-full shadow-xl hover:shadow-indigo-200 hover:scale-105 transition-all"
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
