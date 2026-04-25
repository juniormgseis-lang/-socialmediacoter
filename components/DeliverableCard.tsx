
import React from 'react';
import { jsPDF } from 'jspdf';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { Download, FileDown, Copy, Check } from 'lucide-react';

interface DeliverableCardProps {
  title: string;
  icon: React.ReactNode;
  content: string;
  badge?: string;
  imageUrl?: string;
}

export const DeliverableCard: React.FC<DeliverableCardProps> = ({ title, icon, content, badge, imageUrl }) => {
  const [copied, setCopied] = React.useState(false);

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
    doc.text(title.toUpperCase(), margin, 45);

    // Conteúdo (Limpeza de Markdown para o PDF simples)
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const cleanText = content
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/<u>(.*?)<\/u>/g, '$1');
    
    const lines = doc.splitTextToSize(cleanText, contentWidth);
    doc.text(lines, margin, 55);

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

      <div className="p-6 flex-grow">
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
