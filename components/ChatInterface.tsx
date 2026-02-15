
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Role, Message, UserProfile, LIMITS } from '../types';
import { geminiService } from '../services/geminiService';

interface ChatInterfaceProps {
  profile: UserProfile;
  onIncrementUsage: () => void;
  onUpgradeRequest: () => void;
  onViolation: () => void;
}

const PROFANITY_LIST = ['karı', 'amk', 'aq', 'sik', 'göt', 'piç', 'yavşak', 'orospu', 'fahişe', 'kaşar', 'kezban'];

const ChatInterface: React.FC<ChatInterfaceProps> = ({ profile, onIncrementUsage, onUpgradeRequest, onViolation }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const tierLimits = LIMITS[profile.tier];
  const remaining = tierLimits.chat === Infinity ? '∞' : Math.max(0, tierLimits.chat - profile.chatUsage);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const checkViolation = (text: string) => {
    const lower = text.toLowerCase();
    return PROFANITY_LIST.some(word => lower.includes(word));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading || profile.isBanned) return;

    if (checkViolation(input)) {
      onViolation();
      const warning: Message = {
        role: Role.MODEL,
        isWarning: true,
        text: "Bak aslanım, bu üslup rasyonel bir erkeğe yakışmaz. Öfken senin zayıflığındır. Bir kadına veya duruma küfretmek kontrolü kaybettiğinin kanıtıdır. Sakinleş ve öyle gel."
      };
      setMessages(prev => [...prev, { role: Role.USER, text: input }, warning]);
      setInput('');
      return;
    }

    if (tierLimits.chat !== Infinity && profile.chatUsage >= tierLimits.chat) {
      alert("Mesaj kotan doldu aslanım. Daha fazla rasyonellik için çerçeveni genişlet (Premium).");
      onUpgradeRequest();
      return;
    }

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
    onIncrementUsage();

    const newMessages: Message[] = [...messages, { role: Role.USER, text: userMessage }];
    setMessages(newMessages);

    try {
      let assistantText = '';
      const messageIndex = newMessages.length;
      setMessages(prev => [...prev, { role: Role.MODEL, text: '...' }]);
      const stream = geminiService.sendMessageStream(userMessage, profile.relationshipStatus);
      for await (const chunk of stream) {
        assistantText += chunk;
        setMessages(prev => {
          const updated = [...prev];
          updated[messageIndex] = { role: Role.MODEL, text: assistantText };
          return updated;
        });
      }
    } catch (error: any) {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: Role.MODEL, text: 'Bağlantı koptu delikanlı.', isError: true };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (profile.isBanned) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-black/95">
        <h2 className="brand-font text-5xl font-bold text-white mb-6">SAKİNLEŞTİĞİNDE GEL</h2>
        <p className="text-stone-400 italic">"Zihnini kontrol edemeyen, dünyayı kontrol edemez."</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950 relative">
      <div className="absolute top-4 right-4 z-30">
        <div className="bg-black/40 backdrop-blur-md border border-white/5 px-4 py-2 rounded-full flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${remaining === 0 ? 'bg-red-500 animate-pulse' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'}`}></div>
          <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">
            KALAN: <span className="text-white">{remaining}</span>
          </span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-16 space-y-12 z-10">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <p className="text-stone-400 text-xl font-light italic tracking-widest">Olayı anlat, dinamiği çözelim delikanlı.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === Role.USER ? 'justify-end' : 'justify-start'}`}>
            <div className={`group relative max-w-[90%] md:max-w-[70%] p-8 transition-all rounded-2xl ${msg.role === Role.USER ? 'bg-zinc-900 text-white' : 'bg-white/[0.03] text-stone-100 gold-border backdrop-blur-md'} ${msg.isWarning ? 'border-amber-900/50 bg-amber-950/10' : ''}`}>
              {msg.role === Role.MODEL && <span className="text-[8px] font-black uppercase tracking-[0.5em] text-amber-200/50 mb-4 block">WINGMAN ANALİZ</span>}
              <p className="whitespace-pre-wrap text-base md:text-lg leading-relaxed font-light italic">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 md:p-12 border-t border-stone-900/50 bg-zinc-950/90 z-20">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); } }}
            placeholder="Senaryoyu yaz, analiz edeyim..."
            className="w-full bg-zinc-900/40 border border-stone-800 rounded-2xl px-8 py-6 pr-24 focus:outline-none focus:border-amber-500/50 transition-all text-white min-h-[80px]"
            rows={1}
          />
          <button type="submit" disabled={!input.trim() || isLoading} className="absolute right-4 bottom-4 p-4 text-amber-200 bg-amber-500/10 rounded-xl">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
