
import React from 'react';
import { APP_NAME } from '../constants';

interface HeaderProps {
  onMenuClick: () => void;
  onLogoClick: () => void;
  onChatClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onLogoClick, onChatClick }) => {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-2xl border-b border-white/5 py-4 md:py-6 px-6 md:px-10 flex items-center justify-between">
      <div className="flex items-center gap-4 md:gap-8">
        <button 
          onClick={onMenuClick}
          className="group flex flex-col items-start gap-1 p-2 active:scale-95 transition-all"
          aria-label="Menü"
        >
          <div className="w-6 h-[1px] bg-stone-500 group-hover:bg-stone-200 transition-colors"></div>
          <div className="w-4 h-[1px] bg-stone-500 group-hover:bg-stone-200 transition-colors"></div>
        </button>
        
        <button 
          onClick={onLogoClick}
          className="flex items-center hover:opacity-70 transition-all duration-700"
        >
          <h1 className="brand-font text-lg md:text-xl font-bold tracking-[0.3em] text-white">
            {APP_NAME}
          </h1>
        </button>
      </div>

      <button 
        onClick={onChatClick}
        className="btn-metallic-gold flex items-center gap-2 px-4 py-2 rounded-xl text-zinc-950 active:scale-95 group transition-all"
        aria-label="Hızlı Sohbet"
      >
        <span className="hidden md:block text-[10px] font-black tracking-widest uppercase">WINGMAN'E SOR</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </header>
  );
};

export default Header;
