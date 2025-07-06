# MindSense

##  Grup 184 AI Takım Üyeleri

- **Fatma Ceren Çil** – Scrum Master  
- Seydi Dağlı  
- Yusuf Tetik  
- Aybüke Yıldız  
- Hamide Arslan  - Product Owner



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
<summary><strong> Kullanıcı Rolleri</strong></summary>

| Rol               | Açıklama                                                                 |
|------------------|--------------------------------------------------------------------------|
| Öğrenci          | Sisteme giriş yaparak chatbot üzerinden ders çalışır ve analiz edilir.  |
| Rehber Öğretmen  | Riskli durumlarda öğrencilerle ilgili bildirim alır ve takip yapar.      |
| Sistem Yöneticisi| Kullanıcı yönetimi ve genel sistem kontrolünü sağlar.                    |
| Geliştirici      | Yazılım altyapısını geliştirir ve sistem entegrasyonlarını yürütür.      |
</details>


<details>
<summary><strong> Hedef Kitle</strong></summary>

- İlköğretim, ortaöğretim ve lise düzeyindeki öğrenciler  
- Rehber öğretmenler ve okul psikolojik danışmanları  
- Eğitim kurumları (resmî veya özel)  
- Uzaktan eğitim sistemleri  
- Eğitim teknolojileri alanında çalışan geliştiriciler

</details>

<details>
<summary><strong> Kullanıcı Senaryoları (User Story)</strong></summary>

### Öğrenci (Primary User)
- Derse başlamadan önce duygusal durumumu analiz eden bir sistem kullanmak istiyorum ki sistem bana uygun bir içerik ve yaklaşım sunabilsin.
- Her ders için ayrı ayrı asistanla konuşmak istiyorum ki dersi daha iyi kavrayabileyim.
- Sorduğum sorulara yazılı ve sesli cevaplar alabilmek istiyorum ki anlamadığım noktaları daha net anlayabileyim.
- Asistanın beni anlamadığını hissettiğimde tekrar açıklamasını isteyebileyim ki öğrenme sürecim kesintiye uğramasın.

### Öğretmen
- Öğrencilerimin sistemdeki etkileşimlerini görmek istiyorum ki kimlerin desteğe ihtiyacı olduğunu anlayabileyim.
- Öğrencinin verdiği yanıtların hangi konularda eksik olduğunu görebilmek istiyorum ki bireysel destek sağlayabileyim.

### Rehber Öğretmen / Psikolojik Danışman
- Riskli duygusal duruma sahip öğrencilere ilişkin bildirim almak istiyorum ki erken müdahale edebileyim.
- Sistem tarafından analiz edilen duygusal durum geçmişini görebilmek istiyorum ki öğrencinin gelişimini uzun vadede izleyebileyim.

### Sistem Yöneticisi / Geliştirici
- Kullanıcı rollerini yönetebilmek istiyorum ki öğrenci, öğretmen ve danışmanlara uygun haklar verebileyim.
- Sistem loglarını takip edebilmek istiyorum ki sorun çıktığında hızlıca müdahale edebileyim.
- Kullanıcıdan gelen metni duygu analizine gönderen bir API yazmak istiyorum ki her mesajda öğrencinin ruh hali anlaşılabilsin.
</details>


<details>
<summary><strong> Kullanılan Teknolojiler</strong></summary>

## Kullanılan Teknolojiler

Tüm teknolojiler ücretsiz açık kaynaklıdır veya ücretsiz kullanım kontenjanı dahilindedir.

### Genel Teknoloji Tablosu

| Katman / Alan        | Teknoloji / Araçlar                    | Açıklama |
|----------------------|----------------------------------------|----------|
| Backend              | FastAPI                                | Python tabanlı hızlı ve modern web çatısı |
| Frontend             | Streamlit (veya Gradio)                | Web tabanlı etkileşimli kullanıcı arayüzü |
| Veritabanı           | PostgreSQL               | Kullanıcı ve içerik verilerinin saklanması |
| LLM (Yanıt Üretimi)  | Ollama – Gemma 3B (lokal), Gemini 1.5 Pro (bulut) | Chatbot yanıtları ve yönlendirme önerileri |
| Duygu Analizi (NLP)  | HuggingFace – DistilBERT Emotion       | Öğrenci metinlerinden duygu durumu tahmini |
| Ses Tanıma (STT)     | OpenAI Whisper veya Vosk               | Öğrenci sesli yanıtlarının metne dönüştürülmesi |
| Sesli Yanıt (TTS)    | gTTS, Tortoise TTS                     | Chatbot yanıtlarının sese dönüştürülmesi |
| Bildirim Sistemi     | E-posta API, Admin Panel               | Rehber öğretmene uyarı gönderme mekanizması |
| Loglama              | JSON formatında kayıt (timestamp + duygu + metin) | Öğrenci etkileşim geçmişi ve analiz raporları |
| Hosting / Deployment | Vercel (Frontend), Render (Backend)    | Projenin canlı ortama aktarılması |
| Proje Yönetimi       | Miro, GitHub Projects                  | Scrum yönetimi, sprint planlaması |
| Sürüm Kontrolü       | Git + GitHub                           | Kod versiyonlama ve takım içi iş birliği |


</details>
<details>
<summary><strong> Sprint 1</strong></summary>
  
## Sprint 1: Proje Planlama ve Hazırlık Süreci

Bu sprintte, proje fikrinin netleştirilmesi, ekip rollerinin belirlenmesi, teknolojik altyapının kararlaştırılması ve temel arayüz taslaklarının oluşturulması hedeflenmiştir.

### Tamamlanan Başlıca Çalışmalar

- **Proje fikri belirlendi:** Eğitim odaklı bir yapay zekâ destekli sistem geliştirme kararı alındı. Öğrencilerin verdiği yazılı veya sesli cevaplara göre duygu analizi yapılacak; depresif, öfkeli veya üzgün gibi durumlar algılandığında destek mesajı gösterilecek veya rehber öğretmene bildirim gönderilecek.
- **Ekip rolleri tanımlandı:** Scrum Master, Product Owner ve geliştirici ekip üyeleri belirlendi. 
- **Kullanılacak teknolojiler seçildi:** Streamlit, Whisper, gTTS, DistilBERT Emotion, Gemini 1.5 Pro gibi çözümler üzerinden çalışılmasına karar verildi. 
- **UI wireframe taslakları oluşturuldu:** Öğrenci arayüzü, konu seçim ekranı ve sohbet ekranı gibi temel bölümler için ilk taslaklar çizildi.
- **Miro üzerinden planlama yapıldı:** Sprint backlog oluşturuldu, görevler dağıtıldı ve ilerleme burndown chart ile takip edildi.
- **Chatbot modülünün temel yapısı hazırlandı:** Öğrenci mesajlarını alıp duygu analizine gönderme süreci prototip düzeyde kurgulandı.
- **Scrum belgeleri toplandı:** Toplantı notları, görev dağılımı ekran görüntüleri ve wireframe tasarımları arşivlendi.

### Sprint 1 Belgeleri ve Ekran Görüntüleri

Aşağıdaki belgeler, Sprint 1 süresince yapılan planlamaları ve çalışmaları belgelemektedir:

#### Miro Panosu ve Sprint Planlaması

- 📌 [Miro Sprint Panosu 1](docs/sprint1/miro_board_1.png)  
- 📌 [Miro Sprint Panosu 2](docs/sprint1/miro_board_2.png)

#### UI Wireframe Tasarımları

- 🖼️ [Wireframe – Ana Sayfa](wireframes/wireframe_1.png.jpg)  
- 🖼️ [Wireframe – Chatbot Ekranı](wireframes/wireframe_2.png.jpg)  
- 🖼️ [Wireframe – Konu Seçimi](wireframes/wireframe_3.png.jpg)

#### Takım İletişimi – Toplantılar ve Notlar

- 🗨️ [WhatsApp Notları 1](docs/whatsapp_1.png.png)  
- 🗨️ [WhatsApp Notları 2](docs/whatsapp_2.png.png)  
- 🗨️ [WhatsApp Notları 3](docs/whatsapp_3.png.png)  
- 🗨️ [WhatsApp Notları 4](docs/whatsapp_4.png.png)  
- 🗨️ [WhatsApp Notları 5](docs/whatsapp_5.png.png) 
- 💻 [Meet Toplantısı – Ekip Planlama 1](docs/meet_1.png.png)  
- 💻 [Meet Toplantısı – UI Tartışması 2](docs/meet_2.png.png)


### Sprint 1 Değerlendirmesi

Sprint 1 sonunda proje yönü ve çalışma düzeni netleştirilmiş, geliştirme için gerekli planlama tamamlanmıştır. Bu sprintin sonunda ekip olarak odaklandığımız başlıca çıktı, doğru hedefe odaklanmak ve sürdürülebilir bir geliştirme süreci oluşturmaktı. Eksik kalan tüm detaylar Sprint 2’ye aktarılacaktır.


</details>

<details>
<summary><strong> Kurulum Talimatları</strong></summary>

```bash
# 1. Repoyu klonlayın
git clone https://github.com/Yusuf-Tetik/YapayZekaAkademi.git
cd YapayZekaAkademi

# 2. Sanal ortam oluşturun ve etkinleştirin
python -m venv venv
source venv/bin/activate  # Windows için: venv\Scripts\activate

# 3. Gereksinimleri yükleyin
pip install -r requirements.txt

# 4. Backend sunucusunu çalıştırın
cd backend
uvicorn main:app --reload
</details>
