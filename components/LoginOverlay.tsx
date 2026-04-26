
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ShieldCheck, ChevronRight, AlertCircle } from 'lucide-react';
import { COTER_LOGO_URL } from '../constants';

interface LoginOverlayProps {
  onLogin: (password: string) => void;
}

export const LoginOverlay: React.FC<LoginOverlayProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '@coter') {
      onLogin(password);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background overflow-hidden">
      {/* Background Decors */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-theme/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-theme/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="bg-surface p-8 md:p-12 rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.2)] border border-border relative overflow-hidden">
          {/* Top Bar Decoration */}
          <div className="absolute top-0 left-0 right-0 h-1.5 military-gradient"></div>
          
          <div className="flex flex-col items-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <img 
                src={COTER_LOGO_URL} 
                alt="COTER Logo" 
                className="h-24 w-auto drop-shadow-2xl brightness-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-2 -right-2 bg-primary-theme text-white p-2 rounded-full shadow-lg border-4 border-surface">
                <Lock className="w-4 h-4" />
              </div>
            </motion.div>

            <div className="text-center space-y-2">
              <h1 className="text-2xl font-black tracking-tighter uppercase italic leading-none text-text-primary">
                Acesso Restrito
              </h1>
              <p className="text-[10px] font-mono text-text-secondary font-black uppercase tracking-[0.3em]">
                Comando de Operações Terrestres
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="space-y-4">
                <label className="block text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] flex items-center gap-2 px-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary-theme" /> Entre com a senha de usuário
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoFocus
                    className={`w-full bg-background/50 border-2 rounded-2xl py-5 px-6 font-bold text-lg outline-none transition-all placeholder:text-text-secondary/30 ${
                      error 
                        ? 'border-red-500 ring-4 ring-red-500/10 focus:border-red-500' 
                        : 'border-border focus:border-primary-theme focus:ring-8 focus:ring-primary-theme/5'
                    }`}
                  />
                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-red-500 font-black text-[10px] uppercase tracking-wider"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>Incorreta</span>
                    </motion.div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-theme hover:bg-primary-theme/90 text-primary-contrast font-black uppercase tracking-[0.3em] py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3"
              >
                Autenticar Missão
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="pt-4 border-t border-border w-full text-center">
              <p className="text-[9px] font-black text-text-secondary uppercase tracking-[0.1em] opacity-40">
                Uso Exclusivo - COTER / Estratégia 2026
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
