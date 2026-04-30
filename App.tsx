
import React, { useState, useEffect } from 'react';
import { ControlCenter } from './components/ControlCenter';
import { DeliverableCard } from './components/DeliverableCard';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { LoginOverlay } from './components/LoginOverlay';
import { ManualOverlay } from './components/ManualOverlay';
import { FiqueSabendoOverlay } from './components/FiqueSabendoOverlay';
import { LinhasInfoOverlay } from './components/LinhasInfoOverlay';
import { FiquePorDentroOverlay } from './components/FiquePorDentroOverlay';
import { FormasEntregaOverlay } from './components/FormasEntregaOverlay';
import { ImageGenInfoOverlay } from './components/ImageGenInfoOverlay';
import { TomVozOverlay } from './components/TomVozOverlay';
import { Icons, COTER_LOGO_URL } from './constants';
import { VisualStyle, ContentTone, ReferenceImage, SocialMediaContent, LinhaDeEsforco, IDEIAS_FORCA_MAP, AIProvider, DeliveryFormat } from './types';
import { generateOperationalContent, generateOperationalImage } from './services/aiService';
import * as pdfjsLib from 'pdfjs-dist';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, ShieldAlert, Activity, Info, CheckCircle2, AlertTriangle, LayoutGrid, CheckSquare, Square } from 'lucide-react';

// Configuração do worker do PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://esm.sh/pdfjs-dist@4.10.38/build/pdf.worker.mjs`;

const App: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState<VisualStyle>(VisualStyle.REAL_PHOTOS);
  const [tone, setTone] = useState<ContentTone>(ContentTone.TECHNICAL);
  const [linha, setLinha] = useState<LinhaDeEsforco>(LinhaDeEsforco.DEFINIR_POR_IA);
  const [aiProvider, setAiProvider] = useState<AIProvider>(AIProvider.GEMINI_FLASH);
  const [ideiaForca, setIdeiaForca] = useState<string>('');
  const [customSource, setCustomSource] = useState<string>('');
  const [referenceUrl, setReferenceUrl] = useState<string>('');
  const [pdfContent, setPdfContent] = useState<string>('');
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [images, setImages] = useState<ReferenceImage[]>([]);
  const [formats, setFormats] = useState<DeliveryFormat[]>([DeliveryFormat.INSTAGRAM, DeliveryFormat.WHATSAPP, DeliveryFormat.ARTICLE]);
  const [generateImageEnabled, setGenerateImageEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [processingPdf, setProcessingPdf] = useState(false);
  const [result, setResult] = useState<SocialMediaContent | null>(null);
  const [logoError, setLogoError] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'error' | 'success' | 'info', text: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [showFiqueSabendo, setShowFiqueSabendo] = useState(false);
  const [showLinhasInfo, setShowLinhasInfo] = useState(false);
  const [showFiquePorDentro, setShowFiquePorDentro] = useState(false);
  const [showFormasInfo, setShowFormasInfo] = useState(false);
  const [showImageInfo, setShowImageInfo] = useState(false);
  const [showTomVoz, setShowTomVoz] = useState(false);

  useEffect(() => {
    try {
      const authStatus = sessionStorage.getItem('coter_auth');
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }
    } catch {
      // Se cookies/sessionStorage estiverem bloqueados, o app ainda funciona mas sem persistência de login
    }
  }, []);

  const handleLogin = (password: string) => {
    if (password === '@coter') {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('coter_auth', 'true');
      } catch (e) {
        console.warn('sessionStorage indisponível:', e);
      }
      showStatus('success', 'Acesso autorizado. Missão iniciada.');
    }
  };

  useEffect(() => {
    const opcoes = IDEIAS_FORCA_MAP[linha];
    if (opcoes && opcoes.length > 0) {
      setIdeiaForca(opcoes[0]);
    }
  }, [linha]);

  const showStatus = (type: 'error' | 'success' | 'info', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files: File[] = (Array.from(e.target.files) as File[]).slice(0, 3);
    
    files.forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImages(prev => [
          ...prev,
          {
            id: Math.random().toString(36).substr(2, 9),
            preview: reader.result as string,
            data: base64String,
            mimeType: file.type
          }
        ].slice(0, 3));
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') {
      showStatus('error', 'Por favor, anexe um arquivo PDF válido.');
      return;
    }

    setProcessingPdf(true);
    setAttachedFileName(file.name);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => (item as any).str).join(' ');
        fullText += pageText + '\n';
      }

      setPdfContent(fullText);
      showStatus('success', 'Doutrina indexada com sucesso.');
    } catch (error) {
      console.error('Erro ao processar PDF:', error);
      showStatus('error', 'Erro ao extrair texto do PDF.');
      setAttachedFileName(null);
    } finally {
      setProcessingPdf(false);
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const toggleFormat = (f: DeliveryFormat) => {
    setFormats(prev => 
      prev.includes(f) ? prev.filter(item => item !== f) : [...prev, f]
    );
  };

  const handleGenerate = async () => {
    if (!topic) {
      showStatus('error', 'Por favor, defina o tópico da missão.');
      return;
    }
    if (formats.length === 0) {
      showStatus('error', 'Por favor, selecione ao menos um formato de entrega.');
      return;
    }
    setLoading(true);
    setResult(null);
    
    try {
      const params = { 
        topic, 
        style, 
        tone, 
        linha, 
        ideiaForca, 
        images, 
        customSource: (pdfContent + "\n\n" + customSource).trim() || undefined,
        referenceUrl: referenceUrl.trim() || undefined,
        provider: aiProvider,
        formats
      };
      const textContent = await generateOperationalContent(params);
      let generatedImageUrl = undefined;
      let imageError = undefined;
      
      if (generateImageEnabled) {
        try {
          generatedImageUrl = await generateOperationalImage(params);
        } catch (error: any) {
          console.error('Image Generation Error:', error);
          imageError = error.message || 'Cota excedida ou falha no motor de imagem.';
        }
      }

      setResult({ 
        ...textContent, 
        imageUrl: generatedImageUrl,
        imageGenerationError: imageError 
      });
      showStatus('success', 'Estratégia gerada com sucesso.');
    } catch (error: any) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'Falha na geração estratégica. Verifique sua conexão e parâmetros.';
      showStatus('error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans transition-colors duration-300">
      <AnimatePresence>
        {!isAuthenticated && (
          <LoginOverlay onLogin={handleLogin} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showManual && (
          <ManualOverlay onClose={() => setShowManual(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFiqueSabendo && (
          <FiqueSabendoOverlay isOpen={showFiqueSabendo} onClose={() => setShowFiqueSabendo(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLinhasInfo && (
          <LinhasInfoOverlay isOpen={showLinhasInfo} onClose={() => setShowLinhasInfo(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFiquePorDentro && (
          <FiquePorDentroOverlay isOpen={showFiquePorDentro} onClose={() => setShowFiquePorDentro(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFormasInfo && (
          <FormasEntregaOverlay isOpen={showFormasInfo} onClose={() => setShowFormasInfo(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showImageInfo && (
          <ImageGenInfoOverlay isOpen={showImageInfo} onClose={() => setShowImageInfo(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTomVoz && (
          <TomVozOverlay isOpen={showTomVoz} onClose={() => setShowTomVoz(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {statusMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-bold text-sm border ${
              statusMessage.type === 'error' ? 'bg-red-50 text-red-700 border-red-200' : 
              statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
              'bg-blue-50 text-blue-700 border-blue-200'
            }`}
          >
            {statusMessage.type === 'error' && <AlertTriangle className="w-4 h-4" />}
            {statusMessage.type === 'success' && <CheckCircle2 className="w-4 h-4" />}
            {statusMessage.type === 'info' && <Info className="w-4 h-4" />}
            {statusMessage.text}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="military-gradient text-white py-12 px-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden border-b border-emerald-900/50">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full -mr-64 -mt-64 blur-[120px]"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
            {/* Logo Centralizada no Topo */}
            <div className="flex justify-center items-center mb-10">
              <motion.img 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                src={COTER_LOGO_URL} 
                alt="Logo COTER"
                className="h-[100px] w-auto object-contain drop-shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

          <div className="flex flex-col items-center text-center space-y-6">
            <div className="space-y-4">
              <motion.h1 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
              >
                Comando de Operações Terrestres
              </motion.h1>
              <div className="flex flex-col items-center gap-4 pt-2">
                <div className="flex items-center gap-4">
                  <span className="h-[4px] w-12 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981]"></span>
                  <p className="text-lg md:text-xl font-bold text-emerald-400 tracking-[0.4em] uppercase drop-shadow-sm">
                    Estratégia 2026
                  </p>
                  <span className="h-[4px] w-12 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981]"></span>
                </div>
                <p className="text-[12px] font-mono text-white/90 font-bold uppercase tracking-[0.5em] mt-3 block drop-shadow-sm brightness-110">A VITÓRIA TERRESTRE COMEÇA AQUI!</p>
                
                <motion.button 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setShowManual(true)}
                  aria-label="Abrir manual de doutrina"
                  className="mt-6 px-6 py-3 bg-white/5 hover:bg-white/15 rounded-2xl border border-white/10 hover:border-white/30 transition-all flex items-center gap-4 group backdrop-blur-[2px]"
                >
                  <div className="p-2 bg-emerald-500 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform">
                    <Icons.BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 leading-none mb-1">Doutrina / Manual</p>
                    <p className="text-[8px] font-black uppercase tracking-tighter text-white/40 leading-none">Clique para visualizar o Guia</p>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <ThemeSwitcher />
      </div>

      <main className="max-w-7xl mx-auto pt-10 pb-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-10">
            <section className="bg-surface p-10 rounded-3xl shadow-2xl border-l-8 border-l-secondary-theme border border-border transition-all hover:shadow-emerald-900/5">
              <label className="block text-[12px] font-black text-text-secondary uppercase mb-5 tracking-[0.2em] flex justify-between items-center">
                <span className="flex items-center gap-2"><Activity className="w-4 h-4 text-secondary-theme" /> Missão / Evento Operacional</span>
                <button 
                  onClick={() => setShowFiquePorDentro(true)}
                  aria-label="Informações sobre o tópico"
                  className="p-2 hover:bg-amber-400/10 rounded-full transition-all text-amber-400 animate-pulse"
                  title="Fique por Dentro!"
                >
                  <Icons.Lightbulb className="w-5 h-5 fill-amber-400/20" />
                </button>
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex: Operação Ágata - Reforço na Faixa de Fronteira Norte"
                className="w-full h-32 p-6 bg-background/50 border-2 border-border rounded-2xl focus:border-secondary-theme focus:ring-8 focus:ring-secondary-theme/5 outline-none text-lg font-semibold text-text-primary transition-all placeholder:text-text-secondary placeholder:opacity-60 shadow-inner resize-none mb-6"
              />

              <div className="space-y-4 pt-4 border-t border-border/50">
                <label className="block text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] flex justify-between items-center gap-2">
                  <span className="flex items-center gap-2"><Icons.MessageSquare className="w-3 h-3 text-secondary-theme" /> Tom de Voz Estratégico</span>
                  <button 
                    onClick={() => setShowTomVoz(true)}
                    aria-label="Ajuda sobre Tom de Voz"
                    className="p-1 hover:bg-amber-400/10 rounded-full transition-all text-amber-500"
                    title="Ajuda sobre Tom de Voz"
                  >
                    <Icons.Lightbulb className="w-4 h-4" />
                  </button>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(ContentTone).map((v) => (
                    <button
                      key={v}
                      onClick={() => setTone(v)}
                      className={`py-3 px-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border-2 ${
                        tone === v 
                          ? 'bg-secondary-theme text-white border-secondary-theme shadow-lg scale-105' 
                          : 'bg-background/40 text-text-secondary border-border hover:border-secondary-theme/30 hover:bg-secondary-theme/5'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-surface p-10 rounded-3xl shadow-2xl border-l-8 border-l-info-accent border border-border">
              <div className="relative space-y-6">
                <label className="block text-[12px] font-black text-info-accent uppercase mb-4 tracking-[0.2em] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Icons.FileText className="w-5 h-5" /> REFERÊNCIA TÉCNICA (PDF, URL OU TEXTO)
                  </div>
                  <button 
                    onClick={() => setShowFiqueSabendo(true)}
                    aria-label="Ajuda sobre referências técnicas"
                    className="p-2 hover:bg-amber-400/10 rounded-full transition-all text-amber-400 animate-pulse"
                    title="Fique Sabendo!"
                  >
                    <Icons.Lightbulb className="w-5 h-5 fill-amber-400/20" />
                  </button>
                </label>
                
                {attachedFileName && (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-between p-6 bg-info-accent/10 border-2 border-info-accent/20 rounded-2xl group transition-all hover:bg-info-accent/20"
                  >
                    <div className="flex items-center gap-5 overflow-hidden">
                      <div className="p-4 bg-info-accent text-primary-contrast rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                        <Icons.FileText className="w-6 h-6" />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-black text-info-accent uppercase opacity-80">Doutrina Ativa</p>
                        <span className="text-base font-bold text-info-accent truncate block">{attachedFileName}</span>
                      </div>
                    </div>
                    <button onClick={() => { setAttachedFileName(null); setPdfContent(''); }} className="text-red-600 hover:bg-red-50 p-4 rounded-2xl transition-all">
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </motion.div>
                )}

                <div className="space-y-4">
                  {!attachedFileName && (
                    <label className={`w-full p-8 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all ${processingPdf ? 'bg-slate-100 border-slate-300 cursor-wait' : 'border-info-accent/30 hover:border-info-accent hover:bg-info-accent/5 hover:shadow-inner'}`}>
                      {processingPdf ? (
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-10 h-10 border-4 border-info-accent border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-[12px] font-black text-info-accent animate-pulse uppercase tracking-[0.2em]">INDEXANDO DOUTRINA...</span>
                        </div>
                      ) : (
                        <>
                          <Icons.FileText className="w-10 h-10 text-info-accent/30 mb-3 group-hover:scale-110 transition-transform" />
                          <span className="text-[11px] font-black text-info-accent uppercase tracking-[0.2em] text-center">ANEXAR DIRETRIZ ESTRATÉGICA (PDF)</span>
                        </>
                      )}
                      <input type="file" className="hidden" accept="application/pdf" onChange={handlePdfUpload} disabled={processingPdf} />
                    </label>
                  )}

                  {!attachedFileName && (
                    <div className="space-y-4">
                      <div className="relative">
                        <Icons.Link className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-info-accent/50" />
                        <input
                          type="url"
                          value={referenceUrl}
                          onChange={(e) => setReferenceUrl(e.target.value)}
                          placeholder="Link de Referência (URL de site oficial, notícia, etc.)"
                          className="w-full pl-12 pr-4 py-4 bg-background/50 border-2 border-border rounded-2xl focus:border-info-accent focus:ring-8 focus:ring-info-accent/5 outline-none text-sm font-medium text-text-primary transition-all placeholder:text-text-secondary placeholder:opacity-60 shadow-inner"
                        />
                      </div>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                          <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-text-secondary bg-surface px-4">
                          OU COLE O TEXTO ABAIXO
                        </div>
                      </div>
                    </div>
                  )}

                  <textarea
                    value={customSource}
                    onChange={(e) => setCustomSource(e.target.value)}
                    placeholder="Cole aqui modelos, diretrizes ou contextos adicionais..."
                    className="w-full h-40 p-5 bg-background/50 border-2 border-border rounded-2xl focus:border-info-accent focus:ring-8 focus:ring-info-accent/5 outline-none text-sm font-medium text-text-primary transition-all placeholder:text-text-secondary placeholder:opacity-60 shadow-inner resize-none"
                  />
                </div>
              </div>
            </section>

            <section className="bg-surface p-10 rounded-3xl shadow-2xl border-l-8 border-l-amber-500 border border-border">
              <label className="block text-[12px] font-black text-text-secondary uppercase mb-6 tracking-[0.2em] flex justify-between items-center">
                <span className="flex items-center gap-2"><Icons.Zap className="w-4 h-4 text-secondary-theme" /> LINHAS DE ESFORÇO</span>
                <button 
                  onClick={() => setShowLinhasInfo(true)}
                  aria-label="Informações sobre Linhas de Esforço"
                  className="p-2 hover:bg-amber-400/10 rounded-full transition-all text-amber-400 animate-pulse"
                  title="O que é?"
                >
                  <Icons.Lightbulb className="w-5 h-5 fill-amber-400/20" />
                </button>
              </label>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-[12px] font-black text-text-secondary uppercase mb-3 tracking-[0.2em] flex justify-center items-center">
                    {linha === LinhaDeEsforco.DEFINIR_POR_IA && (
                      <span className="text-secondary-theme animate-pulse flex items-center gap-1 text-[10px]">
                        <Activity className="w-3 h-3" /> INTELIGÊNCIA ATIVA
                      </span>
                    )}
                  </label>
                  <select 
                    value={linha} 
                    onChange={(e) => setLinha(e.target.value as LinhaDeEsforco)} 
                    className={`w-full p-5 bg-background/50 border-2 rounded-2xl text-base font-bold outline-none transition-all cursor-pointer ${
                      linha === LinhaDeEsforco.DEFINIR_POR_IA 
                        ? 'border-secondary-theme text-secondary-theme' 
                        : 'border-border text-text-primary focus:border-secondary-theme'
                    }`}
                  >
                    {Object.values(LinhaDeEsforco).map(v => (
                      <option key={v} value={v} className="bg-background text-text-primary">
                        {v === LinhaDeEsforco.DEFINIR_POR_IA ? `🧠 ${v}` : v}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={linha === LinhaDeEsforco.DEFINIR_POR_IA ? 'opacity-50 pointer-events-none' : ''}>
                  <label className="block text-[12px] font-black text-text-secondary uppercase mb-3 tracking-[0.2em]">
                    {linha === LinhaDeEsforco.DEFINIR_POR_IA ? 'Ideia-Força (IA selecionará)' : 'Ideia-Força Vinculada'}
                  </label>
                  <select 
                    value={ideiaForca} 
                    onChange={(e) => setIdeiaForca(e.target.value)} 
                    disabled={linha === LinhaDeEsforco.DEFINIR_POR_IA}
                    className="w-full p-5 bg-secondary-theme/10 border-2 border-secondary-theme/10 rounded-2xl text-base font-black text-text-primary focus:border-secondary-theme outline-none transition-all shadow-sm cursor-pointer"
                  >
                    {IDEIAS_FORCA_MAP[linha].map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>
            </section>

            <section className="bg-surface p-10 rounded-3xl shadow-2xl border-l-8 border-l-indigo-500 border border-border">
              <label className="block text-[12px] font-black text-text-secondary uppercase mb-6 tracking-[0.2em] flex justify-between items-center">
                <span className="flex items-center gap-2"><LayoutGrid className="w-4 h-4 text-secondary-theme" /> Formas de Entrega</span>
                <button 
                  onClick={() => setShowFormasInfo(true)}
                  aria-label="Ajuda sobre Formas de Entrega"
                  className="p-2 hover:bg-amber-400/10 rounded-full transition-all text-amber-400 animate-pulse"
                  title="Ajuda nas Formas de Entrega"
                >
                  <Icons.Lightbulb className="w-5 h-5 fill-amber-400/20" />
                </button>
              </label>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setFormats([DeliveryFormat.INSTAGRAM, DeliveryFormat.WHATSAPP, DeliveryFormat.ARTICLE])}
                  className="flex items-center justify-center gap-2 py-3 bg-secondary-theme/5 hover:bg-secondary-theme/10 text-secondary-theme text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-secondary-theme/20"
                >
                  <CheckSquare className="w-3 h-3" /> Selecionar Todas
                </button>
                <button
                  onClick={() => setFormats([])}
                  className="flex items-center justify-center gap-2 py-3 bg-red-500/5 hover:bg-red-500/10 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-red-500/20"
                >
                  <Square className="w-3 h-3" /> Limpar Seleção
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {Object.values(DeliveryFormat).map((f) => (
                  <button
                    key={f}
                    onClick={() => toggleFormat(f)}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all group gap-3 ${
                      formats.includes(f)
                        ? 'bg-secondary-theme/10 border-secondary-theme text-text-primary'
                        : 'bg-background/40 border-border text-text-secondary hover:border-secondary-theme/50'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      {formats.includes(f) ? (
                        <CheckSquare className="w-5 h-5 text-secondary-theme" />
                      ) : (
                        <Square className="w-5 h-5 opacity-40 group-hover:opacity-100" />
                      )}
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-center">{f}</span>
                  </button>
                ))}
              </div>
            </section>

            <ControlCenter 
              style={style} 
              setStyle={setStyle} 
              provider={aiProvider}
              setProvider={setAiProvider}
              generateImageEnabled={generateImageEnabled}
              setGenerateImageEnabled={setGenerateImageEnabled}
              images={images}
              handleImageUpload={handleImageUpload}
              handleRemoveImage={removeImage}
              onOpenInfo={() => setShowImageInfo(true)}
            />


            <button
              onClick={handleGenerate}
              disabled={loading || processingPdf}
              className={`w-full py-8 rounded-3xl font-black text-primary-contrast uppercase tracking-[0.4em] shadow-2xl flex items-center justify-center gap-5 transition-all transform hover:-translate-y-1 active:scale-95 ${loading || processingPdf ? 'bg-border text-text-secondary cursor-not-allowed' : 'bg-primary-theme hover:opacity-90 ring-8 ring-primary-theme/5'}`}
            >
              {loading ? (
                <div className="flex items-center gap-5">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  SINTETIZANDO COMANDO...
                </div>
              ) : (
                <><Icons.Send className="w-6 h-6" /> EMITIR DIRETRIZ DIGITAL</>
              )}
            </button>
          </div>

          <div className="lg:col-span-7 space-y-12">
            {loading && (
              <div className="space-y-10">
                <div className="bg-white rounded-3xl h-[600px] animate-pulse border border-slate-100 shadow-2xl"></div>
                <div className="bg-white rounded-3xl h-80 animate-pulse border border-slate-100 shadow-2xl"></div>
              </div>
            )}

            {result && (
              <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 space-y-12 pb-32">
                {result.conflictWarnings && result.conflictWarnings.trim() !== "" && (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-red-50 border-l-8 border-red-700 p-8 rounded-3xl shadow-2xl"
                  >
                    <div className="flex items-center gap-5 mb-4">
                      <ShieldAlert className="w-10 h-10 text-red-700" />
                      <h4 className="text-lg font-black text-red-800 uppercase tracking-widest">ALERTA DE DIVERGÊNCIA TÁTICA</h4>
                    </div>
                    <p className="text-base text-red-900 font-black leading-relaxed italic">{result.conflictWarnings}</p>
                  </motion.div>
                )}

                {attachedFileName && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-center gap-4 bg-secondary-theme/10 border border-secondary-theme/30 px-6 py-4 rounded-2xl shadow-sm"
                  >
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="bg-secondary-theme text-white p-2 rounded-lg shadow-md">
                        <Icons.FileText className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] md:text-[11px] font-black text-text-primary uppercase tracking-[0.2em] whitespace-nowrap">Doutrina Aplicada:</span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <span className="text-xs font-bold text-secondary-theme truncate block tracking-wide">
                        {attachedFileName.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-secondary-theme/20 rounded-full shrink-0">
                      <div className="w-1.5 h-1.5 bg-secondary-theme rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                      <span className="text-[9px] font-black text-secondary-theme uppercase tracking-tighter">Indexação Ativa</span>
                    </div>
                  </motion.div>
                )}

                {linha === LinhaDeEsforco.DEFINIR_POR_IA && result.selectedLinha && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row items-start gap-4 bg-primary-theme/5 border border-primary-theme/20 px-8 py-6 rounded-3xl shadow-sm"
                  >
                    <div className="flex items-center gap-3 shrink-0 mt-1">
                      <div className="bg-primary-theme text-white p-2.5 rounded-xl shadow-lg ring-4 ring-primary-theme/10">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">Seleção Automática IA</span>
                        <span className="text-xs font-black text-primary-theme uppercase tracking-wider">Cérebro Doutrinário</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-text-secondary uppercase px-2 py-0.5 border border-border rounded text-[8px]">Linha</span>
                        <span className="text-sm font-black text-text-primary uppercase tracking-wide">{result.selectedLinha}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[10px] font-black text-text-secondary uppercase px-2 py-0.5 border border-border rounded text-[8px] mt-0.5">Ideia</span>
                        <span className="text-xs font-bold text-text-primary leading-relaxed">{result.selectedIdeia}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {result.instagram && formats.includes(DeliveryFormat.INSTAGRAM) && (
                  <DeliverableCard 
                    title="Social Media Institutional" 
                    titleGenerated={result.instagramTitle}
                    titleOptions={result.instagramTitleOptions}
                    titleJustification={result.instagramTitleJustification}
                    icon={<Icons.Camera className="w-5 h-5" />} 
                    badge="Instagram/FB" 
                    content={result.instagram} 
                    imageUrl={result.imageUrl} 
                    visualSuggestion={result.visualIdentitySuggestion}
                    generationError={result.imageGenerationError}
                  />
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-surface p-12 rounded-3xl shadow-2xl border-t-8 border-t-red-700 border border-border"
                  >
                    <h4 className="text-xs font-black text-red-900 dark:text-red-400 uppercase tracking-widest mb-6 flex items-center gap-5">
                      <span className="w-10 h-[4px] bg-red-700 rounded-full"></span> ANÁLISE DE RISCO REPUTACIONAL
                    </h4>
                    <p className="text-base text-text-primary leading-relaxed font-bold italic opacity-90 text-justify">{result.riskAnalysis}</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-surface p-12 rounded-3xl shadow-2xl border-t-8 border-t-info-accent border border-border"
                  >
                    <h4 className="text-xs font-black text-info-accent uppercase tracking-widest mb-6 flex items-center gap-5">
                      <span className="w-10 h-[4px] bg-info-accent rounded-full"></span> INDICADORES DE IMPACTO (KPI)
                    </h4>
                    <p className="text-base text-text-primary leading-relaxed font-bold italic opacity-90 text-justify">{result.impactMetrics}</p>
                  </motion.div>
                </div>

                {result.whatsapp && formats.includes(DeliveryFormat.WHATSAPP) && (
                  <DeliverableCard 
                    title="WhatsApp Corporativo" 
                    titleGenerated={result.whatsappTitle}
                    titleOptions={result.whatsappTitleOptions}
                    titleJustification={result.whatsappTitleJustification}
                    icon={<Icons.Send className="w-5 h-5" />} 
                    badge="Difusão Direta" 
                    content={result.whatsapp} 
                  />
                )}
                
                {result.article && formats.includes(DeliveryFormat.ARTICLE) && (
                  <DeliverableCard 
                    title="Artigo Técnico-Doutrinário" 
                    titleGenerated={result.articleTitle}
                    titleOptions={result.articleTitleOptions}
                    titleJustification={result.articleTitleJustification}
                    icon={<Icons.Shield className="w-5 h-5" />} 
                    badge="Pensamento Militar" 
                    content={result.article} 
                  />
                )}

                <section className="bg-surface p-12 rounded-3xl shadow-2xl border border-border relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-secondary-theme/5 -mr-24 -mt-24 rounded-full"></div>
                  <h4 className="text-xs font-black text-text-primary uppercase tracking-[0.3em] mb-10 flex justify-between items-center relative z-10">
                    <span className="flex items-center gap-3"><Info className="w-4 h-4" /> FUNDAMENTAÇÃO E FONTES DE CONSULTA</span>
                    <span className="text-[11px] bg-secondary-theme/10 text-secondary-theme px-5 py-2 rounded-full font-black border border-secondary-theme/20 shadow-sm uppercase">Doutrina Verificada</span>
                  </h4>
                  <div className="space-y-10 relative z-10">
                    {result.sourceLinks && result.sourceLinks.length > 0 && (
                      <div className="border-b border-border pb-10">
                        <p className="text-[11px] font-black text-text-secondary mb-6 uppercase tracking-widest">Hiperlinks de Inteligência Externa:</p>
                        <div className="flex flex-wrap gap-5">
                          {result.sourceLinks.map((link, i) => (
                            <a 
                              key={i} 
                              href={link.uri} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs bg-surface text-text-primary border-2 border-border px-6 py-4 rounded-2xl hover:border-secondary-theme hover:text-text-primary hover:shadow-2xl transition-all flex items-center gap-5 font-black group"
                            >
                              <div className="w-8 h-8 bg-background/50 rounded-xl flex items-center justify-center shrink-0 border border-border group-hover:bg-secondary-theme/10 transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                              </div>
                              <span className="truncate max-w-[300px]">{link.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {result.sources.map((src, i) => (
                        <div key={i} className="text-[12px] text-text-secondary uppercase flex items-start gap-5 bg-background/30 p-6 rounded-2xl border border-border hover:bg-background transition-all hover:shadow-md">
                          <span className="w-3 h-3 bg-secondary-theme rounded-full shrink-0 mt-1.5 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span> 
                          <span className="leading-tight font-black opacity-80">{src}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="max-w-7xl mx-auto px-4 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            try {
              sessionStorage.removeItem('coter_auth');
            } catch {}
            setIsAuthenticated(false);
            showStatus('info', 'Sessão encerrada.');
          }}
          className="flex items-center gap-3 px-8 py-4 bg-red-600/10 hover:bg-red-600/20 text-red-600 rounded-2xl border border-red-500/30 transition-all font-black uppercase tracking-[0.2em] text-[10px] mb-8 shadow-sm hover:shadow-red-500/10"
        >
          <Trash2 className="w-4 h-4" />
          Sair do Sistema
        </motion.button>
      </div>

      <footer className="max-w-7xl mx-auto py-16 px-4 text-center border-t border-border space-y-6">
        <div className="space-y-1">
          <p className="text-[9px] font-black text-text-secondary uppercase tracking-[0.4em] opacity-80">Concepção</p>
          <p className="text-[12px] font-bold text-text-primary uppercase tracking-[0.2em]">TC LUIZ ALVES</p>
        </div>
        <div className="space-y-1">
          <p className="text-[9px] font-black text-text-secondary uppercase tracking-[0.4em] opacity-80">Desenvolvimento e Implementação</p>
          <p className="text-[12px] font-bold text-text-primary uppercase tracking-[0.2em]">ST ERNANI P. JÚNIOR</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
