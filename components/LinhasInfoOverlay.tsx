
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lightbulb, Activity, Target, Zap } from 'lucide-react';

interface LinhasInfoOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LinhasInfoOverlay: React.FC<LinhasInfoOverlayProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-auto"
        >
          <div className="absolute inset-0 bg-indigo-950/90 backdrop-blur-xl" onClick={onClose} />
          
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
                  <Lightbulb className="w-8 h-8 text-white fill-white/20" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-tight">
                    Você Sabia?
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="h-1 w-8 bg-amber-400 rounded-full"></span>
                    <p className="text-amber-400 font-bold uppercase tracking-[0.3em] text-[10px]">Guia de Operações</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 overflow-y-auto custom-scrollbar bg-slate-50">
              <div className="space-y-8">
                <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
                  <p className="text-base text-slate-700 leading-relaxed font-medium mb-6">
                    As <strong className="text-indigo-600 font-black italic">Linhas de Esforço</strong> são os pilares fundamentais da nossa estratégia de comunicação.
                  </p>

                  <div className="space-y-6">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Como funciona a Inteligência:</h4>
                    
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0 mt-1">
                          <Target className="w-4 h-4 text-indigo-700" />
                        </div>
                        <p className="text-sm text-slate-600 font-bold leading-snug">
                          Ao selecionar uma Linha de Esforço específica, a IA ajusta <strong className="text-indigo-600">automaticamente</strong> o tom e os argumentos para se alinhar aos objetivos daquela linha.
                        </p>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0 mt-1">
                          <Activity className="w-4 h-4 text-indigo-700" />
                        </div>
                        <p className="text-sm text-slate-600 font-bold leading-snug">
                          A <strong className="text-indigo-600">Ideia-Força</strong> vinculada serve como o "mantra" que a IA deve reforçar em cada frase gerada.
                        </p>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 mt-1">
                          <Zap className="w-4 h-4 text-amber-700" />
                        </div>
                        <p className="text-sm text-slate-600 font-bold leading-snug">
                          <strong className="text-amber-600 uppercase">Dica:</strong> Você pode permitir que a própria IA decida qual a melhor Linha de Esforço baseada no conteúdo que você forneceu no PDF ou texto!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-900 rounded-2xl relative overflow-hidden group">
                  <div className="relative z-10">
                    <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-2">Total de Alinhamento</h4>
                    <p className="text-xs text-white/70 font-medium leading-relaxed">
                      São 08 linhas de esforço integradas ao sistema. Cada uma possui um conjunto de ideias-força específicas que garantem a unidade de doutrina do COTER.
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
