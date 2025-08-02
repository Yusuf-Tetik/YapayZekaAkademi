from transformers import BertTokenizer, BertForSequenceClassification, pipeline

# 📁 Eğittiğin modeli yükle
model_path = "./emotion_model"
tokenizer = BertTokenizer.from_pretrained(model_path)
model = BertForSequenceClassification.from_pretrained(model_path)

# Pipeline ile tahmin
emotion_classifier = pipeline("text-classification", model=model, tokenizer=tokenizer)

def analyze_sentiment(text):
    result = emotion_classifier(text, truncation=True)[0]
    label = result['label']
    score = round(result['score'] * 100, 2)

    # Eşik değeri kontrolü (örn: %60 altında ise riskli)
    if score < 60:
        durum = "❗ RİSKLİ - düşük güven"
    else:
        durum = "✅ Güvenli"

    return label, score, durum

# Test cümleleri
test_sentences = [
    "Bugün çok mutluyum, her şey harika gidiyor!",
    "Hiçbir şey anlamadım, sınav çok zordu.",
    "Yarın açıklanacak sonuçlar beni çok korkutuyor.",
    "Gerçekten sinirliyim, sürekli hata alıyorum.",
    "Yeni arkadaşlarımla oyun oynamak çok keyifliydi!"
]

print("🔍 Tahmin Sonuçları:\n")
for sentence in test_sentences:
    label, score, durum = analyze_sentiment(sentence)
    print(f"📝 Cümle: {sentence}")
    print(f"🔎 Tahmin: {label} (%{score}) → {durum}\n")

# Tek cümlelik test
label, score, durum = analyze_sentiment("Hiçbir şey anlamadım, sınav çok kötüydü.")
print(f"Etiket: {label}, Güven: %{score}, Durum: {durum}")
