
import React, { useState } from 'react';
import { UserProfile, AVATARS, TIER_BADGES } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdate: (updated: UserProfile) => void;
  onBack: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ profile, onUpdate, onBack }) => {
  const [nickname, setNickname] = useState(profile.nickname);
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatarId);
  
  const badge = TIER_BADGES[profile.tier];

  const handleSave = () => {
    onUpdate({ ...profile, nickname, avatarId: selectedAvatar });
    alert('Profil güncellendi delikanlı.');
  };

  return (
    <div className="flex flex-col h-full p-6 md:p-12 animate-fade-in overflow-y-auto">
      <div className="mb-12 text-center">
        <h2 className="brand-font text-4xl font-bold text-white mb-2">PROFİL VE MERTEBE</h2>
      </div>

      <div className="max-w-2xl mx-auto w-full space-y-8 pb-20">
        <div className="bg-zinc-900/50 border border-white/5 p-12 rounded-[3rem] text-center space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="text-9xl">{badge.icon}</span>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div 
              className="w-32 h-32 rounded-full flex items-center justify-center text-5xl mb-6 shadow-2xl relative group overflow-hidden"
              style={{ 
                background: `linear-gradient(135deg, ${badge.color} 0%, #111 100%)`,
                border: `2px solid ${badge.color}44` 
              }}
            >
              <span className="drop-shadow-lg">{badge.icon}</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2" style={{ color: badge.color }}>{badge.name}</h3>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-600">{badge.rankName} RÜTBESİ</span>
          </div>

          <div className="space-y-6 pt-8 border-t border-white/5">
            <input 
              type="text" 
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-center text-xl text-white focus:outline-none focus:border-amber-500"
            />

            <div className="flex justify-center gap-4">
              {AVATARS.map(av => (
                <button
                  key={av.id}
                  onClick={() => setSelectedAvatar(av.id)}
                  className={`p-4 text-2xl rounded-2xl border transition-all ${selectedAvatar === av.id ? 'bg-amber-500/20 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-black border-white/5'}`}
                >
                  {av.icon}
                </button>
              ))}
            </div>

            <button onClick={handleSave} className="w-full py-5 btn-metallic-gold text-black font-black tracking-widest rounded-2xl">KAYDET</button>
          </div>
        </div>

        <button onClick={onBack} className="w-full py-4 text-stone-500 hover:text-white transition-colors text-[10px] font-black tracking-widest uppercase underline">Geri Dön</button>
      </div>
    </div>
  );
};

export default ProfileView;
