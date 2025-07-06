# MindSense

##  Grup 184 AI Takım Üyeleri

- **Fatma Ceren Çil** – Scrum Master  
- Seydi Dağlı  
- Yusuf Tetik  
- Aybüke Yıldız  
- Hamide Arslan  



<details>
<summary><strong> Proje Tanımı</strong></summary>


MindSense, ilkokul ve lise düzeyindeki öğrencilerin dijital ortamda bireysel ders çalışmasını destekleyen; yapay zekâ destekli, yazılı ve sesli etkileşime açık, duygusal durum farkındalığı yüksek bir eğitim platformudur.

Uygulama, öğrencinin seçtiği konularda etkileşimli olarak soru sorar ve öğrencinin verdiği cevapları yazılı veya sesli olarak analiz eder. Eğer öğrenci, öfke, üzüntü, kaygı, stres veya depresyon gibi olumsuz duygular taşıyorsa, sistem öncelikle öğrenciye uygun destekleyici yanıtlar üretir. Eğer bu durum devam ediyorsa veya risk düzeyi artıyorsa, ilgili okulun rehberlik servisine otomatik uyarı sistemi üzerinden bildirim gönderir.

MindSense, öğrenci performansını sadece akademik açıdan değil, psikolojik refah açısından da izleyen, Türkiye'de geliştirilen hibrit (eğitim + rehberlik destekli) yapay zekâ tabanlı okul içi rehberlik bildirim sistemine sahip eğitim teknolojisidir. Bu yönüyle bireysel farklılıklara saygı duyar, öğrencinin duygusal sesini dijital ortamda görünür kılar.

Uygulama, yapay zekâyı sadece bilgi üretiminde değil, aynı zamanda duygu analizi, rehberlik entegrasyonu ve otomatik yönlendirme mekanizması ile sosyal fayda yaratacak biçimde kullanır.



</details>

<details>
<summary><strong> Proje Özellikleri </strong></summary>

 **Konu Bazlı Dijital Etkileşim:**  
  Öğrenci, öğrenmek istediği dersi ve konuyu platform üzerinde seçer. Uygulama, konuya özel olarak yapılandırılmış soru–yanıt döngüsü başlatır.

- **Yapay Zekâ Destekli Öğrenme:**  
  LLM (Large Language Model) altyapısı ile öğrencinin verdiği yanıtlar değerlendirilir. Yanıtlara göre detaylı geri bildirimler ve takip soruları sunulur.

- **Duygu Analizi (Emotion Analysis):**  
  Öğrencinin verdiği yazılı veya sesli yanıtlar, DistilBERT Emotion modeli ile analiz edilir. Duygular (üzgün, öfkeli, stresli, kararsız vb.) sınıflandırılır.

- **Destekleyici Yanıtlar:**  
  Öğrencinin duygusal durumuna göre, pozitif geri bildirimler, motivasyon mesajları ve stres azaltıcı öneriler sistem tarafından otomatik olarak sunulur.

- **Rehberlik Sistemi Uyarı Mekanizması:**  
  Öğrencinin duygusal risk durumu eşik değeri aştığında, sistem bu durumu rehber öğretmen ekranına bildirim olarak iletir.

- **Sesli Yanıt ve Ses Tanıma:**  
  Öğrenci isterse mikrofon ile konuşarak da yanıt verebilir. Sistem bu sesi yazıya dönüştürüp analiz eder ve sesli yanıtla geri döner.

- **Farklı Rol ve Ekranlar:**  
  - **Öğrenci Paneli:** Konu seçimi, yanıt alanı, sesli yanıt butonları  
  - **Rehber Öğretmen Paneli:** Bildirimler, öğrenci duygu geçmişi ve müdahale seçenekleri  


- **Veri Güvenliği ve Loglama:**  
  Tüm analizler anonimleştirilmiş şekilde kayıt altına alınır. Kullanıcı verileri şifrelenerek saklanır.

- **Gelişmiş Geri Bildirim Motoru:**  
  Sistem, öğrencinin hem doğru–yanlış yanıtlarını hem de duygusal durumunu birleştirerek yönlendirmeleri buna göre üretir.

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

