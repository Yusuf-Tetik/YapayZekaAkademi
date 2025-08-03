# backend/utils.py
from transformers import pipeline
import requests
import json
from datetime import datetime
import os

# HuggingFace Türkçe duygu analiz modeli
emotion_analyzer = pipeline(
    "text-classification",
    model="ba2hann/bert_base_turkish_sentiment_analysis"
)

def analyze_emotion(text):
    result = emotion_analyzer(text)[0]
    label = manual_emotion_filter(text, result["label"].lower())
    return label, float(result["score"])

def manual_emotion_filter(text, predicted_label):
    text = text.lower()
    joy_words = ["heyecan", "sevindim", "mutluyum", "güzel geçti", "harikaydı", "iyi hissediyorum", "keyifli", "başardım"]
    sadness_words = ["üzgünüm", "kötü geçti", "yapamıyorum", "düşük aldım", "başarısız", "yalnızım"]
    anger_words = ["bıktım", "nefret", "sinir", "deliricem", "çok kızgınım", "öfkeliyim"]
    fear_words = ["korkuyorum", "tedirginim", "kaygılıyım", "endişeliyim", "panik"]
    disgust_words = ["iğrenç", "midem bulandı", "tiksindim"]

    for word in joy_words:
        if word in text:
            return "joy"
    for word in sadness_words:
        if word in text:
            return "sadness"
    for word in anger_words:
        if word in text:
            return "anger"
    for word in fear_words:
        if word in text:
            return "fear"
    for word in disgust_words:
        if word in text:
            return "disgust"

    return predicted_label

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "gemma3:latest"
PROMPT_PATH = "chatbot/prompts/educational_assistant.txt"

def generate_response(message: str, emotion: str) -> str:
    if os.path.exists(PROMPT_PATH):
        with open(PROMPT_PATH, encoding="utf-8") as f:
            prompt_template = f.read()
    else:
        prompt_template = "Sen: {message}\nMindSense:"

    final_prompt = prompt_template.replace("{chat_history}", "").replace("{history}", "").replace("{message}", message)

    payload = {
        "model": MODEL_NAME,
        "prompt": final_prompt,
        "stream": False
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=30)
        response.raise_for_status()
        result = response.json()
        return result.get("response", "Cevap üretilemedi.").strip()
    except Exception as e:
        return f"[HATA: Chatbot erişilemedi] {str(e)}"

def log_chat_interaction(user_msg, model_resp, emotion, score, log_path="chat_log.jsonl"):
    entry = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "user_message": user_msg,
        "model_response": model_resp,
        "emotion": emotion,
        "score": round(score, 4)
    }
    with open(log_path, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")

def log_alert_if_needed(user_msg, emotion, score, alert_path="alerts.jsonl"):
    if emotion in ["sadness", "anger", "fear", "disgust"]:
        entry = {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "message": user_msg,
            "emotion": emotion,
            "score": round(score, 4),
            "status": "Bildirildi"
        }
        with open(alert_path, "a", encoding="utf-8") as f:
            f.write(json.dumps(entry, ensure_ascii=False) + "\n")
