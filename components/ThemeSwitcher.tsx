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
    <div className="grid grid-cols-3 gap-3 w-full max-w-2xl mx-auto mb-0">
      {themes.map((t) => {
        const isActive = theme === t.id;
        const Icon = t.icon;
        
        return (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all group gap-3 relative overflow-hidden ${
              isActive 
                ? 'bg-secondary-theme/10 border-secondary-theme text-text-primary' 
                : 'bg-surface/50 border-border text-text-secondary hover:border-secondary-theme/50 md:bg-surface/30'
            }`}
            id={`theme-btn-${t.id}`}
          >
            {isActive && (
              <motion.div
                layoutId="active-theme-indicator"
                className="absolute top-2 right-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Check className="w-4 h-4 text-secondary-theme" />
              </motion.div>
            )}
            
            <div className={`p-2.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-secondary-theme text-white shadow-lg shadow-secondary-theme/20' : 'bg-background/50 group-hover:bg-secondary-theme/10'}`}>
              <Icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? 'text-primary-contrast' : t.color}`} />
            </div>
            
            <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-widest text-center ${isActive ? 'text-secondary-theme' : ''}`}>
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
