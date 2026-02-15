
import React from 'react';

interface PlaceholderViewProps {
  title: string;
  description: string;
  onBack: () => void;
}

const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title, description, onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fade-in">
      <div className="w-24 h-24 bg-amber-600/10 rounded-full flex items-center justify-center mb-8 border border-amber-500/20 animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h2 className="brand-font text-4xl font-bold text-white mb-6 tracking-tight">{title}</h2>
      <p className="text-slate-400 text-lg font-light leading-relaxed max-w-lg italic mb-10">
        "{description}"
      </p>
      <div className="flex flex-col items-center">
        <span className="text-[10px] font-black tracking-[0.5em] text-amber-500 uppercase mb-8 opacity-60">Geliştirme Aşamasında</span>
        <button 
          onClick={onBack}
          className="px-10 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-all active:scale-95"
        >
          Geri Dön
        </button>
      </div>
    </div>
  );
};

export default PlaceholderView;
