# MindSense Eğitim Asistanı (Ollama - Gemma 3B) - Streamlit Chatbot
# Gereksinimler: pip install streamlit requests
# Çalıştırmak için: streamlit run chatbot/model_test.py

import streamlit as st
import requests
import os
import time
import json
from transformers import pipeline
import torch
from datetime import datetime

# Duygu analizi modeli (Hugging Face)
# Yeni duygu analiz modeli (j-hartmann)
emotion_analyzer = pipeline(
    "text-classification",
    model="ba2hann/bert_base_turkish_sentiment_analysis",
    
)

def analyze_emotion(text):
    result = emotion_analyzer(text)[0]
    label = result["label"].lower()
    score = result["score"]
    return label, score



def log_chat_interaction(user_msg, model_resp, emotion, score, log_path="chat_log.jsonl"):
    log_entry = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "user_message": user_msg,
        "model_response": model_resp,
        "emotion": emotion,
        "score": round(score, 4)
    }
    with open(log_path, "a", encoding="utf-8") as f:
        f.write(json.dumps(log_entry, ensure_ascii=False) + "\n")


def log_alert_if_needed(user_msg, emotion, score, alert_path="alerts.jsonl"):
    risky = ["sadness", "anger", "fear", "disgust"]
    if emotion in risky:
        alert_entry = {
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "message": user_msg,
            "emotion": emotion,
            "score": round(score, 4),
            "status": "Bildirildi"
        }
        with open(alert_path, "a", encoding="utf-8") as f:
            f.write(json.dumps(alert_entry, ensure_ascii=False) + "\n")



def manual_emotion_filter(text, predicted_label):
    text = text.lower()

    # Anahtar kelimelerle etiket eşleştirme
    joy_words = ["heyecan", "sevindim", "mutluyum", "güzel geçti", "harikaydı", "iyi hissediyorum", "keyifli", "başardım"]
    sadness_words = ["üzgünüm", "kötü geçti", "yapamıyorum", "düşük aldım", "başarısız", "yalnızım"]
    anger_words = ["bıktım", "nefret", "sinir", "deliricem", "çok kızgınım", "öfkeliyim"]
    fear_words = ["korkuyorum", "tedirginim", "kaygılıyım", "endişeliyım", "panik"]
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

    # Eğer eşleşme yoksa model çıktısını kullan
    return predicted_label

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "gemma3:latest"
PROMPT_PATH = "chatbot/prompts/educational_assistant.txt"

# Prompt dosyasını oku
if os.path.exists(PROMPT_PATH):
    with open(PROMPT_PATH, encoding="utf-8") as f:
        base_prompt = f.read()
else:
    base_prompt = "{history}\nSen: {message}\nMindSense:"

# Sayfa ayarları
st.set_page_config(page_title="MindSense Chatbot", page_icon="💬")
st.title("💬 MindSense Chatbot")
st.write("Merhaba! Ben MindSense. Derslerinde yardıma ihtiyacın olduğunda buradayım!")

# Sohbet geçmişi için session_state kullan
if "history" not in st.session_state:
    st.session_state.history = []  # Yeni yapı: {"role": "user"/"assistant", "content": "mesaj"}

# Sohbet geçmişini yukarıdan aşağıya sırala ve hizala
for item in st.session_state.history:
    role = item["role"]
    msg = item["content"]
    if role == "user":
        st.markdown(f"<div style='text-align: right; color: #1a73e8;'><b>Sen:</b> {msg}</div>", unsafe_allow_html=True)
    elif role == "assistant":
        st.markdown(f"<div style='text-align: left; color: #34a853;'><b>MindSense:</b> {msg}</div>", unsafe_allow_html=True)

# Örnek sorular sadece ilk mesajda göster
if len(st.session_state.history) == 0:
    with st.expander("Örnek Sorular", expanded=False):
        st.markdown("""
        - Matematik ödevimi yaparken eğlenceli bir yol var mı?
        - Fen dersinde güneş sistemini öğreniyoruz, bana yardımcı olur musun?
        - İngilizce kelime ezberlemekte zorlanıyorum
        - Bugün okulda çok yoruldum
        - Sınavım kötü geçti, üzgünüm
        """)

# Kullanıcıdan giriş al
with st.form(key="chat_form", clear_on_submit=True):
    user_input = st.text_input("Mesajınız", placeholder="Mesajınızı yazın...")
    send = st.form_submit_button("Gönder")



# Kullanıcı gönderdiğinde işlem başlasın
if send and user_input:
        # Duygu analizi yap
    emotion_label, emotion_score = analyze_emotion(user_input)
    emotion_label = manual_emotion_filter(user_input, emotion_label)


    # Anlamlı gösterim için emoji ekleyelim (isteğe bağlı)
    emotion_emojis = {
        "joy": "mutluluk 😊",
        "sadness": "üzüntü 😢",
        "anger": "öfke 😠",
        "fear": "korku 😨",
        "disgust": "iğrenme 🤢",
        "surprise": "şaşkınlık 😮"
    }
    emoji = emotion_emojis.get(emotion_label, f"{emotion_label} 🧠")


    # Duyguyu kullanıcıya göster (isteğe bağlı)
    st.markdown(f"🧠 <b>Duygusal Analiz:</b> {emoji} (%{emotion_score*100:.1f})", unsafe_allow_html=True)

    # Eğer olumsuz duyguysa uyarı için işaretle (gelişmiş sistemde dosyaya yazacağız)
    risky_emotions = ["sadness", "anger", "fear","disgust"]
    if emotion_label in risky_emotions:
        st.warning(f"⚠️ Olumsuz duygu tespit edildi: {emotion_label}. Gerekirse rehber öğretmene bildirilecek.")


    # Geçmişi uygun biçimde model promptuna dönüştüren fonksiyon
    def build_chat_history(history):
        lines = []
        for item in history:
            if item["role"] == "user":
                lines.append(f"Sen: {item['content']}")
            elif item["role"] == "assistant":
                lines.append(f"MindSense: {item['content']}")
        return "\n".join(lines)

    # Promptu hazırla
    chat_str = build_chat_history(st.session_state.history)
    full_prompt = base_prompt.replace("{history}", chat_str).replace("{message}", user_input)
    # prompt ekranı görsel olarak yazdır
    with st.expander("📜 Oluşturulan Prompt (Debug)", expanded=False):
        st.code(full_prompt)

    payload = {
        "model": MODEL_NAME,
        "prompt": full_prompt,
        "stream": True
    }

    # Kullanıcı mesajını geçmişe kaydet
    st.session_state.history.append({"role": "user", "content": user_input})
 

    # Stream edilen cevabı göstermek için placeholder
    response_placeholder = st.empty()
    streamed_answer = ""

    try:
        with requests.post(OLLAMA_URL, json=payload, stream=True, timeout=120) as resp:
            resp.raise_for_status()
            for line in resp.iter_lines():
                if line:
                    try:
                        data = line.decode("utf-8")
                        chunk = json.loads(data)
                        part = chunk.get("response", "")
                        streamed_answer += part
                        response_placeholder.markdown(
                            f"<div style='text-align: left; color: #34a853;'><b>MindSense:</b> {streamed_answer}</div>",
                            unsafe_allow_html=True
                        )
                        time.sleep(0.01)
                    except Exception:
                        continue
    except Exception as e:
        streamed_answer = f"Ollama API hatası: {e}"
        response_placeholder.markdown(
            f"<div style='text-align: left; color: #34a853;'><b>MindSense:</b> {streamed_answer}</div>",
            unsafe_allow_html=True
        )

    # MindSense cevabını geçmişe kaydet
    st.session_state.history.append({"role": "assistant", "content": streamed_answer})
       # ✅ Log kaydı
    log_chat_interaction(user_input, streamed_answer, emotion_label, emotion_score)

# ✅ Rehber uyarı kaydı
    log_alert_if_needed(user_input, emotion_label, emotion_score)

    st.rerun()
