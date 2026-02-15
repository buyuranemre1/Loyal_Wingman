
import React, { useEffect, useState } from 'react';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [phase, setPhase] = useState<'initial' | 'visible' | 'fadeout'>('initial');

  useEffect(() => {
    // Zamanlamalar mevcut halinden %20 daha yavaşlatıldı
    const t1 = setTimeout(() => setPhase('visible'), 138);
    const t2 = setTimeout(() => setPhase('fadeout'), 3864);
    const t3 = setTimeout(onFinish, 4830);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center transition-all duration-[1200ms] ${phase === 'fadeout' ? 'opacity-0 scale-105' : 'opacity-100'}`}>
      <div className="text-center">
        <h1 
          className={`brand-font text-5xl md:text-8xl text-white font-bold tracking-[0.1em] transition-all duration-[2400ms] transform ease-out ${phase === 'visible' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          LOYAL WINGMAN
        </h1>
        <div 
          className={`h-[1px] bg-stone-700 mt-12 transition-all duration-[2400ms] ease-in-out mx-auto ${phase === 'visible' ? 'w-48 opacity-100' : 'w-0 opacity-0'}`}
        />
        <p className={`mt-8 text-[10px] font-black tracking-[0.6em] text-stone-500 transition-all duration-[2400ms] delay-[600ms] ${phase === 'visible' ? 'opacity-100' : 'opacity-0'}`}>
          ERKEK ADAMIN İLİŞKİ KOÇU
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
