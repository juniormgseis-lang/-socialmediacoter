
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lightbulb } from 'lucide-react';

interface FiqueSabendoOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FiqueSabendoOverlay: React.FC<FiqueSabendoOverlayProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-auto"
        >
          <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-xl" onClick={onClose} />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] relative flex flex-col max-h-[90vh]"
          >
            <div className="military-gradient p-10 relative">
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
                    Fique sabendo!
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="h-1 w-8 bg-amber-400 rounded-full"></span>
                    <p className="text-amber-400 font-bold uppercase tracking-[0.3em] text-[10px]">Manual do Especialista</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 overflow-y-auto custom-scrollbar bg-slate-50">
              <div className="space-y-8">
                <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
                  <p className="text-base text-slate-700 leading-relaxed font-medium mb-6">
                    Ao inserir um modelo de matéria ou uma estrutura específica nesse campo, você está fornecendo à Inteligência Artificial o que chamamos de <strong className="text-emerald-600 font-black italic">"Instrução de Estilo e Formato"</strong>.
                  </p>

                  <div className="space-y-6">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Como fazer isso de forma mais eficiente:</h4>
                    
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 mt-1">
                           <span className="text-emerald-700 font-black text-xs">01</span>
                        </div>
                        <p className="text-sm text-slate-600 font-bold leading-snug">
                          Agora você pode <strong className="text-emerald-600">combinar três formas</strong>: anexe um PDF doutrinário, cole um texto de modelo e forneça um <strong className="text-emerald-600">Link de Referência (URL)</strong>. A IA acessará a URL para buscar informações atualizadas ou seguir um contexto externo.
                        </p>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 mt-1">
                          <span className="text-emerald-700 font-black text-xs">02</span>
                        </div>
                        <div className="space-y-3">
                          <p className="text-sm text-slate-600 font-bold leading-snug">
                            Adicione uma instrução simples no início do texto colado, algo como:
                          </p>
                          <div className="bg-slate-900 text-emerald-400 p-5 rounded-2xl font-mono text-xs italic border-l-4 border-emerald-500 shadow-lg">
                            "Siga RIGOROSAMENTE o modelo abaixo para a estrutura, tom de voz e estilo de escrita da nova matéria. Substitua os dados originais pelos novos dados que fornecerei no Contexto Situacional."
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0 mt-1">
                          <span className="text-emerald-700 font-black text-xs">03</span>
                        </div>
                        <p className="text-sm text-slate-600 font-bold leading-snug">
                          No campo Contexto Situacional (Missão/Evento), você insere apenas as informações novas (os fatos reais da missão atual).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-slate-900 rounded-2xl relative overflow-hidden group">
                    <div className="relative z-10">
                      <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Por que funciona?</h4>
                      <p className="text-xs text-white/70 font-medium leading-relaxed">
                        A IA processa a Referência Técnica como fonte primária. Se ela detectar um padrão, ela tentará replicar isso, garantindo o padrão institucional.
                      </p>
                    </div>
                  </div>
                  <div className="p-6 bg-emerald-600 rounded-2xl relative overflow-hidden shadow-lg shadow-emerald-200">
                    <div className="relative z-10">
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-2">Dica Coter</h4>
                      <p className="text-xs text-white font-medium leading-relaxed">
                        Agora que você pode colar texto diretamente, ficou muito mais fácil usar modelos rápidos sem precisar gerar um PDF toda vez!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 flex justify-center bg-white">
              <button
                onClick={onClose}
                className="px-10 py-4 military-gradient text-white font-black uppercase text-xs tracking-[0.3em] rounded-full shadow-xl hover:shadow-emerald-200 hover:scale-105 transition-all"
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
