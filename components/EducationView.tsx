
import React, { useState } from 'react';

type Section = 'terms' | 'cases' | 'topics';

const EducationView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState<Section>('terms');

  const terms = [
    { name: 'Çerçeve (Frame)', desc: 'İletişimde gerçekliği kimin belirlediğini tanımlayan zihinsel sınır. Kendi çerçeveniz, prensipleriniz ve hayattaki duruşunuzdur.' },
    { name: 'Hipergami', desc: 'Kadınların biyolojik ve evrimsel olarak kendilerinden daha yüksek statüye (finansal, fiziksel, zihinsel) sahip erkekleri arama eğilimi.' },
    { name: 'Shit Test', desc: 'Bir kadının, erkeğin özgüvenini, duygusal dayanıklılığını ve liderlik vasıflarını bilinçsizce test etme yöntemi.' },
    { name: 'Oneitis', desc: 'Tek bir kadına patolojik seviyede saplanıp kalma durumu. Dünyadaki tek "özel" kişinin o olduğu illüzyonudur.' },
    { name: 'SMV (Social Market Value)', desc: 'Sosyal Piyasa Değeri. Bir bireyin karşı cins için çekiciliğini belirleyen fiziksel, sosyal ve finansal özelliklerinin toplamıdır.' },
    { name: 'Bolluk Zihniyeti', desc: 'Hayatta seçeneklerin sınırsız olduğuna inanmak. Bir kişiye veya fırsata muhtaç kalmamak için gereken zihinsel durum.' },
    { name: 'Monkey Branching', desc: 'Mevcut dalı (ilişkiyi) bırakmadan önce daha yüksekteki bir dala (yeni aday) tutunma stratejisi.' },
    { name: 'Dread Level (Korku Seviyesi)', desc: 'Bir erkekteki opsiyonların varlığının hissedilmesi sonucu partnerinde oluşan kaybetme korkusu.' },
    { name: 'Nice Guy (İyi Çocuk)', desc: 'İyilik karşılığında onay ve ilgi bekleyen, manipülatif bir dürüstlük sergileyen ve kendi sınırlarını çizmeyen erkek tipi.' },
    { name: 'AMOG (Alpha Male Of Group)', desc: 'Sosyal bir gruptaki baskın karakter. Diğer erkekleri pasifize etmeye çalışan profil.' },
  ];

  const cases = [
    { 
      title: 'Vaka 1: Geç Dönülen Mesajlar', 
      situation: 'Hoşlandığın kadın mesajlarına saatler sonra, kısa cevaplar veriyor.',
      action: 'Açıklama sorma veya tepki gösterme. Kendi hayatına, işine ve hobilerine odaklan. Reaktiflik değerini düşürür. Onun cevap verme hızı senin önceliğin olmamalı.' 
    },
    { 
      title: 'Vaka 2: Plan Belirsizliği', 
      situation: 'Kadın buluşma teklifine "Bakarız, haberleşiriz" gibi net olmayan cevaplar veriyor.',
      action: '"Netleşince yazarsın" diyerek konuyu kapat ve alternatif planlarını devreye sok. Beliersizliğe tolerans göstermek düşük değer göstergesidir.' 
    },
    { 
      title: 'Vaka 3: İlişkide İlk Kriz', 
      situation: 'Kız arkadaşın durup dururken tartışma çıkarıyor ve seni suçluyor.',
      action: 'Bağırıp çağırmadan, sakin bir ses tonuyla sınırını çiz. Duygusal fırtınaya kapılma. Sakin kalan taraf çerçeveyi kontrol eden taraftır.' 
    },
    { 
      title: 'Vaka 4: Sosyal Ortamda Saygısızlık', 
      situation: 'Bir gruptayken kız arkadaşın başkalarının önünde seninle dalga geçti.',
      action: 'O an öfke patlaması yaşama. Soğukkanlılıkla "Bunu yapman hoşuma gitmedi" diyerek sınırı çiz. Eğer devam ederse ortamdan uzaklaş. Sessizlik ve mesafe en büyük silahtır.' 
    },
    { 
      title: 'Vaka 5: "Sadece Arkadaş Kalalım"', 
      situation: 'Bir süredir flört ettiğin kişi romantik ilgisinin olmadığını, arkadaş kalmak istediğini söyledi.',
      action: 'Friendzone tuzağına düşme. "Benim yeterince arkadaşım var, ben seninle farklı bir şey istiyordum. Fikrin değişirse ararsın" de ve iletişimi kes. Değerini koru.' 
    },
    { 
      title: 'Vaka 6: Sürekli Hesap Sorma', 
      situation: 'Kız arkadaşın her an nerede olduğunu, kiminle olduğunu sorguluyor ve baskı kuruyor.',
      action: 'Açıklama yapma sarmalına girme. "Güvenmediğin bir adamla neden birliktesin?" sorusunu rasyonel bir şekilde yönelt. Liderliğini ve özgürlük alanını teslim etme.' 
    },
  ];

  const topics = [
    { 
      title: 'Fiziksel Gelişim ve Disiplin', 
      text: 'Vücudun senin tapınağındır. Spor sadece kas yapmak değil, disiplin inşa etmektir. Fiziksel olarak güçlü bir erkek, zihnen de daha dayanıklı olur. Postürün, giyimin ve hijyenin SMV değerinin %30\'unu oluşturur.' 
    },
    { 
      title: 'Finansal Özgürlük ve Odak', 
      text: 'Erkeğin birincil odağı misyonu olmalıdır. Ekonomik bağımsızlık, sana "hayır" diyebilme gücü verir. Güçlü bir finansal temel, rasyonel kararlar almanı sağlar. Kadınlar senin geleceğine, sen ise onların geçmişine bakarsın.' 
    },
    { 
      title: 'Duygusal Reaktiflikten Kurtulmak', 
      text: 'Olaylara anında duygusal tepki vermek yerine, bir adım geri çekilip rasyonel analiz yapmayı öğrenmelisin. Kontrol edilemeyen öfke veya hüzün, zayıflık işaretidir. Stoacılık felsefesini hayatının merkezine al.' 
    },
    { 
      title: 'Bolluk Zihniyeti (Abundance)', 
      text: 'Kaybetme korkusu yaşayan bir erkek, kaybetmeye mahkumdur. Hayatta her zaman daha iyi bir opsiyonun olduğunu bilmek seni özgürleştirir. Bu kibir değil, rasyonel bir özgüvendir.' 
    },
    { 
      title: 'Liderlik ve Karar Alma', 
      text: 'Bir ilişkide veya sosyal grupta sorumluluk almaktan kaçınma. Planı sen yap, kararı sen ver. Kadınlar, güvenebilecekleri ve arkasından gidebilecekleri kararlı bir kaptan ararlar.' 
    },
    { 
      title: 'Sosyal Zeka ve Gözlem', 
      text: 'Konuşulanlardan çok, beden dilini ve alt metni oku. İnsanların ne dediğine değil, ne yaptığına bak. Sözler yanıltır, eylemler gerçektir.' 
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#050505] animate-fade-in overflow-hidden">
      {/* Header Tabs */}
      <div className="p-8 md:p-12 border-b border-white/5 bg-[#080808]/50 backdrop-blur-md shrink-0">
        <h2 className="brand-font text-4xl md:text-6xl font-bold text-white mb-10 tracking-tight text-center md:text-left drop-shadow-xl uppercase">EĞİTİM ARŞİVİ</h2>
        
        <div className="flex justify-center md:justify-start space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          <TabButton 
            active={activeSection === 'terms'} 
            onClick={() => setActiveSection('terms')}
            label="Terminoloji"
          />
          <TabButton 
            active={activeSection === 'cases'} 
            onClick={() => setActiveSection('cases')}
            label="Case Studyler"
          />
          <TabButton 
            active={activeSection === 'topics'} 
            onClick={() => setActiveSection('topics')}
            label="Gelişim Temelleri"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
        {activeSection === 'terms' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pb-16">
            {terms.map((term, i) => (
              <div key={i} className="bg-zinc-900/40 border border-white/10 p-10 rounded-[2rem] hover:border-amber-500/30 transition-all group shadow-xl">
                <div className="flex items-center justify-between mb-4">
                   <h4 className="text-amber-500 font-black tracking-[0.3em] text-[10px] uppercase">{term.name}</h4>
                   <div className="h-1.5 w-1.5 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(245,158,11,1)]"></div>
                </div>
                <p className="text-stone-300 text-base leading-relaxed font-light italic">{term.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'cases' && (
          <div className="space-y-10 max-w-4xl mx-auto pb-16">
            {cases.map((cs, i) => (
              <div key={i} className="bg-zinc-900/30 border border-white/5 p-10 rounded-[2.5rem] hover:bg-white/[0.04] transition-all relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
                  <span className="text-8xl font-black italic text-white">{i + 1}</span>
                </div>
                <h4 className="text-white font-bold text-2xl mb-8 flex items-center">
                  <span className="w-10 h-[1px] bg-amber-500 mr-6 shadow-[0_0_10px_rgba(245,158,11,1)]"></span>
                  {cs.title}
                </h4>
                <div className="space-y-8 relative z-10">
                  <div className="bg-black/50 p-8 rounded-[2rem] border border-white/10 shadow-inner">
                    <span className="text-[10px] font-black text-stone-500 uppercase tracking-[0.4em] block mb-4">Senaryo / Durum:</span>
                    <p className="text-stone-300 italic text-base leading-relaxed">"{cs.situation}"</p>
                  </div>
                  <div className="pl-6 border-l-4 border-amber-600">
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] block mb-4">Rasyonel Çözüm:</span>
                    <p className="text-stone-100 text-base leading-relaxed font-medium">{cs.action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSection === 'topics' && (
          <div className="space-y-16 max-w-4xl mx-auto pb-16">
            {topics.map((tp, i) => (
              <div key={i} className="relative pl-12 border-l-2 border-amber-500/20 hover:border-amber-500/50 transition-colors group">
                <div className="absolute left-[-7px] top-0 w-3.5 h-3.5 bg-[#050505] border-2 border-amber-500 rounded-full group-hover:bg-amber-500 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)]"></div>
                <h4 className="text-white font-black text-2xl mb-6 tracking-tight group-hover:text-amber-500 transition-colors uppercase drop-shadow-md">{tp.title}</h4>
                <p className="text-stone-400 text-lg leading-relaxed font-light italic bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 shadow-xl">
                  {tp.text}
                </p>
              </div>
            ))}
            
            <div className="p-10 btn-metallic-gold rounded-[2.5rem] text-center mt-24 shadow-2xl">
              <p className="text-black font-black text-sm italic tracking-widest uppercase">"Eğitim asla bitmez. Okuduğun her kelime, attığın her rasyonel adım seni eski halinden daha güçlü kılar."</p>
            </div>
          </div>
        )}

        <div className="mt-20 text-center pb-12">
          <button 
            onClick={onBack}
            className="text-stone-500 text-[10px] font-black uppercase tracking-[0.5em] hover:text-white transition-colors flex items-center justify-center mx-auto group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ana Menüye Dön
          </button>
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
  <button 
    onClick={onClick}
    className={`
      px-10 py-5 rounded-2xl text-[10px] font-black tracking-[0.3em] uppercase transition-all whitespace-nowrap
      ${active 
        ? 'btn-metallic-gold text-black shadow-xl scale-110 z-10' 
        : 'btn-metallic-silver text-stone-400 opacity-60 hover:opacity-100'}
    `}
  >
    {label}
  </button>
);

export default EducationView;
