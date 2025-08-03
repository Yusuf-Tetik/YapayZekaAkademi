# =====================================
# 0. GEREKLİ KÜTÜPHANELER
# =====================================
import pandas as pd
import re
import nltk
import numpy as np
from nltk.corpus import stopwords
from datasets import load_dataset
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    Trainer,
    TrainingArguments,
    DataCollatorWithPadding
)
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

# =====================================
# 1. ADIM: VERİ ÖN İŞLEME
# =====================================
nltk.download('stopwords')
stop_words = set(stopwords.words('turkish'))

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)      # Noktalama kaldır
    text = re.sub(r'\d+', '', text)          # Sayılar kaldır
    words = text.split()
    filtered_words = [word for word in words if word not in stop_words]
    return ' '.join(filtered_words)

# emotion_train.csv'yi oku ve temizle
# emotion_train.csv'yi oku
df = pd.read_csv("emotion_train.csv")

# ⛔️ HATALI VERİYİ GÖSTER (senin sorunun burada!)
print("❗ Etiketsiz satırlar:")
print(df[df["label"].isnull()])

# 🧼 Boş etiketleri kaldır
df = df.dropna(subset=["label"])

# Temizleme işlemi
df["text"] = df["text"].apply(preprocess_text)

# Yeni CSV dosyasını kaydet
df.to_csv("emotion_train_cleaned.csv", index=False)

# =====================================
# 2. ADIM: BERT MODELİ EĞİTİMİ
# =====================================

# Veri kümesini yükle
dataset = load_dataset("csv", data_files={"train": "emotion_train_cleaned.csv"}, delimiter=",")

# Etiketleri sayısal değerlere çevir
label_names = list(set(dataset["train"]["label"]))
label2id = {label: i for i, label in enumerate(label_names)}
id2label = {i: label for label, i in label2id.items()}

def encode_labels(example):
    example["label"] = label2id[example["label"]]
    return example

dataset = dataset.map(encode_labels)

# Tokenizer ve model yükle
MODEL_NAME = "dbmdz/bert-base-turkish-cased"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_NAME,
    num_labels=len(label2id),
    id2label=id2label,
    label2id=label2id
)

# Metni tokenize et
def tokenize_function(example):
    return tokenizer(example["text"], padding=True, truncation=True)

tokenized_dataset = dataset.map(tokenize_function, batched=True)
data_collator = DataCollatorWithPadding(tokenizer=tokenizer)

# Metrik hesaplama fonksiyonu
def compute_metrics(pred):
    labels = pred.label_ids
    preds = np.argmax(pred.predictions, axis=1)
    precision, recall, f1, _ = precision_recall_fscore_support(labels, preds, average='weighted')
    acc = accuracy_score(labels, preds)
    return {
        "accuracy": acc,
        "precision": precision,
        "recall": recall,
        "f1": f1
    }

# Eğitim ayarları
training_args = TrainingArguments(
    output_dir="./emotion_model",
    per_device_train_batch_size=8,
    num_train_epochs=5,
    save_total_limit=1,
    logging_steps=10,
   
)

# Trainer oluştur
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset["train"],
    tokenizer=tokenizer,
    data_collator=data_collator,
    compute_metrics=compute_metrics,
)

# Modeli eğit
trainer.train()

# Eğitilen modeli kaydet
model.save_pretrained("./emotion_model")
tokenizer.save_pretrained("./emotion_model")
