# 🐾 Yapay Sinir Ağları ile Akıllı Evcil Hayvan Tür Analiz ve Bilgilendirme Sistemi

Bu proje, derin öğrenme ve yapay sinir ağları (YSA) teknikleri kullanılarak kedi ve köpek cinslerini ayırt edebilen, tarayıcı tabanlı uçtan uca bir sınıflandırma ve bilgilendirme sistemidir. Proje, Google Colab ortamında eğitilen bir CNN modelinin, TensorFlow.js aracılığıyla sunucusuz (client-side) olarak web arayüzünde çalıştırılması prensibine dayanır.

---

## 🚀 Proje Özellikleri
* **Akıllı Tür Tespiti:** Yüklenen evcil hayvan fotoğrafını saniyeler içinde analiz eder ve türünü tahmin eder.
* **XAI (Açıklanabilir Yapay Zeka) Yaklaşımı:** Sadece tür adı vermekle kalmaz; o türün ayırt edici morfolojik özelliklerini kullanıcıya açıklar.
* **Detaylı Künye:** Tespit edilen türün ortalama ömrü, kilosu, kökeni ve karakter analizini (anahtar kelimelerle) dinamik olarak kart yapısında sunar.
* **%100 İstemci Tabanlı (Client-side Inference):** Model tarayıcıda çalıştığı için sunucu maliyeti yoktur ve yüksek gizlilik/hız sağlar.

---

## 🧠 Yapay Sinir Ağı (YSA) ve Mimari Detayları

Projede, görüntü işleme ve nesne tanıma görevlerinde yüksek başarı gösteren **CNN (Convolutional Neural Networks - Evrişimli Sinir Ağları)** tabanlı **MobileNetV2** mimarisi kullanılmıştır. Web tarayıcılarında düşük gecikme ile çalışabilmesi için optimize edilmiş bu model, **Transfer Learning (Transferli Öğrenme)** stratejisi ile inşa edilmiştir.

### 1. Model Parametreleri (Öğrenilen Değerler)
* **Dondurulmuş Parametreler:** `base_model.trainable = False` satırı ile ImageNet veri seti üzerinde önceden eğitilmiş milyonlarca Ağırlık ($W$) ve Sapma ($b$) parametresi dondurulmuştur.
* **Eğitilebilir Parametreler:** Modelin sonuna eklenen ve sadece bizim veri setimizdeki 37 sınıfı öğrenmeye odaklanan `Dense(37)` katmanındaki nöronların ağırlıklarıdır.

### 2. Hiperparametreler (Eğitim Ayarları)
* **Girdi Boyutu (Input Shape):** $224 \times 224 \times 3$ (Genişlik, Yükseklik, RGB Renk Kanalı)
* **Epoch (Dönem):** 5
* **Batch Size (Yığın Boyutu):** 32
* **Öğrenme Oranı (Learning Rate):** Adam optimizasyon algoritmasının adaptif varsayılan değeri.

### 3. Fonksiyonel Parametreler
* **Aktivasyon Fonksiyonu:** Çıkış katmanında 37 sınıfın toplam olasılığını 1'e tamamlayacak şekilde olasılık üretmesi için **Softmax** kullanılmıştır.
* **Kayıp Fonksiyonu (Loss Function):** Modelin hata payını ölçmek için **Sparse Categorical Crossentropy** seçilmiştir.
* **Optimizasyon Algoritması (Optimizer):** Gradyanları hesaplayarak ağırlıkları güncelleyen **Adam** algoritması kullanılmıştır.

---

## 📊 Veri Seti (Dataset)
Modelin eğitiminde, akademik dünyada standart olarak kabul gören ve 37 farklı kedi/köpek cinsine ait binlerce etiketli görsel barındıran **Oxford-IIIT Pet Dataset** kullanılmıştır.

---

## 💻 Kullanılan Teknolojiler
* **Yapay Zeka & Model Geliştirme:** Python, Google Colab, Keras, TensorFlow, TensorFlow.js Converter
* **Web Arayüzü & Entegrasyon:** HTML5, CSS3, JavaScript (TensorFlow.js)

---

## 📂 Klasör Yapısı
```text
├── kendi_modelim/
│   ├── model.json               # Modelin YSA katman iskeleti ve topolojisi
│   ├── group1-shard1of3.bin     # Modelin eğitilmiş ağırlık parçaları (Weights)
│   ├── group1-shard2of3.bin
│   └── group1-shard3of3.bin
├── index.html                   # Uygulamanın arayüz tasarımı
├── style.css                    # Görsel düzenlemeler ve kart tasarımları
├── script.js                   # Kamera/Dosya yönetimi, Ön işleme ve Model tahmini
└── README.md                    # Proje dökümantasyonu

```

Kurulum ve Çalıştırma
Tarayıcıların güvenlik politikaları (Same-Origin Policy) gereği, model.json dosyasının yüklenebilmesi için projenin bir HTTP sunucusu üzerinden çalıştırılması gerekmektedir (CORS engelini aşmak için).

Yöntem 1: VS Code Live Server (Tavsiye Edilen)
-Bu repoyu bilgisayarınıza indirin ve VS Code ile açın.

-Live Server eklentisini kurun.

-index.html dosyasına sağ tıklayıp "Open with Live Server" seçeneğini seçin.

📋 Örnek Çıktı Formatı
Sistem bir fotoğrafı analiz ettiğinde kullanıcıya aşağıdaki yapıda dinamik bir kart sunar:

Tespit Edilen Tür: 🐱 Persian Cat

Güven Oranı: %98.1

Künye Bilgileri:

⏳ Ömür: 12–17 yıl

⚖️ Kilo: 3–6 kg

🌍 Köken: İran

🔍 Ayırt Edici Özellik: Son derece basık yassı yüzü, kısa burnu, geniş gözleri ve vücudunu örten aşırı uzun tüyleriyle kolayca tanınır.

Mizaç: Sakin, Şık, Uysal
