
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lightbulb, ClipboardList, Flag, Palette, Camera } from 'lucide-react';

interface FiquePorDentroOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FiquePorDentroOverlay: React.FC<FiquePorDentroOverlayProps> = ({ isOpen, onClose }) => {
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
            <div className="bg-emerald-600 p-10 relative">
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
                    Manual do Usuário
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="h-1 w-8 bg-amber-400 rounded-full"></span>
                    <p className="text-amber-400 font-bold uppercase tracking-[0.3em] text-[10px]">Guia de Operação e Estilo</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 overflow-y-auto custom-scrollbar bg-slate-50">
              <div className="space-y-8">
                {/* Seção de Contexto */}
                <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
                  
                  <div className="space-y-8">
                    <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-100 pb-2">01. Configuração do Contexto</h4>
                    <section>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <Flag className="w-5 h-5 text-emerald-700" />
                        </div>
                        <h4 className="text-lg font-black text-slate-800 uppercase italic">Missão Principal</h4>
                      </div>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                        Define o <span className="font-bold text-emerald-600">"PORQUÊ"</span> estamos lá. É o pano de fundo institucional ou a operação de grande escala.
                      </p>
                    </section>

                    <section>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <ClipboardList className="w-5 h-5 text-blue-700" />
                        </div>
                        <h4 className="text-lg font-black text-slate-800 uppercase italic">Evento Operacional</h4>
                      </div>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                        Define o <span className="font-bold text-blue-600 italic">"O QUÊ"</span> aconteceu. Seja específico para obter textos mais precisos da IA.
                      </p>
                    </section>
                  </div>
                </div>

                {/* Seção de Criação Visual */}
                <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                  
                  <div className="space-y-8">
                    <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-100 pb-2">02. Referência Técnica</h4>
                    
                    <section>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                        Utilize este campo para fornecer o <span className="font-bold text-blue-600 italic">embasamento factual</span>. Você pode combinar três formas: anexe um <strong className="text-blue-700">PDF</strong>, forneça um <strong className="text-blue-700">Link (URL)</strong> ou cole um <strong className="text-blue-700">Texto</strong> de modelo. A IA usará esses dados como fonte de verdade primária.
                      </p>
                    </section>
                  </div>
                </div>

                {/* Seção de Criação Visual */}
                <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
                  
                  <div className="space-y-8">
                    <h4 className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-100 pb-2">03. Centro de Criação Visual</h4>
                    
                    <section>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-amber-100 rounded-lg">
                          <Camera className="w-5 h-5 text-amber-700" />
                        </div>
                        <h4 className="text-lg font-black text-slate-800 uppercase italic">Referências de Imagem</h4>
                      </div>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                        Forneça um <span className="font-bold text-amber-600 italic">gabarito visual</span> anexando até 3 fotos reais. Isso ensina à IA a iluminação, composição e texturas desejadas.
                      </p>
                    </section>

                    <section>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-slate-100 rounded-lg">
                          <Palette className="w-5 h-5 text-slate-700" />
                        </div>
                        <h4 className="text-lg font-black text-slate-800 uppercase italic">Identidade Visual</h4>
                      </div>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                        Configure o DNA visual (uniformes, camuflagens e ambiente). Combine o estilo selecionado com suas referências para fidelidade técnica máxima.
                      </p>
                    </section>
                  </div>
                </div>

                <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl">
                  <div className="flex gap-4">
                    <div className="text-2xl mt-1">⚙️</div>
                    <div>
                      <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest mb-1">Motor de Inteligência</p>
                      <p className="text-xs text-slate-400 font-bold leading-relaxed italic">
                        O motor processa o contexto (textos) e o estilo (visuais) simultaneamente. Mantenha os prompts de imagem ligados para utilizar o potencial máximo das referências enviadas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 flex justify-center bg-white">
              <button
                onClick={onClose}
                className="px-10 py-4 bg-emerald-600 text-white font-black uppercase text-xs tracking-[0.3em] rounded-full shadow-xl hover:shadow-emerald-200 hover:scale-105 transition-all"
              >
                Operação Pronta
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
