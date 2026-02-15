
import React, { useEffect } from 'react';
import { View } from '../App';
import { UserProfile, AVATARS, TIER_BADGES } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNav: (view: View) => void;
  currentView: string;
  profile: UserProfile;
}

const NavItem: React.FC<{ label: string; isActive: boolean; onClick: () => void; special?: boolean }> = ({ label, isActive, onClick, special }) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center p-4 transition-all duration-700 text-left group
      ${isActive ? 'text-white' : 'text-stone-600 hover:text-stone-300'}
    `}
  >
    <div className={`w-1 h-1 rounded-full mr-6 transition-all duration-700 ${isActive ? 'bg-amber-400' : 'bg-transparent group-hover:bg-stone-800'}`}></div>
    <span className={`text-xs font-medium tracking-[0.3em] ${special ? 'gold-text' : ''}`}>{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNav, currentView, profile }) => {
  const userAvatar = AVATARS.find(a => a.id === profile.avatarId) || AVATARS[0];
  
  // Safe tier badge lookup with fallback to prevent crashes on undefined tier
  const userTier = (profile.tier && TIER_BADGES[profile.tier]) 
    ? TIER_BADGES[profile.tier] 
    : TIER_BADGES.free;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/90 backdrop-blur-2xl z-[100] transition-all duration-1000 ease-[cubic-bezier(0.22, 1, 0.36, 1)] ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div 
        className={`fixed top-0 left-0 h-full w-[90%] md:w-[450px] bg-zinc-950 border-r border-white/5 z-[110] transform transition-transform duration-1000 ease-[cubic-bezier(0.22, 1, 0.36, 1)] shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-12 md:p-16 flex flex-col h-full overflow-y-auto custom-scrollbar">
          <div className="flex items-center justify-between mb-20">
            <h2 className="brand-font text-3xl text-white font-bold tracking-[0.2em]">LOYAL WINGMAN</h2>
            <button 
              onClick={onClose} 
              className="group p-2 text-stone-600 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div 
            onClick={() => onNav('user_profile')}
            className="mb-16 flex items-center space-x-6 cursor-pointer group"
          >
            <div className="text-4xl p-4 bg-white/[0.02] border border-stone-900 rounded-full group-hover:border-stone-500 transition-all duration-700">
              {userAvatar?.icon}
            </div>
            <div>
              <p className="text-white font-light tracking-[0.1em] text-sm uppercase">{profile.nickname}</p>
              <div className="flex items-center mt-1">
                <span className="text-[9px] px-2 py-0.5 rounded-sm border border-stone-800 bg-stone-900/50 text-stone-400 font-bold tracking-widest uppercase">
                  {userTier.icon} {userTier.name}
                </span>
              </div>
              <p className="text-[8px] text-stone-600 uppercase font-black tracking-[0.4em] mt-3 group-hover:text-stone-400 transition-colors">Profil ve Ayarlar</p>
            </div>
          </div>
          
          <nav className="flex-1 space-y-1">
            <NavItem 
              label="ANA SAYFA"
              isActive={currentView === 'home'}
              onClick={() => onNav('home')}
            />
            <NavItem 
              label="DERDİNİ ANLAT"
              isActive={currentView === 'chat'}
              onClick={() => onNav('chat')}
            />
            <NavItem 
              label="PROFİL ANALİZİ"
              isActive={currentView === 'profile'}
              onClick={() => onNav('profile')}
            />
            <NavItem 
              label="EĞİTİM ARŞİVİ"
              isActive={currentView === 'education'}
              onClick={() => onNav('education')}
            />
            <div className="h-[1px] bg-stone-900 my-10"></div>
            <NavItem 
              label="ÇERÇEVENİ TEST ET"
              isActive={currentView === 'quiz'}
              onClick={() => onNav('quiz')}
            />
            <div className="h-[1px] bg-stone-900 my-10"></div>
            <NavItem 
              label="SINIRSIZ GÜÇ"
              isActive={currentView === 'premium'}
              onClick={() => onNav('premium')}
              special
            />
          </nav>
          
          <div className="mt-auto pt-20">
            <p className="text-[7px] text-stone-700 font-black uppercase tracking-[0.6em] leading-loose">
              LOYAL WINGMAN STRATEGIC MENTORSHIP<br />
              EST. 2024 / PRIVATE EDITION
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
