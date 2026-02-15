
import React from 'react';
import { SubscriptionTier } from '../types';

interface PremiumViewProps {
  onBack: () => void;
  onUpgrade: (tier: SubscriptionTier) => void;
  currentTier: SubscriptionTier;
}

const PremiumView: React.FC<PremiumViewProps> = ({ onBack, onUpgrade, currentTier }) => {
  const plans: { id: SubscriptionTier; name: string; price: string; features: string[] }[] = [
    {
      id: 'basic',
      name: "TEMEL PAKET",
      price: "99 TL",
      features: ["Günlük 20 Mesaj", "Haftalık 3 Analiz", "Bronz Rozet", "Temel Tavsiyeler"]
    },
    {
      id: 'advanced',
      name: "GELİŞMİŞ PAKET",
      price: "199 TL",
      features: ["Sınırsız Mesaj", "Günlük 3 Analiz", "Gümüş Rozet", "Derin Analizler"]
    },
    {
      id: 'pro',
      name: "WINGMAN PRO",
      price: "499 TL",
      features: ["Sınırsız Her Şey", "Altın Rozet", "1-1 Mentorluk", "Özel Erişim"]
    }
  ];

  return (
    <div className="p-12 space-y-12 overflow-y-auto">
      <div className="text-center space-y-4">
        <h2 className="brand-font text-5xl md:text-7xl font-bold text-white tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
          SINIRSIZ GÜÇ
        </h2>
        <p className="text-stone-500 italic">"Geleceğini şansa bırakma, stratejiye bırak."</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map(plan => (
          <div key={plan.id} className={`p-10 rounded-[3rem] border flex flex-col justify-between space-y-8 transition-all ${currentTier === plan.id ? 'bg-amber-500/10 border-amber-500 shadow-2xl scale-105' : 'bg-white/5 border-white/5'}`}>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white uppercase italic">{plan.name}</h3>
              <div className="text-4xl font-black text-white">{plan.price}</div>
              <ul className="space-y-3 pt-6 border-t border-white/5">
                {plan.features.map((f, i) => <li key={i} className="text-sm text-stone-400 flex items-center gap-2"><span>✓</span> {f}</li>)}
              </ul>
            </div>
            <button 
              onClick={() => onUpgrade(plan.id)}
              disabled={currentTier === plan.id}
              className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${currentTier === plan.id ? 'bg-stone-800 text-stone-500 cursor-not-allowed' : 'btn-metallic-gold text-black'}`}
            >
              {currentTier === plan.id ? 'MEVCUT PAKET' : 'YÜKSELT'}
            </button>
          </div>
        ))}
      </div>
      
      <button onClick={onBack} className="w-full py-4 text-stone-500 uppercase font-black text-[10px] tracking-widest">Geri Dön</button>
    </div>
  );
};

export default PremiumView;
