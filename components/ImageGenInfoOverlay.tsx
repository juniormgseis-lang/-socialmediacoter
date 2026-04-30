import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lightbulb, Camera, Palette, Wand2, Sparkles } from 'lucide-react';

interface ImageGenInfoOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImageGenInfoOverlay: React.FC<ImageGenInfoOverlayProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-auto"
        >
          <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl" onClick={onClose} />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-[40px] w-full max-w-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] relative flex flex-col max-h-[90vh]"
          >
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 p-10 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-6 mb-4">
                <div className="p-4 bg-amber-500 rounded-3xl shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                  <Sparkles className="w-8 h-8 text-white fill-white/20" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-tight">
                    Centro de Criação Visual
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="h-1 w-8 bg-amber-400 rounded-full"></span>
                    <p className="text-amber-400 font-bold uppercase tracking-[0.3em] text-[10px]">Guia de Utilização</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 overflow-y-auto custom-scrollbar bg-slate-50">
              <div className="space-y-8">
                <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
                  
                  <div className="space-y-8">
                    <section>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                          <Wand2 className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h4 className="font-black text-slate-800 uppercase italic">Gerar Imagens</h4>
                      </div>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">
                        Ativa o laboratório de síntese visual. Utilize quando precisar de uma imagem que ainda não existe no seu acervo, como um conceito estratégico, uma cena operacional específica ou uma ilustração patriótica de alta qualidade.
                      </p>
                      
                      <div className="mt-4 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                        <h5 className="text-[10px] font-black text-indigo-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                          Controle de Cotas
                        </h5>
                        <p className="text-[12px] text-slate-600 font-semibold leading-relaxed">
                          Devido às limitações de cota dos motores de IA (Gemini), a geração direta pode falhar com o aviso de <span className="text-indigo-700">"Cota Excedida"</span>.
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          <li className="flex items-start gap-2 text-[11px] text-slate-500 font-medium">
                            <span className="mt-1 w-1 h-1 bg-indigo-300 rounded-full shrink-0"></span>
                            O sistema gerará automaticamente um <strong className="text-slate-700">"Prompt Visual"</strong> em texto.
                          </li>
                          <li className="flex items-start gap-2 text-[11px] text-slate-500 font-medium">
                            <span className="mt-1 w-1 h-1 bg-indigo-300 rounded-full shrink-0"></span>
                            Copie este texto e utilize em ferramentas como <strong className="text-slate-700">Adobe Firefly</strong> ou <strong className="text-slate-700">Bing Designer</strong>.
                          </li>
                        </ul>
                      </div>
                    </section>

                    <section>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-amber-50 rounded-lg">
                          <Sparkles className="w-5 h-5 text-amber-600" />
                        </div>
                        <h4 className="font-black text-slate-800 uppercase italic">Motor de Inteligência</h4>
                      </div>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">
                        Define o estilo artístico e a "lente" da IA. Escolha <strong className="text-slate-900">Hiper-realista</strong> para fotos documentais e críveis, ou <strong className="text-slate-900">Cinematográfico</strong> para peças publicitárias com iluminação épica e dramática.
                      </p>
                    </section>

                    <section className="p-5 bg-amber-50 rounded-2xl border border-amber-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Camera className="w-5 h-5 text-amber-600" />
                        </div>
                        <h4 className="font-black text-amber-900 uppercase italic">Referências de Imagem</h4>
                      </div>
                      <p className="text-[12px] text-amber-900 font-medium leading-relaxed">
                        <span className="font-black block mb-1">Como funciona:</span>
                        Ao anexar até <strong className="text-amber-700">3 imagens</strong>, você fornece um "gabarito visual" para a IA. Ela analisa a iluminação, a composição, as cores e a texturas das fotos para replicar esses padrões no resultado final. Utilize fotos reais da sua Unidade para garantir fidelidade técnica absoluta.
                      </p>
                    </section>

                    <section>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-slate-100 rounded-lg">
                          <Palette className="w-5 h-5 text-slate-700" />
                        </div>
                        <h4 className="font-black text-slate-800 uppercase italic">Identidade Visual</h4>
                      </div>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">
                        Define os elementos institucionais básicos. Ensina à IA os padrões de uniformes, camuflagens e o ambiente da sua unidade através de descrições estruturadas.
                      </p>
                    </section>
                  </div>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl shadow-lg">
                  <p className="text-[10px] text-amber-400 font-bold uppercase tracking-[0.2em] text-center">
                    Criatividade guiada pela Doutrina Militar
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 flex justify-center bg-white">
              <button
                onClick={onClose}
                className="px-12 py-4 bg-indigo-600 text-white font-black uppercase text-xs tracking-[0.3em] rounded-full shadow-xl hover:shadow-indigo-200 hover:scale-105 transition-all"
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
