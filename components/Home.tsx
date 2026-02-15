
import React from 'react';
import { View } from '../App';

interface HomeProps {
  onNav: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ onNav }) => {
  const actions = [
    {
      id: 'chat',
      title: 'DERDİNİ ANLAT',
      desc: 'Rasyonel mentorunla baş başa stratejik diyalog kur.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
    {
      id: 'profile',
      title: 'PROFİL ANALİZİ',
      desc: 'Dijital kimliğini rasyonel süzgeçten geçir.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: 'quiz',
      title: 'ÇERÇEVENİ TEST ET',
      desc: 'Sosyal dinamikleri ve shit testleri analiz et.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'education',
      title: 'EĞİTİM ARŞİVİ',
      desc: 'Yılların birikimi olan rasyonel dökümanlar.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      id: 'premium',
      title: 'SINIRSIZ GÜÇ',
      desc: '',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      tag: 'PREMIUM'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="min-h-full flex flex-col items-center justify-center p-8 md:p-16 animate-fade-in">
        <div className="text-center mb-16 max-w-3xl shrink-0">
          <h2 className="brand-font text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">LOYAL WINGMAN</h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-6"></div>
          <p className="text-stone-400 text-lg md:text-xl font-light italic leading-relaxed tracking-wide">
            "Kendi değerini keşfetmek, dış dünyayı fethetmenin ilk adımıdır."
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl pb-20">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={() => onNav(action.id as View)}
              className={`
                group relative flex flex-col p-10 rounded-[2rem] text-left transition-all duration-700
                hover:bg-white/[0.06] hover:-translate-y-2
                min-h-[260px] ${action.id === 'premium' ? 'btn-metallic-gold' : 'premium-card border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'}
              `}
            >
              <div className={`mb-8 p-3 w-fit rounded-xl transition-colors duration-500 ${action.id === 'premium' ? 'bg-black/40 text-white' : 'bg-white/5 text-stone-400 group-hover:text-amber-200'}`}>
                {action.icon}
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-xl font-bold tracking-[0.1em] ${action.id === 'premium' ? 'text-zinc-950' : 'text-white'}`}>{action.title}</h3>
                {action.tag && (
                  <span className={`text-[8px] font-black tracking-[0.2em] px-2 py-1 rounded-md ${action.id === 'premium' ? 'bg-black text-amber-400' : 'bg-black text-amber-500'}`}>
                    {action.tag}
                  </span>
                )}
              </div>
              
              {action.desc && (
                <p className={`text-sm font-semibold leading-relaxed tracking-tight transition-colors duration-500 ${action.id === 'premium' ? 'text-zinc-900' : 'text-stone-400 group-hover:text-stone-200'}`}>
                  {action.desc}
                </p>
              )}
              
              <div className={`mt-auto pt-8 flex items-center text-[10px] font-black tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-[-10px] group-hover:translate-x-0 ${action.id === 'premium' ? 'text-zinc-950' : 'text-amber-500'}`}>
                KEŞFET <span className="ml-2">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
