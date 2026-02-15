
import React from 'react';

interface AdviceCardProps {
  title: string;
  content: string;
  onClick?: () => void;
}

const AdviceCard: React.FC<AdviceCardProps> = ({ title, content, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl p-4 transition-all cursor-pointer group"
    >
      <h3 className="text-amber-500 font-semibold mb-2 flex items-center">
        <span className="mr-2 opacity-70 group-hover:opacity-100">#</span>
        {title}
      </h3>
      <p className="text-slate-400 text-sm italic leading-relaxed">
        "{content}"
      </p>
    </div>
  );
};

export default AdviceCard;
