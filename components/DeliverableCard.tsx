
import React from 'react';
import { jsPDF } from 'jspdf';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { Download, FileDown, Copy, Check } from 'lucide-react';
import { Icons } from '../constants';

interface DeliverableCardProps {
  title: string;
  titleGenerated?: string;
  titleOptions?: string[];
  titleJustification?: string;
  icon: React.ReactNode;
  content: string;
  badge?: string;
  imageUrl?: string;
  visualSuggestion?: string;
  generationError?: string;
}

export const DeliverableCard: React.FC<DeliverableCardProps> = ({ 
  title, 
  titleGenerated, 
  titleOptions,
  titleJustification,
  icon, 
  content, 
  badge, 
  imageUrl, 
  visualSuggestion, 
  generationError 
}) => {
  const [copied, setCopied] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);

  const handleDownloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `imagem_coter_${new Date().getTime()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - (margin * 2);

    // Cabeçalho Institucional
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("EXÉRCITO BRASILEIRO", pageWidth / 2, 20, { align: "center" });
    doc.setFontSize(10);
    doc.text("COMANDO DE OPERAÇÕES TERRESTRES", pageWidth / 2, 26, { align: "center" });
    
    doc.setLineWidth(0.5);
    doc.line(margin, 30, pageWidth - margin, 30);

    // Título do Card
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(title.toUpperCase(), margin, 42);

    let currentY = 52;

    // Título Gerado (Headline)
    if (titleGenerated) {
      doc.setFontSize(14);
      doc.setTextColor(30, 41, 59); // slate-800
      const titleLines = doc.splitTextToSize(titleGenerated.toUpperCase(), contentWidth);
      doc.text(titleLines, margin, currentY);
      currentY += (titleLines.length * 8) + 5;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(0);
    const cleanText = content
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/<u>(.*?)<\/u>/g, '$1');
    
    const lines = doc.splitTextToSize(cleanText, contentWidth);
    doc.text(lines, margin, currentY);

    let nextY = currentY + (lines.length * 7);

    if (!imageUrl && visualSuggestion) {
      nextY += 10;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(16, 185, 129); // emerald-500
      doc.text("SUGESTÃO DE IDENTIDADE VISUAL:", margin, nextY);
      
      nextY += 7;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139); // slate-500
      const suggestionLines = doc.splitTextToSize(visualSuggestion, contentWidth);
      doc.text(suggestionLines, margin, nextY);
    }

    // Rodapé de Autenticidade
    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Documento Gerado por COTER AI Factory (Persona TC Luiz Alves) - ${new Date().toLocaleDateString('pt-BR')}`,
        pageWidth / 2,
        doc.internal.pageSize.getHeight() - 10,
        { align: "center" }
      );
    }

    const fileName = `${title.toLowerCase().replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
    doc.save(fileName);
  };

  const handleCopy = () => {
    const plainText = content.replace(/<[^>]*>?/gm, '').replace(/\*\*/g, '');
    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface rounded-xl shadow-lg border border-border overflow-hidden flex flex-col h-full"
    >
      <div className="bg-background/30 px-6 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary-theme/10 text-secondary-theme rounded-lg">
            {icon}
          </div>
          <h3 className="font-bold text-text-primary uppercase text-sm tracking-wide">{title}</h3>
        </div>
        {badge && (
          <span className="text-[10px] font-bold px-2 py-1 bg-border text-text-secondary rounded uppercase">
            {badge}
          </span>
        )}
      </div>
      
      {imageUrl && (
        <div className="relative aspect-square w-full bg-background/50 border-b border-border group">
          <img 
            src={imageUrl} 
            alt="Generated Visual Content" 
            className="w-full h-full object-cover shadow-inner"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end h-1/3 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-[9px] text-accent-theme font-black uppercase tracking-widest">Layout Institucional Aplicado</p>
            <p className="text-[8px] text-white/70 font-mono uppercase">Dimensão: 1080x1080 | Identidade: Estratégia 2026</p>
          </div>
          <div className="absolute top-4 right-4 bg-primary-theme/80 backdrop-blur-md px-3 py-1 rounded text-[10px] text-white font-bold uppercase tracking-widest shadow-lg border border-white/20">
            Preview Final
          </div>
          <button 
            onClick={handleDownloadImage}
            className="absolute bottom-4 right-4 bg-surface/90 hover:bg-surface text-primary-theme p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
            title="Baixar Imagem JPG"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      )}

      {!imageUrl && visualSuggestion && (
        <div className={`bg-secondary-theme/5 border-b border-border p-6 flex items-start gap-4 ${generationError ? 'border-l-4 border-l-amber-500 bg-amber-50/50' : ''}`}>
          <div className={`p-3 rounded-xl shadow-lg shrink-0 ${generationError ? 'bg-amber-600' : 'bg-secondary-theme'} text-white`}>
            {generationError ? <Icons.AlertTriangle className="w-5 h-5" /> : <Icons.Camera className="w-5 h-5" />}
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h4 className={`text-[10px] font-black uppercase tracking-widest ${generationError ? 'text-amber-800' : 'text-secondary-theme'}`}>
                {generationError ? 'Limite de Geração Atingido' : 'Sugestão de Identidade Visual'}
              </h4>
              {generationError && (
                <span className="bg-amber-100 text-amber-800 text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">Cota Excedida</span>
              )}
            </div>

            {generationError && (
              <p className="text-[11px] text-amber-900 font-bold leading-none bg-amber-200/30 p-2 rounded border border-amber-200">
                O motor de imagem está indisponível agora. Abaixo, fornecemos um roteiro detalhado para que você possa gerar ou produzir esta imagem em ferramentas externas.
              </p>
            )}

            <p className="text-xs text-text-primary font-bold italic leading-relaxed">"{visualSuggestion}"</p>
            
            <div className="pt-2 space-y-2">
              <p className="text-[10px] text-text-secondary font-medium uppercase opacity-60 italic leading-tight">
                * Sugestão de Ferramentas: <span className="font-bold underline">Adobe Firefly</span>, <span className="font-bold underline">Midjourney</span>, <span className="font-bold underline">Microsoft Designer</span> ou <span className="font-bold underline">DALL-E</span>. Copie o texto acima e utilize como prompt nestas plataformas.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 flex-grow space-y-6">
        {titleGenerated && (
          <div className="border-b border-border pb-4 space-y-4">
            <div>
              <h4 className="text-[10px] font-black text-secondary-theme uppercase tracking-[0.2em] mb-2">Headline do Comando</h4>
              <p className="text-xl font-black text-text-primary tracking-tighter uppercase italic leading-tight">{titleGenerated}</p>
            </div>
            
            {titleOptions && titleOptions.length > 0 && (
              <div className="bg-background/20 rounded-xl p-4 border border-border/50">
                <button 
                  onClick={() => setShowOptions(!showOptions)}
                  className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors"
                >
                  <span>Ver outras opções de títulos</span>
                  <Icons.AlertTriangle className={`w-3 h-3 transition-transform ${showOptions ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {showOptions && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 space-y-3">
                        {titleOptions.map((opt, idx) => (
                          <div key={idx} className={`p-3 rounded-lg border text-[11px] font-bold uppercase tracking-tight leading-tight ${opt === titleGenerated ? 'bg-secondary-theme/10 border-secondary-theme/30 text-text-primary shadow-sm' : 'bg-transparent border-transparent text-text-secondary'}`}>
                            <div className="flex justify-between gap-2">
                              <span>{opt}</span>
                              {opt === titleGenerated && <span className="text-[8px] px-1 bg-secondary-theme text-white rounded shrink-0 h-fit">MELHOR</span>}
                            </div>
                          </div>
                        ))}
                        {titleJustification && (
                          <div className="mt-2 p-3 bg-primary-theme/5 rounded-lg border border-primary-theme/10">
                            <p className="text-[9px] font-black text-primary-theme uppercase tracking-wider mb-1">Análise da Melhor Escolha</p>
                            <p className="text-[10px] text-text-primary font-bold italic">"{titleJustification}"</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
        <div className="prose prose-sm max-w-none text-text-primary leading-relaxed font-normal markdown-body">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
      <div className="px-6 py-4 bg-background/30 border-t border-border flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-4">
          <button 
            onClick={handleDownloadPDF}
            className="text-xs font-bold text-secondary-theme hover:opacity-80 flex items-center gap-1.5 transition-colors"
          >
            <FileDown className="w-4 h-4" />
            BAIXAR PDF
          </button>
          
          {imageUrl && (
            <button 
              onClick={handleDownloadImage}
              className="text-xs font-bold text-primary-theme hover:opacity-80 flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              BAIXAR JPG
            </button>
          )}
        </div>

        <button 
          onClick={handleCopy}
          className="text-xs font-bold text-text-secondary hover:text-text-primary flex items-center gap-1 transition-colors ml-auto"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          {copied ? 'COPIADO' : 'COPIAR TEXTO'}
        </button>
      </div>
    </motion.div>
  );
};
