import json
import pandas as pd

# JSON dosyasını yükle
with open("test_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# expected_emotion -> label adını değiştir
for item in data:
    item["label"] = item.pop("expected_emotion")

# Pandas ile dataframe'e çevir
df = pd.DataFrame(data)

# CSV dosyasına yaz
df.to_csv("emotion_train.csv", index=False, encoding="utf-8")
print("✅ CSV başarıyla oluşturuldu → emotion_train.csv")
