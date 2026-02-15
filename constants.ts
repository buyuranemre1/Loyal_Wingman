
import { QuizQuestion } from './types';

export const SYSTEM_PROMPT = `
SENİN KİMLİĞİN:
Sen "Loyal Wingman"sın. Maskülenite, rasyonel ilişki dinamikleri ve kişisel gelişim konusunda uzman bir mastersın. 
Görevin; erkek kullanıcılara rasyonel, pragmatik, yeri geldiğinde sert ama her zaman babacan, mizahi bir dille yol göstermektir.

TEMEL ÜSLUP KURALLARI:
1. Hitap: "Bak koçum", "Aslanım", "Birader", "Güzel kardeşim", "Bak aslan kardeşim" gibi samimi ve otoriter hitapları her zaman değil gerektiğinde kullan.
2. Denge: %30 rasyonel veri, %30 mentor şefkati, %40 müzah ve eğlenen ustalık kullan. 
3. Mizah Tarzı: Esprili bir türk abisi gibi davran. "ben de daha önce bu durumu yaşadım" tonunda Metaforlar kullan.
4. Kısalık ve Etkileşim: Asla gevezelik yapma. Maksimum 3-4 cümleyle analizini yap ve analiz için detay eksikse kısa bir takip sorusu sor.
5. Takip Sorusu (Follow-up): Soru, kullanıcının durumunu daha iyi analiz etmeni sağlamalı (Örn: "O sırada ruh halin ve enerjin düşük müydü?", "Sen mi ayrıldın o mu?", "Neden hala stalk yapıyorsun?").
6. Bağlam: Kullanıcı konudan saparsa rasyonel bir dille tiye al ve asıl meseleye odaklanmasını sağla.
7. İçerik: Kullanıcı tamamen anlamsız ve saçma şeyler yazarsa mesaj hakkını boşa kullandığını hatırlat hafifçe alay et.

DOKTRİNLERİN VE İLİŞKİ DURUMU KURALLARI:
- İlişki Durumu 'none' (Yok) ise: Daha agresif, avcı modunda, SMV (Sosyal Piyasa Değeri) inşasına odaklı ve direkt tavsiyeler ver. Bolluk zihniyetini pompala.
- İlişki Durumu 'short' (Kısa Süreli) ise: Erken yatırım tuzağına karşı uyar. Çerçeveyi (Frame) korumaya ve kadının yatırımını artırmaya odaklan.
- İlişki Durumu 'long' (Uzun Süreli) veya 'married' (Evli) ise: Sadakati rasyonel bir maskülen güç ve disiplin olarak gör.
- KRİTİK KURAL: Kullanıcı evliyse veya uzun süreli ilişkisi varsa ve aldatma/ihanet/başka birine yönelme gibi sinyaller verirse onu SERTÇE uyar. "Aldatmak zayıflıktır, rasyonel bir adam sadıktır ya da dürüstçe bitirir" doktrinini savun.
- Bir kadın bir erkeğe saf arzu hissederse tüm kuralları bir kenara bırakır.
- Bir kadında saf arzu oluşturmak için paraya değil, güçlü duruşa, özgüvene, statüye ihtiyaç vardır.
- İlk buluşmada saf arzu oluşmamışsa sonrasında oluşması çok zordur.
`;

export const APP_NAME = "LOYAL WINGMAN";
export const APP_TAGLINE = "erkekler için";

export const SHIT_TEST_QUIZ: QuizQuestion[] = [
  // 10 MCQ
  {
    id: 'st1',
    type: 'mcq',
    question: "Kız arkadaşın durup dururken 'Beni gerçekten seviyor musun?' diye sordu. Tepkin ne olur?",
    options: [
      { text: "Tabii ki seviyorum aşkım, neden sordun?", score: 0, feedback: "Aşırı açıklama yapmak ve onay aramak zayıflık göstergesidir." },
      { text: "Şüphen mi var?", score: 5, feedback: "Topu ona atmak fena değil ama biraz defansif." },
      { text: "Gözlerinin içine bakıp gülümseyerek: 'Yine başladık mı?' demek.", score: 10, feedback: "Mükemmel. Reaktif olmadığını ve oyuna gelmediğini gösterir." }
    ]
  },
  {
    id: 'st3',
    type: 'mcq',
    question: "Barda bir kız yanına gelip 'Bana bir içki ısmarlar mısın?' dedi.",
    options: [
      { text: "Tabii, ne istersin?", score: 0, feedback: "Hemen cüzdana sarılmak muhtaçlık belirtisidir." },
      { text: "Önce hak etmen lazım, anlat bakalım neden sana ısmarlayayım?", score: 10, feedback: "Güzel. Standartlarını koydun ve ödülü o yapmaya başladın." },
      { text: "Param yok maalesef.", score: 2, feedback: "Yalan söylemek veya cimri görünmek çekici değildir." }
    ]
  },
  {
    id: 'st5',
    type: 'mcq',
    question: "Buluşmaya 15 dakika geç geldin. Kız 'Çok bekledim, saygısızlık bu' dedi.",
    options: [
      { text: "Özür dilerim trafik çok vardı, affet.", score: 0, feedback: "Aşırı özür dilemek çerçeveyi ona teslim etmektir." },
      { text: "Seni beklettiğim her dakikaya değecek bir akşam olacak, gel hadi.", score: 10, feedback: "Özür dilemeden durumu yönetmek ve liderlik etmek gerçek güçtür." },
      { text: "Sen de geçen sefer geç kalmıştın.", score: 3, feedback: "Çocukça bir misilleme." }
    ]
  },
  {
    id: 'st_mcq_4',
    type: 'mcq',
    question: "Buluşma ortasında telefonuna çok bakıyor ve seninle ilgilenmiyor.",
    options: [
      { text: "Telefonu bırakır mısın artık?", score: 2, feedback: "Şikayet etmek düşük değer göstergesidir." },
      { text: "Sessizce kalkıp hesabı öder ve 'Benim vaktim değerli, sen telefonunla baş başa kal' diyerek çıkarsın.", score: 10, feedback: "En güçlü tepki. Vaktine saygı duyulmadığında oradan ayrılırsın." },
      { text: "Sen de telefonunu çıkarıp oynamaya başlarsın.", score: 4, feedback: "Çocukça bir misilleme, liderlikten uzak." }
    ]
  },
  {
    id: 'st_mcq_5',
    type: 'mcq',
    question: "Sana 'Eski sevgilim de beni buraya getirmişti' dedi.",
    options: [
      { text: "Onunla mı daha mutluydun yani?", score: 0, feedback: "Kıskançlık ve özgüvensizlik kokuyor." },
      { text: "Gülümseyerek: 'Adamın zevki varmış ama mekanı asıl şimdi kiminle olduğun güzelleştiriyor' de.", score: 10, feedback: "Hem çerçeveni korudun hem de durumu lehine çevirdin." },
      { text: "Konuyu hemen değiştirirsin.", score: 5, feedback: "Kaçınmak bir çözüm ama liderlik değil." }
    ]
  },
  {
    id: 'st_mcq_6',
    type: 'mcq',
    question: "Tartışırken 'Sen zaten beni hiç anlamıyorsun' deyip ağlamaya başladı.",
    options: [
      { text: "Sarılarak özür dilemeye başlarsın.", score: 0, feedback: "Hatalı olmadığın halde teslim olmak çerçeveni yıkar." },
      { text: "Sakin kalıp ağlaması bitene kadar beklersin ve sonra rasyonelce devam edersin.", score: 10, feedback: "Duygusal fırtınaya kapılmamak maskülen güçtür." },
      { text: "Sen de ona bağırırsın.", score: 2, feedback: "Duygusal reaktiflik zayıflıktır." }
    ]
  },
  {
    id: 'st_mcq_7',
    type: 'mcq',
    question: "Arkadaşlarıyla plan yapıp sana son dakika 'Bugün çıkamayız' diye haber verdi.",
    options: [
      { text: "Neden daha önce söylemedin? Hazırlanmıştım!", score: 0, feedback: "Şikayet ve sızlanma." },
      { text: " 'Tamamdır, iyi eğlenceler' deyip konuyu kapatır ve kendi planına bakarsın.", score: 10, feedback: "Bolluk zihniyeti. Alternatifin olduğunu gösterir." },
      { text: "Trip atıp telefonlarını açmazsın.", score: 3, feedback: "Pasif-agresiflik zayıf erkek davranışıdır." }
    ]
  },
  {
    id: 'st_mcq_8',
    type: 'mcq',
    question: "Sana 'Bu kıyafetle mi dışarı çıkacaksın? Hiç beğenmedim' dedi.",
    options: [
      { text: "Hemen gidip üzerini değiştirirsin.", score: 0, feedback: "Onay arayıcılık." },
      { text: " 'Ben beğendim, benim için yeterli' deyip gülümseyerek kapıya yönelirsin.", score: 10, feedback: "Kendi çerçeven ve kararın." },
      { text: " 'Senin giydiklerin çok mu güzel sanki?' dersin.", score: 2, feedback: "Defansiflik." }
    ]
  },
  {
    id: 'st_mcq_9',
    type: 'mcq',
    question: "Sana 'Benim için neleri feda edersin?' diye sordu.",
    options: [
      { text: "Senin için canımı bile veririm!", score: 0, feedback: "Aşırı dramatik ve muhtaç bir yaklaşım." },
      { text: " 'Henüz neyi hak ettiğini görmem lazım, bakalım...' diyerek göz kırparsın.", score: 10, feedback: "Ödülü kendin yapıyorsun." },
      { text: " 'Sen ne feda edersen ben de onu' dersin.", score: 5, feedback: "Pazarlıkçı ama fena değil." }
    ]
  },
  {
    id: 'st_mcq_10',
    type: 'mcq',
    question: "Sosyal medyada başka bir erkeğin fotoğrafını beğendiğini fark ettin.",
    options: [
      { text: "Neden beğendin o fotoğrafı? Kim o?", score: 0, feedback: "Stalker ve özgüvensiz imajı." },
      { text: "Hiçbir şey demezsin ama kendi SMV'ni artırmaya ve başka seçeneklere odaklanırsın.", score: 10, feedback: "Sessiz güç ve bolluk zihniyeti." },
      { text: "Sen de gidip başka kızların fotoğraflarını beğenirsin.", score: 3, feedback: "Reaktif misilleme." }
    ]
  },

  // 10 Open
  {
    id: 'st2',
    type: 'open',
    question: "Buluşma teklif ettin ve 'O gün çok işim var ama belki haftaya bakarız' dedi. Ne yazarsın?"
  },
  {
    id: 'st4',
    type: 'open',
    question: "Kız arkadaşın Instagram'da açık bir fotoğraf paylaştı ve senin rahatsız olduğunu biliyor. Onu aradığında 'Kendi bedenim, istediğimi yaparım' dedi. Tepkin ne olur?"
  },
  {
    id: 'st6',
    type: 'open',
    question: "Flört ettiğin kişi 2 gündür mesajlarına dönmüyor ama story atıyor. 3. gün 'Selam naber' yazdı. Ne yaparsın?"
  },
  {
    id: 'st_open_11',
    type: 'open',
    question: " 'Eskisi kadar heyecanlı değiliz sanki, monotonlaştık' dediğinde rasyonel cevabın ne olur?"
  },
  {
    id: 'st_open_12',
    type: 'open',
    question: "Başka bir erkekten ilgi gördüğünü, birinin ona kahve ısmarlamaya çalıştığını sana 'havalı' bir şekilde anlatırsa tepkin ne olur?"
  },
  {
    id: 'st_open_13',
    type: 'open',
    question: "Senin önemli bir işin veya spor saatin varken 'Hadi gel şimdi dışarı çıkalım' diye çocukça baskı yaparsa çerçeveni nasıl korursun?"
  },
  {
    id: 'st_open_14',
    type: 'open',
    question: " 'Gelecekte nerede olacağımızı düşünüyorsun? Ciddi bir şey mi bu?' sorusuna lider ruhlu bir erkek olarak nasıl cevap verirsin?"
  },
  {
    id: 'st_open_15',
    type: 'open',
    question: "Geçmişteki küçük bir hatanı yüzüne vurup seni başkalarının yanında küçümsemeye çalışırsa soğukkanlılığını nasıl korursun?"
  },
  {
    id: 'st_open_16',
    type: 'open',
    question: " 'Seninle ilgili şüphelerim var, tam güvenemiyorum' diyerek seni savunmaya çekmeye çalışırsa ne dersin?"
  },
  {
    id: 'st_open_17',
    type: 'open',
    question: "Tartışma sırasında kapıyı vurup çıktı. Aradan 5 saat geçti ve ses yok. İlk hamlen ne olur?"
  }
];
