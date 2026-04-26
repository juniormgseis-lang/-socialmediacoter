
import React from 'react';

import { Shield, Camera, Send, FileText, AlertTriangle, BookOpen } from 'lucide-react';

export const COLORS = {
  ARMY_GREEN: '#4B5320',
  COTER_BLUE: '#0054A6', // Azul do Brasão
  COTER_RED: '#ED1C24',  // Vermelho do Brasão
  COTER_GOLD: '#FFD200', // Ouro do Brasão
  EMERALD_GLOW: '#10b981',
};

// URL de alta estabilidade (Proxy de Miniatura) do Google Drive para evitar bloqueios de CORS/Hotlink
export const COTER_LOGO_URL = "https://lh3.googleusercontent.com/d/17kc2nUXkquKM3y3uN0242Nl_r2BMWZfV";

export const Icons = {
  Shield: Shield,
  Camera: Camera,
  Send: Send,
  FileText: FileText,
  AlertTriangle: AlertTriangle,
  BookOpen: BookOpen,
};
