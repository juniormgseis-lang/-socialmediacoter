import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Theme } from '../types';
import { Sun, Moon, Shield, Check } from 'lucide-react';
import { motion } from 'motion/react';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: Theme.LIGHT, label: 'Claro', icon: Sun, color: 'text-amber-500' },
    { id: Theme.DARK, label: 'Escuro', icon: Moon, color: 'text-blue-400' },
    { id: Theme.COTER, label: 'Institucional', icon: Shield, color: 'text-emerald-500' },
  ];

  return (
    <div className="bg-surface/50 backdrop-blur-md p-1.5 rounded-2xl border border-border shadow-xl w-full max-w-2xl mx-auto flex">
      {themes.map((t) => {
        const isActive = theme === t.id;
        const Icon = t.icon;
        
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-[10px] md:text-sm font-black uppercase tracking-widest transition-all duration-300 ${
              isActive 
                ? 'text-white' 
                : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
            }`}
            id={`theme-btn-${t.id}`}
          >
            {isActive && (
              <motion.div
                layoutId="active-theme"
                className="absolute inset-1 bg-secondary-theme rounded-lg shadow-lg border border-white/10"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Icon className={`w-4 h-4 md:w-5 md:h-5 ${isActive ? 'text-primary-contrast' : t.color}`} />
              <span className={isActive ? 'text-primary-contrast' : ''}>{t.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};
