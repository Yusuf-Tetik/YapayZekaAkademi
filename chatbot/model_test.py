# MindSense Eğitim Asistanı (Ollama - Gemma 3B) - Streamlit Chatbot
# Gereksinimler: pip install streamlit requests
# Çalıştırmak için: streamlit run chatbot/model_test.py

import streamlit as st
import requests
import os
import time
import json

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "gemma3:latest"
PROMPT_PATH = "chatbot/prompts/educational_assistant.txt"

# Prompt dosyasını oku
if os.path.exists(PROMPT_PATH):
    with open(PROMPT_PATH, encoding="utf-8") as f:
        base_prompt = f.read()
else:
    base_prompt = "{history}\nSen: {message}\nMindSense:"

st.set_page_config(page_title="MindSense Chatbot", page_icon="💬")
st.title("💬 MindSense Chatbot")
st.write("Merhaba! Ben MindSense. Derslerinde yardıma ihtiyacın olduğunda buradayım!")

# Sohbet geçmişi için session_state kullan
if "history" not in st.session_state:
    st.session_state.history = []  # Her eleman: ("Sen"/"MindSense", mesaj)

# Sohbet geçmişini yukarıdan aşağıya sırala ve hizala
for sender, msg in st.session_state.history:
    if sender == "Sen":
        st.markdown(f"<div style='text-align: right; color: #1a73e8;'><b>{sender}:</b> {msg}</div>", unsafe_allow_html=True)
    else:
        st.markdown(f"<div style='text-align: left; color: #34a853;'><b>{sender}:</b> {msg}</div>", unsafe_allow_html=True)

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
    user_input = st.text_input("", placeholder="Mesajınızı yazın...")
    send = st.form_submit_button("Gönder")

if send and user_input:
    # Prompt için geçmişi uygun formata çevir (sadece tamamlanmış çiftler)
    history_str = ""
    i = 0
    while i < len(st.session_state.history):
        sender, msg = st.session_state.history[i]
        if sender == "Sen":
            history_str += f"Sen: {msg}\n"
            # Sonraki MindSense cevabı varsa ekle
            if i+1 < len(st.session_state.history) and st.session_state.history[i+1][0] == "MindSense":
                history_str += f"MindSense: {st.session_state.history[i+1][1]}\n"
                i += 2
            else:
                i += 1
        else:
            i += 1
    # Şimdi yeni kullanıcı mesajını da ekle
    history_str += f"Sen: {user_input}\nMindSense:"
    prompt = base_prompt.replace("{history}", history_str).replace("{message}", user_input)
    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": True
    }
    # Kullanıcı mesajını geçmişe ekle
    st.session_state.history.append(("Sen", user_input))
    # Stream yanıtı için placeholder
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
    # MindSense cevabını geçmişe ekle
    st.session_state.history.append(("MindSense", streamed_answer))
    st.rerun()
