# MindSense

##  Takım Üyeleri

- **Fatma Ceren Çil** – Scrum Master  
- Seydi Dağlı  
- Yusuf Tetik  
- Aybüke Yıldız  
- Hamide Arslan  



<details>
<summary><strong> Proje Tanımı</strong></summary>


MindSense, öğrencilerin seçtikleri derslerde yapay zekâ destekli bir şekilde yazılı veya sesli olarak çalışabildiği bir eğitim platformudur. Sistem, öğrencilerin verdiği yanıtlardan duygu analizi yaparak onların psikolojik durumlarını değerlendirir. Eğer öğrencinin duygusal durumu risk taşıyorsa (örneğin: depresyon, öfke, yoğun üzüntü), sistem öğrenciye destekleyici içerikler gösterir veya ciddi durumlarda ilgili okulun rehber öğretmenine otomatik olarak bildirim gönderir.

Bu yapı hem uzaktan eğitim deneyimini bireyselleştirir hem de öğrencilerin ruhsal iyi oluşunu dijital yollarla destekler.

</details>



<details>
<summary><strong> Proje Amacı ve Kapsamı</strong></summary>

**Amaçlar:**
- Öğrencilerin bireysel öğrenme deneyimini iyileştirmek
- Cevaplardan duygusal durum tespiti yapmak
- Rehberlik birimlerine erken uyarı sistemleri sunmak

**Kapsam:**
- AI destekli soru–cevap mekanizması
- Yazılı ve sesli yanıtların duygusal analizi
- Rehber öğretmen bildirim sistemi
- Web arayüzü (Streamlit ile)
- Sesli iletişim modülü (girdi ve çıktı)
- Gelişmiş loglama ve kullanım analitiği

</details>



<details>
<summary><strong> Hedef Kitle</strong></summary>

- İlköğretim ve lise düzeyindeki öğrenciler  
- Rehber öğretmenler ve okul psikolojik danışmanları  
- Eğitim kurumları (resmî veya özel)  
- Uzaktan eğitim sistemleri  
- Eğitim teknolojileri alanında çalışan geliştiriciler

</details>



<details>
<summary><strong> Kullanılan Teknolojiler</strong></summary>

| Alan | Teknoloji |
|------|-----------|
| Arayüz | Streamlit (web tabanlı arayüz) |
| LLM (Yapay Zekâ Yanıtı) | Ollama - Gemma 3B (yerel), Google Gemini 1.5 Pro (bulut) |
| Duygu Analizi | HuggingFace – DistilBERT Emotion |
| Ses Tanıma (STT) | Whisper (OpenAI), alternatif: Vosk |
| Sesli Yanıt (TTS) | gTTS, Tortoise TTS |
| Veritabanı | Supabase veya MongoDB Atlas |
| Bildirim Sistemi | Admin panel üzerinden uyarı veya e-posta API |
| Loglama | JSON tabanlı olay kayıtları (öğrenci cevap + duygu + zaman) |

Tüm çözümler ücretsiz açık kaynak veya ücretsiz kontenjan dahilindedir.

</details>


