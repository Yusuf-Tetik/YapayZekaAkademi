import json
from transformers import pipeline

# Modeli yükle
emotion_analyzer = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", top_k=1)

# Test verilerini yükle
with open("test_data.json", "r", encoding="utf-8") as f:
    test_data = json.load(f)

# Başarı sayacı
correct = 0

print("🔍 Test Sonuçları:\n")

for idx, item in enumerate(test_data):
    text = item["text"]
    expected = item["expected_emotion"]

    result = emotion_analyzer(text)[0][0]  # önce dıştaki liste, sonra içtekinden ilk eleman
    predicted = result["label"].lower()
    score = result["score"]


    is_correct = predicted.lower() == expected.lower()
    status = "✅ DOĞRU" if is_correct else "❌ YANLIŞ"

    print(f"{idx+1}. '{text}'")
    print(f"    Tahmin: {predicted} (%{score*100:.1f}) | Beklenen: {expected} → {status}\n")

    if is_correct:
        correct += 1

# Genel başarı oranı
total = len(test_data)
accuracy = correct / total * 100
print(f"🎯 Doğruluk Oranı: %{accuracy:.1f} ({correct}/{total})")
