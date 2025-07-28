import streamlit as st
import os
from langchain_core.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import LLMChain
from langchain_ollama import ChatOllama

# PROMPT dosyasını oku
PROMPT_PATH = os.path.join(os.path.dirname(__file__), "prompts", "educational_assistant.txt")
with open(PROMPT_PATH, "r", encoding="utf-8") as f:
    prompt_template_str = f.read()

# Hafıza başlat (session state ile)
if "memory" not in st.session_state:
    st.session_state.memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
memory = st.session_state.memory

# OpenChat 3.5 modelini bağla
llm = ChatOllama(model="openchat")

# Prompt tanımı
prompt = PromptTemplate(
    input_variables=["chat_history", "user_input"],
    template=prompt_template_str
)
chain = LLMChain(llm=llm, prompt=prompt, memory=memory)

# Arayüz başlat
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

# Son 30 mesajı göster, yeniler en altta olacak şekilde sıralama
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
        with st.spinner("MindSense düşünüyor..."):
            response = chain.invoke({"user_input": user_input.strip()})
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

