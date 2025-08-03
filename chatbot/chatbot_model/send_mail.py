import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

# Gönderen ve alıcı bilgileri
sender_email = "mindsense.alerts@gmail.com"
app_password = "cjqc ibhr popf ewsg"
receiver_email = "yildizaybuke10@gmail.com"  # test için kendi adresin

# Mail içeriği (örnek)
subject = "🚨 Duygu Analizi Uyarısı"
body = f"""
Merhaba,

Sistemimiz bir riskli duygu analizi algıladı.

📝 Cümle: "Hiçbir şey anlamadım, sınav çok kötüydü."
🔎 Etiket: fear
📉 Güven: %27.79
📅 Tarih: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}

Lütfen öğrencinizle iletişime geçin.

Saygılar,
MindSense Otomatik Uyarı Sistemi
"""

# MIME yapısı
msg = MIMEMultipart()
msg["From"] = sender_email
msg["To"] = receiver_email
msg["Subject"] = subject
msg.attach(MIMEText(body, "plain"))

# SMTP bağlantısı
try:
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(sender_email, app_password)
        server.send_message(msg)
    print("✅ Mail başarıyla gönderildi.")
except Exception as e:
    print(f"❌ Hata oluştu: {e}")
