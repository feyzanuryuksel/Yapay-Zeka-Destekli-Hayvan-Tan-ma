let model;
const sonucMetni    = document.getElementById('sonuc-metni');
const resimOnizleme = document.getElementById('secilen-resim');
const dosyaSecici   = document.getElementById('foto-sec');
const solPanel      = document.getElementById('sol-panel');
const yuklemeOncesi = document.getElementById('yukleme-oncesi');
const dosyaSecButon = document.getElementById('dosya-sec-buton');
const sifirlaButon  = document.getElementById('sifirla-buton');
const sagPanel      = document.getElementById('sag-panel');
const sonucKonteyner = document.getElementById('sonuc-konteyner');

// ─── Kedi & Köpek Bilgi Veritabanı ────────────────────────────────────────
const hayvanBilgileri = {

  // ── KÖPEKLER ──────────────────────────────────────────────────────────────
  "golden retriever": {
    bilgi: "Neşeli, sadık ve zeki bir aile köpeğidir. Çocuklarla çok iyi geçinir.",
    ayirtEdici: "Altın sarısı veya krem rengi yoğun tüyleri, geniş kafası ve her zaman güler yüzlü ifadesiyle diğer ırklardan kolayca ayrılır.",
    ozellikler: ["Ömür: 10–12 yıl", "Kilo: 25–34 kg", "Köken: İskoçya"],
    etiketler: ["Sadık", "Zeki", "Aile Köpeği"]
  },
  "labrador retriever": {
    bilgi: "Dünyanın en popüler köpek ırklarından biridir. Enerjik ve öğrenmeye açıktır.",
    ayirtEdici: "Kısa ve yoğun tüyleri (siyah, sarı veya çikolata rengi), kalın yapılı gövdesi ve otter kuyruğuyla tanınır.",
    ozellikler: ["Ömür: 10–12 yıl", "Kilo: 25–36 kg", "Köken: Kanada"],
    etiketler: ["Enerjik", "Çok Yönlü", "Rehber Köpek"]
  },
  "german shepherd": {
    bilgi: "Zeki ve çalışkan bir ırktır. Polis ve arama-kurtarma operasyonlarında sıkça kullanılır.",
    ayirtEdici: "Siyah-kahverengi ikili rengi, dik üçgen kulakları ve güçlü atletik gövdesiyle kolayca tanınır.",
    ozellikler: ["Ömür: 9–13 yıl", "Kilo: 22–40 kg", "Köken: Almanya"],
    etiketler: ["Koruyucu", "Cesur", "Çalışkan"]
  },
  "bulldog": {
    bilgi: "Sakin ve inatçı karakteriyle bilinir. Az egzersiz gerektiren, sevecen bir ırktır.",
    ayirtEdici: "Yüzündeki derin kırışıkları, öne çıkık alt çenesi, basık burnu ve geniş omuzlu kısa gövdesiyle benzersizdir.",
    ozellikler: ["Ömür: 8–10 yıl", "Kilo: 18–25 kg", "Köken: İngiltere"],
    etiketler: ["Sakin", "Sadık", "Evcil"]
  },
  "poodle": {
    bilgi: "Son derece zeki ve öğrenmeye açık bir ırktır. Az tüy döker, alerjikler için uygundur.",
    ayirtEdici: "Kıvırcık ve yoğun tüyleri, zarif duruşu ve uzun ince burnu diğer ırklardan ayırt etmeyi kolaylaştırır.",
    ozellikler: ["Ömür: 12–15 yıl", "Kilo: 6–32 kg (boya göre)", "Köken: Fransa/Almanya"],
    etiketler: ["Zeki", "Az Tüy", "Gösterişli"]
  },
  "beagle": {
    bilgi: "Güçlü koku alma duyusuyla tanınan neşeli ve meraklı bir av köpeğidir.",
    ayirtEdici: "Üç renkli (siyah, kahverengi, beyaz) kısa tüyleri, uzun sarkık kulakları ve kompakt yapısıyla tanınır.",
    ozellikler: ["Ömür: 12–15 yıl", "Kilo: 9–11 kg", "Köken: İngiltere"],
    etiketler: ["Meraklı", "Neşeli", "Av Köpeği"]
  },
  "chihuahua": {
    bilgi: "Dünyanın en küçük köpek ırkıdır. Küçük bedenine rağmen cesur ve koruyucudur.",
    ayirtEdici: "Elma şeklindeki büyük yuvarlak kafası, iri gözleri ve dik sivri kulakları onu hemen tanıtır.",
    ozellikler: ["Ömür: 12–20 yıl", "Kilo: 1–3 kg", "Köken: Meksika"],
    etiketler: ["Mini", "Cesur", "Sadık"]
  },
  "husky": {
    bilgi: "Soğuk iklimlere uyum sağlamış, enerjik ve sosyal bir kuzey ırkıdır.",
    ayirtEdici: "Mavi veya çift renkli gözleri, yüz maskesi deseni ve kalın çift katlı tüy örtüsüyle kolayca ayırt edilir.",
    ozellikler: ["Ömür: 12–15 yıl", "Kilo: 16–27 kg", "Köken: Sibirya"],
    etiketler: ["Enerjik", "Sosyal", "Dayanıklı"]
  },
  "pomeranian": {
    bilgi: "Küçük boyutuna rağmen özgüvenli ve canlı bir karaktere sahiptir. Kalın tüylüdür.",
    ayirtEdici: "Aslan yelesi gibi yoğun püfür tüyleri, küçük tilki yüzü ve kıvrık kuyruğu onu benzersiz kılar.",
    ozellikler: ["Ömür: 12–16 yıl", "Kilo: 1.4–3 kg", "Köken: Almanya/Polonya"],
    etiketler: ["Mini", "Canlı", "Şirin"]
  },
  "dachshund": {
    bilgi: "Uzun gövdesi ve kısa bacaklarıyla tanınır. İnatçı ama sevecen bir karaktere sahiptir.",
    ayirtEdici: "Orantısız derecede uzun gövdesi ve kısa bacakları onu tüm köpekler arasında en kolay tanınan ırk yapar.",
    ozellikler: ["Ömür: 12–16 yıl", "Kilo: 3–14 kg", "Köken: Almanya"],
    etiketler: ["İnatçı", "Sadık", "Meraklı"]
  },
  "shih tzu": {
    bilgi: "Aslan köpeği anlamına gelir. Uzun ipeksi tüyleri ve sevecen yapısıyla bilinir.",
    ayirtEdici: "Yüzünden her yöne uzanan uzun ipeksi tüyleri, yassı burnu ve büyük yuvarlak gözleriyle tanınır.",
    ozellikler: ["Ömür: 10–16 yıl", "Kilo: 4–7 kg", "Köken: Çin"],
    etiketler: ["Sevecen", "Şirin", "Evcil"]
  },
  "yorkshire terrier": {
    bilgi: "Küçük ama cesur bir terrier ırkıdır. İnce ve uzun tüyleriyle dikkat çeker.",
    ayirtEdici: "Çelik mavisi ve altın sarısı ikili renkteki ipek tüyleri ve küçük V şekilli dik kulakları onu ayırt eder.",
    ozellikler: ["Ömür: 13–16 yıl", "Kilo: 2–3 kg", "Köken: İngiltere"],
    etiketler: ["Mini", "Cesur", "Şık"]
  },
  "boxer": {
    bilgi: "Güçlü ve enerjik bir ırktır. Çocuklarla iyi geçinen, koruyucu ve oyuncu bir köpektir.",
    ayirtEdici: "Kare şeklindeki geniş kafası, derin durdurucu burun yapısı ve kaslı kısa tüylü gövdesiyle tanınır.",
    ozellikler: ["Ömür: 10–12 yıl", "Kilo: 22–32 kg", "Köken: Almanya"],
    etiketler: ["Güçlü", "Oyuncu", "Koruyucu"]
  },
  "rottweiler": {
    bilgi: "Güçlü ve kendinden emin bir koruma köpeğidir. İyi eğitimle son derece sadık olur.",
    ayirtEdici: "Siyah tüyleri üzerindeki belirgin kahverengi-pas rengi alacaları ve masif kaslı gövdesiyle tanınır.",
    ozellikler: ["Ömür: 8–10 yıl", "Kilo: 35–60 kg", "Köken: Almanya"],
    etiketler: ["Güçlü", "Koruyucu", "Sadık"]
  },
  "doberman": {
    bilgi: "Zeki, çevik ve sadık bir koruma köpeğidir. Çok hızlı öğrenen bir ırktır.",
    ayirtEdici: "İnce ve atletik uzun gövdesi, pas kırmızısı alacalarıyla kontrast oluşturan siyah tüyleri ve dik kulakları onu belirginleştirir.",
    ozellikler: ["Ömür: 10–13 yıl", "Kilo: 27–45 kg", "Köken: Almanya"],
    etiketler: ["Zeki", "Çevik", "Koruyucu"]
  },
  "border collie": {
    bilgi: "Dünyanın en zeki köpek ırkı olarak kabul edilir. Sürü güdüsü ve enerjisi yüksektir.",
    ayirtEdici: "Siyah-beyaz ikili rengi, yoğun bakışları (göz hipnoz tekniği) ve sürekli hareket halindeki enerjik duruşuyla tanınır.",
    ozellikler: ["Ömür: 12–15 yıl", "Kilo: 12–20 kg", "Köken: İngiltere/İskoçya"],
    etiketler: ["En Zeki", "Enerjik", "Çalışkan"]
  },
  "maltese": {
    bilgi: "Beyaz ipeksi tüyleriyle tanınan zarif ve sevecen küçük bir ırktır.",
    ayirtEdici: "Tüm vücudunu örten tamamen beyaz uzun ipeksi tüyleri ve küçük yuvarlak siyah burnu onu diğerlerinden ayırır.",
    ozellikler: ["Ömür: 12–15 yıl", "Kilo: 3–4 kg", "Köken: Malta"],
    etiketler: ["Zarif", "Sevecen", "Mini"]
  },
  "dalmatian": {
    bilgi: "Siyah benekli beyaz tüyleriyle hemen tanınır. Enerjik ve oyuncu bir ırktır.",
    ayirtEdici: "Beyaz zemin üzerindeki siyah veya kahverengi yuvarlak benekleri onu tüm köpekler arasında en kolay tanınan ırk yapar.",
    ozellikler: ["Ömür: 11–13 yıl", "Kilo: 16–32 kg", "Köken: Hırvatistan"],
    etiketler: ["Benekli", "Enerjik", "Şık"]
  },
  "great dane": {
    bilgi: "Dünyanın en uzun boylu köpek ırklarından biridir. Sakin ve nazik bir devdir.",
    ayirtEdici: "Dev vücut yapısı, uzun ince bacakları ve büyük dikdörtgen kafasıyla diğer tüm ırklardan boyutuyla ayrışır.",
    ozellikler: ["Ömür: 7–10 yıl", "Kilo: 45–90 kg", "Köken: Almanya"],
    etiketler: ["Dev", "Sakin", "Nazik"]
  },
  "cocker spaniel": {
    bilgi: "Uzun sarkık kulakları ve parlak gözleriyle sevimli bir görünüme sahiptir. Neşeli ve sevecendir.",
    ayirtEdici: "Yere kadar sarkabilen uzun dalgalı kulakları, yuvarlak büyük gözleri ve ipeksi tüylü gövdesiyle tanınır.",
    ozellikler: ["Ömür: 12–15 yıl", "Kilo: 7–14 kg", "Köken: İngiltere"],
    etiketler: ["Sevecen", "Neşeli", "Şirin"]
  },

  // ── KEDİLER ───────────────────────────────────────────────────────────────
  "tabby": {
    bilgi: "Tekir desen, bir ırk değil tüy desenidir. Çizgili tekir kediler bağımsız ama sevgi doludur.",
    ayirtEdici: "Alnındaki M harfi şeklindeki karakteristik çizgi ve vücudundaki balıksırtı ya da çizgili desen onu diğer kedilerden ayırır.",
    ozellikler: ["Ömür: 12–18 yıl", "Kilo: 3–5 kg", "Köken: Dünya geneli"],
    etiketler: ["Bağımsız", "Meraklı", "Evcil"]
  },
  "persian cat": {
    bilgi: "Uzun ve yumuşak tüyleriyle bilinir. Sakin ve uysal bir karaktere sahiptir. Düzenli bakım gerektirir.",
    ayirtEdici: "Son derece basık yassı yüzü, kısa burnu, geniş gözleri ve vücudunu örten aşırı uzun tüyleriyle kolayca tanınır.",
    ozellikler: ["Ömür: 12–17 yıl", "Kilo: 3–6 kg", "Köken: İran"],
    etiketler: ["Sakin", "Şık", "Uysal"]
  },
  "siamese cat": {
    bilgi: "Mavi gözleri ve nokta deseniyle tanınır. Konuşkan, sosyal ve zekidir.",
    ayirtEdici: "Krem renkli gövdesi üzerindeki koyu yüz, kulak, ayak ve kuyruk ucu kontrast deseni ile mavi badem şeklindeki gözleri onu benzersiz kılar.",
    ozellikler: ["Ömür: 11–15 yıl", "Kilo: 3–5 kg", "Köken: Tayland"],
    etiketler: ["Konuşkan", "Sosyal", "Zeki"]
  },
  "maine coon": {
    bilgi: "Dünyanın en büyük evcil kedi ırklarından biridir. Köpek gibi davranmasıyla ünlüdür.",
    ayirtEdici: "Kulak uçlarındaki tüy püskülleri (lynx tipping), büyük kaslı gövdesi ve uzun kalın kuyruğu onu diğerlerinden ayırır.",
    ozellikler: ["Ömür: 12–15 yıl", "Kilo: 4–9 kg", "Köken: Amerika"],
    etiketler: ["Dev", "Sosyal", "Zeki"]
  },
  "ragdoll": {
    bilgi: "Kucağa alındığında gevşeyip yumuşamasından dolayı bu ismi almıştır. Sakin ve sevecendir.",
    ayirtEdici: "Mavi gözleri, büyük ve ağır gövdesi ve siamese benzeri renk deseniyle tanınır; ancak daha büyük ve daha yumuşak yapılıdır.",
    ozellikler: ["Ömür: 12–17 yıl", "Kilo: 4–9 kg", "Köken: Amerika"],
    etiketler: ["Sakin", "Sevecen", "Yumuşak"]
  },
  "bengal cat": {
    bilgi: "Yaban kedisine benzeyen egzotik görünümlü bir ırktır. Enerjik ve oyuncu bir karaktere sahiptir.",
    ayirtEdici: "Leopar desenini andıran rozet şeklindeki benekleri ve parlak altın-turuncu tüyleri onu evcil kedi görünümünden uzaklaştırır.",
    ozellikler: ["Ömür: 12–16 yıl", "Kilo: 3–7 kg", "Köken: Amerika"],
    etiketler: ["Egzotik", "Enerjik", "Oyuncu"]
  },
  "scottish fold": {
    bilgi: "Öne katlanan kulakları ve yuvarlak yüzüyle sevimli bir görünüme sahiptir. Sakin bir ırktır.",
    ayirtEdici: "İleriye doğru katlanmış küçük kulakları ve baykuşu andıran yuvarlak büyük gözleri onu anında tanıtır.",
    ozellikler: ["Ömür: 11–14 yıl", "Kilo: 3–6 kg", "Köken: İskoçya"],
    etiketler: ["Şirin", "Sakin", "Sevimli"]
  },
  "british shorthair": {
    bilgi: "Yuvarlak yüzü ve yoğun tüyleriyle tanınan sakin ve bağımsız bir ırktır.",
    ayirtEdici: "Yoğun ve peluş tüyleri, geniş yuvarlak kafası ve dolgun yanakları ona ayıcık görünümü kazandırır.",
    ozellikler: ["Ömür: 12–20 yıl", "Kilo: 4–8 kg", "Köken: İngiltere"],
    etiketler: ["Sakin", "Bağımsız", "Dayanıklı"]
  },
  "sphynx": {
    bilgi: "Tüysüz görünümüyle dikkat çeken egzotik bir kedi ırkıdır. Aslında ince bir tüy tabakası vardır. Çok sosyaldir.",
    ayirtEdici: "Tüysüz görünen derisi, büyük kulakları ve buruşuk görünümlü derisiyle tüm kedi ırkları arasında en kolay tanınanıdır.",
    ozellikler: ["Ömür: 8–14 yıl", "Kilo: 3–6 kg", "Köken: Kanada"],
    etiketler: ["Tüysüz", "Sosyal", "Egzotik"]
  },
  "abyssinian": {
    bilgi: "İnce yapısı ve meraklı haliyle sürekli aktif bir kedi ırkıdır. Dünyaca eski ırklardan biridir.",
    ayirtEdici: "Her tüyünde birden fazla renk bandı taşıyan agouti deseni, ince atletik gövdesi ve büyük dik kulakları onu belirginleştirir.",
    ozellikler: ["Ömür: 9–15 yıl", "Kilo: 3–5 kg", "Köken: Etiyopya"],
    etiketler: ["Aktif", "Meraklı", "Antik"]
  },
  "cat": {
    bilgi: "Evcil kedi yaklaşık 10.000 yıldır insanlarla birlikte yaşayan bağımsız ve zeki bir hayvandır.",
    ayirtEdici: "Esnek ve çevik gövdesi, dikey yırtık gözbebeği, bıyıkları ve sessiz yürüyüşü tüm kedi türlerini diğer hayvanlardan ayıran temel özelliklerdir.",
    ozellikler: ["Ömür: 12–18 yıl", "Kilo: 3–5 kg", "Köken: Dünya geneli"],
    etiketler: ["Bağımsız", "Temiz", "Zeki"]
  },
};

// ─── Eşleştirme Fonksiyonu ────────────────────────────────────────────────
function hayvanBilgisiGetir(className) {
  const normalized = className.toLowerCase();
  for (const [key, val] of Object.entries(hayvanBilgileri)) {
    if (normalized.includes(key)) return { ad: key, ...val };
  }
  return null;
}

// ─── Yeni Sonuç Kartı Oluştur ─────────────────────────────────────────────
function sonucKartiOlustur(tahminSonucu, bilgi) {
  const cinsIsim = tahminSonucu.className;
  const guvenOrani = (tahminSonucu.probability * 100).toFixed(1);
  const guvenGenislik = Math.round(tahminSonucu.probability * 100);
  
  // Cins ismini düzenle
  const cinsGosterim = cinsIsim
    .split(',')[0]
    .split(' ')
    .map(kelime => kelime.charAt(0).toUpperCase() + kelime.slice(1))
    .join(' ');
  
  // Kedi mi köpek mi kontrol et
  const kediMi = cinsIsim.toLowerCase().includes('cat') || 
                 ['tabby', 'persian', 'siamese', 'maine coon', 'ragdoll', 
                  'bengal', 'scottish fold', 'british shorthair', 'sphynx', 
                  'abyssinian'].some(irks => cinsIsim.toLowerCase().includes(irks));
  
  const cinsIkon = kediMi ? '🐱' : '🐶';
  
  let html = `
    <div class="sonuc-karti">
      <!-- Başlık -->
      <div class="sonuc-baslik">Tespit Edilen Tür</div>
      
      <!-- Cins İsmi - Büyük -->
      <div class="sonuc-cins">
        <span class="cins-ikon">${cinsIkon}</span>
        ${cinsGosterim}
      </div>
      
      <!-- Güven Oranı - Progress Bar -->
      <div class="guven-konteyner">
        <div class="guven-baslik">
          <span>📊 Güven Oranı</span>
          <span class="guven-yuzde">%${guvenOrani}</span>
        </div>
        <div class="guven-bar-konteyner">
          <div class="guven-bar-dolgu" style="width: ${guvenGenislik}%;"></div>
        </div>
      </div>
  `;
  
  // Bilgi bulunamadıysa uyarı göster
  if (!bilgi) {
    html += `
      <div class="sonuc-uyari">
        ⚠️ Bu hayvan türü veritabanımızda henüz detaylı olarak bulunmuyor.
      </div>
    `;
  }
  
  html += `</div>`;
  
  return html;
}

// ─── Bilgi Kutusunu Göster / Gizle ───────────────────────────────────────
function bilgiKutusunuGoster(bilgi) {
  let kutu = document.getElementById('bilgi-kutusu');

  if (!kutu) {
    kutu = document.createElement('div');
    kutu.id = 'bilgi-kutusu';
    sagPanel.appendChild(kutu);
  }

  if (!bilgi) {
    if (kutu) kutu.style.display = 'none';
    return;
  }

  const ozellikIkonlari = {
    'Ömür': '⏳',
    'Kilo': '⚖️',
    'Köken': '🌍'
  };

  kutu.innerHTML = `
    <h3>🐾 ${bilgi.ad.charAt(0).toUpperCase() + bilgi.ad.slice(1)} Hakkında</h3>
    <p>${bilgi.bilgi}</p>
    
    <div class="ozellikler-konteyner">
      ${bilgi.ozellikler.map(o => {
        const [etiket, deger] = o.split(': ');
        const ikon = ozellikIkonlari[etiket] || '📌';
        return `<div class="ozellik"><span class="ozellik-ikon">${ikon}</span> ${o}</div>`;
      }).join('')}
    </div>
    
    <p class="ayirt-edici">🔍 <strong>Ayırt Edici Özellik:</strong> ${bilgi.ayirtEdici}</p>
    
    <div class="etiketler">
      ${bilgi.etiketler.map(e => `<span class="etiket">${e}</span>`).join('')}
    </div>
  `;
  kutu.style.display = 'block';
}

// ─── Sayfayı Sıfırla ──────────────────────────────────────────────────────
function sayfayiSifirla() {
  // Dosya inputunu temizle
  dosyaSecici.value = '';
  
  // Resmi gizle
  resimOnizleme.style.display = 'none';
  resimOnizleme.src = '';
  
  // Yükleme öncesi içeriği göster
  yuklemeOncesi.style.display = 'block';
  
  // Dosya seç butonunu göster
  dosyaSecButon.style.display = 'inline-flex';
  
  // Sıfırla butonunu gizle
  sifirlaButon.style.display = 'none';
  
  // Sol panel sınıfını kaldır
  solPanel.classList.remove('resim-yuklendi');
  
  // Sonuç konteynerını temizle
  sonucKonteyner.innerHTML = '';
  
  // Bilgi kutusunu kaldır
  bilgiKutusunuGoster(null);
  
  // Bilgi kutusu elementini kaldır
  const kutu = document.getElementById('bilgi-kutusu');
  if (kutu) kutu.remove();
}

// ─── Sıfırla Butonu Olay Dinleyicisi ─────────────────────────────────────
sifirlaButon.addEventListener('click', sayfayiSifirla);

// ─── Model Yükle ─────────────────────────────────────────────────────────
async function modeliYukle() {
  sonucKonteyner.innerHTML = `
    <div class="sonuc-karti" style="text-align: center; padding: 40px 20px;">
      <span style="font-size: 3rem; display: block; margin-bottom: 15px;">🧠</span>
      <p style="font-size: 1.1rem; color: var(--gri-koyu); font-weight: 600;">Yapay zeka modeli yükleniyor...</p>
      <p style="font-size: 0.9rem; color: var(--gri);">Lütfen bekleyin, bu işlem birkaç saniye sürebilir.</p>
    </div>
  `;
  model = await mobilenet.load();
  sonucKonteyner.innerHTML = `
    <div class="sonuc-karti" style="text-align: center; padding: 30px 20px;">
      <span style="font-size: 3rem; display: block; margin-bottom: 15px;">✅</span>
      <p style="font-size: 1.1rem; color: var(--ikincil); font-weight: 700;">Model Hazır!</p>
      <p style="font-size: 0.9rem; color: var(--gri-koyu);">Fotoğraf yükleyerek hemen başlayabilirsiniz.</p>
    </div>
  `;
}

// ─── Dosya Seç ───────────────────────────────────────────────────────────
dosyaSecici.addEventListener('change', (event) => {
  const dosya = event.target.files[0];
  if (dosya) {
    const reader = new FileReader();
    reader.onload = (e) => {
      resimOnizleme.src = e.target.result;
      resimOnizleme.style.display = 'block';
      
      // Yükleme öncesi içeriği gizle
      yuklemeOncesi.style.display = 'none';
      
      // Dosya seç butonunu gizle
      dosyaSecButon.style.display = 'none';
      
      // Sıfırla butonunu göster
      sifirlaButon.style.display = 'inline-flex';
      
      // Sol panel sınıfını ekle
      solPanel.classList.add('resim-yuklendi');
      
      // Sonuç konteynerını güncelle
      sonucKonteyner.innerHTML = `
        <div class="sonuc-karti" style="text-align: center; padding: 30px 20px;">
          <span style="font-size: 3rem; display: block; margin-bottom: 15px; animation: yuzmeAnimasyon 1s ease-in-out infinite;">🔍</span>
          <p style="font-size: 1.1rem; color: var(--ana-renk); font-weight: 700;">Analiz ediliyor...</p>
          <p style="font-size: 0.9rem; color: var(--gri-koyu);">Yapay zeka fotoğrafı inceliyor.</p>
        </div>
      `;
      
      bilgiKutusunuGoster(null);
      
      // Bilgi kutusu elementini kaldır
      const kutu = document.getElementById('bilgi-kutusu');
      if (kutu) kutu.remove();
      
      setTimeout(() => tahminEt(), 500);
    };
    reader.readAsDataURL(dosya);
  }
});

// ─── Tahmin Et ────────────────────────────────────────────────────────────
async function tahminEt() {
  const tahminler   = await model.classify(resimOnizleme);
  const enIyiTahmin = tahminler[0];
  const bilgi       = hayvanBilgisiGetir(enIyiTahmin.className);

  // Sonuç kartını oluştur
  sonucKonteyner.innerHTML = sonucKartiOlustur(enIyiTahmin, bilgi);
  
  // Bilgi kutusunu göster
  bilgiKutusunuGoster(bilgi);
}

// ─── Başlat ───────────────────────────────────────────────────────────────
modeliYukle();