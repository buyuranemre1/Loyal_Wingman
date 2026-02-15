
import React from 'react';
import { RelationshipStatus } from '../types';

interface RelationshipSelectionProps {
  onSelect: (status: RelationshipStatus) => void;
}

const RelationshipSelection: React.FC<RelationshipSelectionProps> = ({ onSelect }) => {
  const options: { id: RelationshipStatus; label: string; icon: string }[] = [
    { id: 'none', label: 'İlişkim yok', icon: '👤' },
    { id: 'short', label: 'Kısa süreli ilişkim var', icon: '🔥' },
    { id: 'long', label: 'Uzun süreli ilişkim var', icon: '💎' },
    { id: 'married', label: 'Evliyim', icon: '💍' },
  ];

  return (
    <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center p-8 z-50">
      <div className="max-w-md w-full space-y-12 text-center animate-fade-in">
        <div className="space-y-4">
          <h2 className="brand-font text-4xl md:text-5xl font-bold text-white tracking-tighter">
            DURUMUNU BELİRLE
          </h2>
          <p className="text-stone-500 text-xs font-black uppercase tracking-[0.4em]">Strateji için zemin hazırlıyoruz</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className="w-full p-6 bg-white/[0.03] border border-white/5 rounded-2xl text-left hover:bg-white/5 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{opt.icon}</span>
                <span className="text-stone-300 font-medium group-hover:text-white transition-colors uppercase tracking-widest text-sm">{opt.label}</span>
              </div>
              <span className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelationshipSelection;
