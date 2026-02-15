
import React, { useState, useRef } from 'react';
import { geminiService } from '../services/geminiService';
import { UserProfile, LIMITS } from '../types';

interface MaskAnalysisViewProps {
  profile: UserProfile;
  onIncrementUsage: () => void;
  onUpgradeRequest: () => void;
  onBack: () => void;
}

const MaskAnalysisView: React.FC<MaskAnalysisViewProps> = ({ profile, onIncrementUsage, onUpgradeRequest, onBack }) => {
  const [mode, setMode] = useState<'selection' | 'analyzing' | 'result'>('selection');
  const [analysisResult, setAnalysisResult] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tierLimits = LIMITS[profile.tier];
  const remaining = tierLimits.analysis === Infinity ? '∞' : Math.max(0, tierLimits.analysis - profile.analysisUsage);

  const handleAnalysis = async (type: 'image' | 'link', data: string) => {
    if (tierLimits.analysis !== Infinity && profile.analysisUsage >= tierLimits.analysis) {
      alert("Analiz kotan doldu aslanım.");
      onUpgradeRequest();
      return;
    }

    if (type === 'image') {
      setPreviewImage(data);
    } else {
      setPreviewImage(null);
    }

    setMode('analyzing');
    onIncrementUsage();
    try {
      const res = type === 'image' ? await geminiService.analyzeImage(data, "Görsel") : await geminiService.analyzeLink(data);
      setAnalysisResult(res);
      setMode('result');
    } catch (e) {
      setMode('selection');
      alert("Hata oluştu.");
    }
  };

  if (mode === 'analyzing') return (
    <div className="h-full flex flex-col items-center justify-center text-white italic animate-pulse space-y-6">
      <div className="w-16 h-16 border-t-2 border-amber-500 rounded-full animate-spin"></div>
      <p className="brand-font text-2xl">Süzgeçten geçiyorsun...</p>
    </div>
  );

  if (mode === 'result') return (
    <div className="p-12 space-y-12 overflow-y-auto custom-scrollbar flex flex-col items-center">
      <div className="text-center space-y-4">
        <h2 className="brand-font text-5xl font-bold text-white tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
          TEŞHİS RAPORU
        </h2>
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
      </div>

      <div className="max-w-3xl w-full flex flex-col items-center space-y-10 pb-20">
        {previewImage && (
          <div className="relative">
            <div className="absolute -inset-1 bg-amber-500/20 blur-xl rounded-full"></div>
            <div className="w-32 h-32 rounded-full border-2 border-amber-500/50 p-1 overflow-hidden relative">
              <img src={previewImage} alt="Analiz edilen" className="w-full h-full object-cover rounded-full" />
            </div>
          </div>
        )}
        
        <div className="bg-zinc-900 p-10 rounded-[3rem] border-l-4 border-amber-500 italic text-xl leading-relaxed text-stone-200 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          {analysisResult}
        </div>
        
        <button onClick={() => setMode('selection')} className="w-full py-5 btn-metallic-gold text-black font-black rounded-2xl uppercase tracking-widest shadow-xl active:scale-95 transition-all">
          YENİ ANALİZ BAŞLAT
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-12 space-y-12 overflow-y-auto custom-scrollbar">
      <div className="text-center space-y-4">
        <h2 className="brand-font text-5xl md:text-7xl font-bold text-white tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
          ANALİZ MERKEZİ
        </h2>
        <p className="text-stone-500 font-black text-[10px] tracking-widest uppercase">KALAN HAKKIN: <span className="text-amber-500">{remaining}</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <button onClick={() => fileInputRef.current?.click()} className="group relative p-12 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/10 transition-all text-center overflow-hidden">
          <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-all"></div>
          <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform">📸</div>
          <h3 className="brand-font text-2xl font-bold text-white mb-2 tracking-tighter drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">GÖRSEL ANALİZİ</h3>
          <p className="text-stone-500 text-xs italic">SMV teşhisi için fotoğraf yükle.</p>
        </button>

        <button onClick={() => { const link = prompt("Profil linki gir:"); if(link) handleAnalysis('link', link); }} className="group relative p-12 bg-white/5 border border-white/10 rounded-[3rem] hover:bg-white/10 transition-all text-center overflow-hidden">
          <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/5 transition-all"></div>
          <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform">🔗</div>
          <h3 className="brand-font text-2xl font-bold text-white mb-2 tracking-tighter drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">LİNK ANALİZİ</h3>
          <p className="text-stone-500 text-xs italic">Sosyal medyanı denetime sok.</p>
        </button>
      </div>

      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => handleAnalysis('image', reader.result as string);
          reader.readAsDataURL(file);
        }
      }} />

      <div className="mt-12 text-center">
        <button onClick={onBack} className="text-stone-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.4em]">
          Vazgeç ve Geri Dön
        </button>
      </div>
    </div>
  );
};

export default MaskAnalysisView;
