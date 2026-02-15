
import React, { useState, useMemo } from 'react';
import { SHIT_TEST_QUIZ } from '../constants';
import { geminiService } from '../services/geminiService';

interface QuizProps {
  onBack: () => void;
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ onBack, onComplete }) => {
  const questions = useMemo(() => {
    // Ensuring we have exactly the sorted list of SHIT_TEST_QUIZ (20 questions)
    return [...SHIT_TEST_QUIZ];
  }, []);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [openAnswer, setOpenAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleOptionSelect = (optIdx: number) => {
    if (selectedOption !== null || isEvaluating) return;
    const q = questions[currentIdx];
    if (q.options) {
      setSelectedOption(optIdx);
      setFeedback(q.options[optIdx].feedback);
      setScore(prev => prev + q.options[optIdx].score);
    }
  };

  const handleOpenSubmit = async () => {
    if (!openAnswer.trim() || isEvaluating) return;
    setIsEvaluating(true);
    
    try {
      const q = questions[currentIdx];
      const result = await geminiService.evaluateResponse(q.question, openAnswer);
      setScore(prev => prev + result.score);
      setFeedback(result.feedback);
    } catch (error) {
      setFeedback("Bir hata oluştu aslanım, rasyonel kalarak devam edelim.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setOpenAnswer('');
      setFeedback(null);
    } else {
      setShowResult(true);
      onComplete(score);
    }
  };

  const getFrameAnalysis = () => {
    const maxScore = questions.length * 10;
    const ratio = score / maxScore;
    
    if (ratio >= 0.85) {
      return {
        title: "Kırılmaz Çerçeve",
        analysis: "Duygusal reaktiviten sıfıra yakın. Gerçekliği sen yönetiyorsun ve shit testlerin içinden bir usta gibi geçiyorsun.",
        advice: "Böyle devam et koçum. Çevrendeki erkeklere de bu disiplini aşıla. Zirve yalnızdır ama manzarası güzeldir."
      };
    } else if (ratio >= 0.65) {
      return {
        title: "Gelişmiş Çerçeve",
        analysis: "Kavramları biliyorsun ve çoğu durumda kontrolü elinde tutuyorsun. Ancak bazen onay arama tuzağına düşme riskin var.",
        advice: "Kendi değerini dış onaydan tamamen bağımsız hale getir. Her buluşmada bir adım daha rasyonel olmaya odaklan."
      };
    } else if (ratio >= 0.4) {
      return {
        title: "Sarsıntılı Çerçeve",
        analysis: "Çerçeven var ama henüz pamuk ipliğine bağlı. Bir kriz anında veya derin bir shit testte hemen duygusal reaksiyon veriyorsun.",
        advice: "Stoacılık üzerine daha çok oku. Tepki vermeden önce 3 saniye durmayı ve olayın alt metnini okumayı alışkanlık haline getir."
      };
    } else {
      return {
        title: "Çerçevesiz (Mavi Hap)",
        analysis: "Zihnin tamamen manipülasyona ve duygusal rüzgarlara açık. Başkalarının çerçeveni çizmesine izin veriyorsun.",
        advice: "Acil durum! Eğitim arşivine dön ve 'Oneitis' ile 'Onay Arayıcılık' bölümlerini hatmet. Kendini inşa etmeden sağlıklı bir ilişki kuramazsın."
      };
    }
  };

  if (showResult) {
    const analysis = getFrameAnalysis();
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-8 h-full animate-fade-in overflow-y-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-500 brand-font drop-shadow-lg">{analysis.title}</h2>
        <div className="text-7xl font-black text-white drop-shadow-2xl">{score} <span className="text-xl text-stone-500">/ {questions.length * 10}</span></div>
        
        <div className="max-w-xl space-y-6">
          <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl">
            <h4 className="text-stone-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">DURUM ANALİZİ</h4>
            <p className="text-stone-100 italic text-lg leading-relaxed">{analysis.analysis}</p>
          </div>
          
          <div className="p-6 bg-amber-500/5 border border-amber-500/20 rounded-2xl">
            <h4 className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">LOYAL WINGMAN TAVSİYESİ</h4>
            <p className="text-amber-100 italic text-lg leading-relaxed">{analysis.advice}</p>
          </div>
        </div>

        <button 
          onClick={onBack}
          className="mt-8 px-12 py-4 btn-metallic-gold text-black font-black text-sm uppercase tracking-widest rounded-2xl"
        >
          Ana Menüye Dön
        </button>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="flex flex-col h-full p-6 md:p-12 animate-fade-in overflow-y-auto custom-scrollbar">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em]">Soru {currentIdx + 1} / {questions.length}</span>
          <h3 className="text-2xl md:text-4xl font-bold text-white brand-font mt-4 leading-tight">{q.question}</h3>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        {q.type === 'mcq' && q.options ? (
          <div className="space-y-4">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                disabled={selectedOption !== null || isEvaluating}
                onClick={() => handleOptionSelect(idx)}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                  selectedOption === idx 
                    ? 'btn-metallic-gold text-black border-white/20' 
                    : 'bg-zinc-900/40 border-white/5 hover:border-white/20 disabled:opacity-50'
                }`}
              >
                <span className={`text-lg font-medium leading-relaxed ${selectedOption === idx ? 'text-black' : 'text-stone-300'}`}>{opt.text}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <textarea
              disabled={feedback !== null || isEvaluating}
              value={openAnswer}
              onChange={(e) => setOpenAnswer(e.target.value)}
              placeholder="Buraya rasyonel cevabını yaz aslanım..."
              className="w-full bg-zinc-900/50 border border-white/10 rounded-3xl p-8 text-white text-xl font-light italic focus:outline-none focus:border-amber-500/50 transition-all min-h-[200px] resize-none shadow-inner"
            />
            {feedback === null && (
              <button
                onClick={handleOpenSubmit}
                disabled={!openAnswer.trim() || isEvaluating}
                className="w-full py-5 btn-metallic-gold text-black font-black tracking-widest uppercase rounded-2xl disabled:opacity-30"
              >
                {isEvaluating ? 'ÇERÇEVEN ANALİZ EDİLİYOR...' : 'CEVABI GÖNDER'}
              </button>
            )}
          </div>
        )}

        {feedback && (
          <div className="mt-8 p-10 bg-zinc-900 border-2 border-amber-600/20 rounded-[2.5rem] animate-slide-up relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 p-6 opacity-10">
                <span className="text-5xl">⚡</span>
             </div>
             <p className="text-amber-500 font-black mb-4 uppercase text-[10px] tracking-[0.4em]">WINGMAN Gözlemi:</p>
             <p className="text-stone-100 italic text-xl leading-relaxed">{feedback}</p>
             <button 
               onClick={nextQuestion}
               className="mt-10 w-full py-5 btn-metallic-silver text-white font-black tracking-widest uppercase rounded-2xl"
             >
               {currentIdx + 1 < questions.length ? 'Sıradaki Adım' : 'Sonucu Gör'}
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
