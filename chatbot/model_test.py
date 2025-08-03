import streamlit as st
import os
import json
from datetime import datetime

from langchain_core.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain
# --- BURADA: Gemini için import
from langchain_google_genai import ChatGoogleGenerativeAI

# --- Duygu Analizi için HuggingFace pipeline ---
from transformers import pipeline

emotion_analyzer = pipeline(
    "text-classification",
    model="ba2hann/bert_base_turkish_sentiment_analysis"
)

def analyze_emotion(text):
    result = emotion_analyzer(text)[0]
    label = result["label"].lower()
    score = result["score"]
    return label, score

def manual_emotion_filter(text, predicted_label):
    text = text.lower()
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
    return predicted_label

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

# --- PROMPT dosyasını oku ---
PROMPT_PATH = os.path.join(os.path.dirname(__file__), "prompts", "educational_assistant.txt")
with open(PROMPT_PATH, "r", encoding="utf-8") as f:
    prompt_template_str = f.read()

# Hafıza başlat (session state ile)
if "memory" not in st.session_state:
    st.session_state.memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
memory = st.session_state.memory

# ---- BURADA: GEMINI PRO'YA GEÇİŞ ----
# API anahtarını .env'ye koyabilir veya aşağıya direkt ekleyebilirsin (gizli tutmak daha iyi)
os.environ["GOOGLE_API_KEY"] = "your-api-key"


llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", convert_system_message_to_human=True)

prompt = PromptTemplate(
    input_variables=["chat_history", "user_input"],
    template=prompt_template_str
)
chain = LLMChain(llm=llm, prompt=prompt, memory=memory)

# --- Arayüz ---
st.set_page_config(page_title="MindSense Chat", page_icon="💬")
st.markdown("""
    <style>
    .stChatMessage {
        background: #f5f5f7; border-radius: 12px; padding: 12px 18px; margin: 6px 0;
        font-size: 17px;
    }
    .chat-row-user { text-align: right; color: #1a73e8; }
    .chat-row-ai { text-align: left; color: #34a853; }
    .stTextInput>div>div>input {font-size: 17px;}
    </style>
""", unsafe_allow_html=True)

st.title("🧠 MindSense")
st.write("Merhaba! Ben MindSense. Derslerinde sana yardımcı olmak için buradayım.")

# Chat geçmişini aşağıdan yukarıya (yeni mesaj en altta) göstermek için
msg_tuples = []
for msg in memory.chat_memory.messages:
    if msg.type == "human":
        msg_tuples.append(("Sen", msg.content, "user"))
    elif msg.type == "ai":
        msg_tuples.append(("MindSense", msg.content, "ai"))

with st.container():
    for sender, content, role in msg_tuples[-30:]:
        if role == "user":
            st.markdown(f"<div class='stChatMessage chat-row-user'><b>{sender}:</b> {content}</div>", unsafe_allow_html=True)
        else:
            st.markdown(f"<div class='stChatMessage chat-row-ai'><b>{sender}:</b> {content}</div>", unsafe_allow_html=True)

# Chat input en altta ve sabit olsun
with st.form(key="chat_form", clear_on_submit=True):
    user_input = st.text_input("", placeholder="Mesajınızı yazın...")
    send = st.form_submit_button("Gönder")
    if send and user_input.strip():
        # --- Duygu Analizi ve Gösterim ---
        emotion_label, emotion_score = analyze_emotion(user_input)
        emotion_label = manual_emotion_filter(user_input, emotion_label)
        emotion_emojis = {
            "joy": "mutluluk 😊",
            "sadness": "üzüntü 😢",
            "anger": "öfke 😠",
            "fear": "korku 😨",
            "disgust": "iğrenme 🤢",
            "surprise": "şaşkınlık 😮"
        }
        emoji = emotion_emojis.get(emotion_label, f"{emotion_label} 🧠")
        st.markdown(f"🧠 <b>Duygusal Analiz:</b> {emoji} (%{emotion_score*100:.1f})", unsafe_allow_html=True)
        if emotion_label in ["sadness", "anger", "fear", "disgust"]:
            st.warning(f"⚠️ Olumsuz duygu tespit edildi: {emotion_label}. Gerekirse rehber öğretmene bildirilecek.")

        # --- LLM ile Yanıt Al ---
        with st.spinner("MindSense düşünüyor..."):
            response = chain.invoke({"user_input": user_input.strip()})
            model_resp = response["text"] if isinstance(response, dict) and "text" in response else str(response)
        
        # --- Loglama ---
        log_chat_interaction(user_input, model_resp, emotion_label, emotion_score)
        log_alert_if_needed(user_input, emotion_label, emotion_score)

        st.rerun()

# İlk mesajda örnek sorular
if not memory.chat_memory.messages:
    with st.expander("📘 Örnek Sorular", expanded=False):
        st.markdown("""
        - Matematik ödevimi yaparken eğlenceli bir yol var mı?
        - Fen dersinde güneş sistemini öğreniyoruz, bana yardımcı olur musun?
        - İngilizce kelime ezberlemekte zorlanıyorum
        - Bugün okulda çok yoruldum
        - Sınavım kötü geçti, üzgünüm
        """)
