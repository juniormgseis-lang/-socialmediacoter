import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from '../types';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('coter-theme');
      return (saved as Theme) || Theme.LIGHT;
    } catch {
      return Theme.LIGHT;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('coter-theme', theme);
    } catch (e) {
      console.warn('Falha ao salvar tema no localStorage:', e);
    }
    document.documentElement.setAttribute('data-theme', theme);
    
    // Also manage class for tailwind dark mode if needed, 
    // but the prompt asked for data-theme variables.
    if (theme === Theme.DARK) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
