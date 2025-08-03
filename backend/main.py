# backend/main.py
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from sqlalchemy.orm import Session

from database import get_db, create_tables
from models import User, Emotion, ChatLog, Role, StudentEmotion, EmotionNotification, Topic
from utils import analyze_emotion, generate_response, log_chat_interaction, log_alert_if_needed

from auth import router as auth_router
from teacher_routes import router as teacher_router
from student_routes import router as student_router
from admin_routes import router as admin_router

app = FastAPI(
    title="MindSense API",
    description="Yapay zekâ destekli duygusal eğitim platformunun backend servisleri",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables()

app.include_router(auth_router, prefix="/auth", tags=["Authentication"])
app.include_router(teacher_router, prefix="/teacher", tags=["Teacher Panel"])
app.include_router(student_router, prefix="/student", tags=["Student Panel"])
app.include_router(admin_router, prefix="/admin", tags=["Admin Panel"])

class ChatRequest(BaseModel):
    user_id: int
    topic_id: int
    message: str
    timestamp: Optional[datetime] = None

class ChatResponse(BaseModel):
    message: str
    emotion: str
    emotion_score: float
    risk_level: str

@app.get("/", tags=["Health Check"])
def root():
    return {"message": "MindSense Backend is running"}

@app.post("/chat", response_model=ChatResponse, tags=["Chatbot"])
def chat(req: ChatRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == req.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    topic = db.query(Topic).filter(Topic.id == req.topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    emotion_label, emotion_score = analyze_emotion(req.message)
    risk_level = classify_risk(emotion_label, emotion_score)

    emotion_obj = db.query(Emotion).filter(Emotion.label == emotion_label).first()
    if not emotion_obj:
        emotion_obj = Emotion(label=emotion_label, description="")
        db.add(emotion_obj)
        db.commit()
        db.refresh(emotion_obj)

    system_response = generate_response(req.message, emotion_label)

    chat = ChatLog(
        student_id=req.user_id,
        topic_id=req.topic_id,
        question=req.message,
        student_answer=None,
        system_feedback=system_response,
        emotion_id=emotion_obj.id,
        created_at=datetime.now()
    )
    db.add(chat)

    student_emotion = StudentEmotion(
        student_id=req.user_id,
        emotion_id=emotion_obj.id,
        emotion_score=emotion_score,
        message=req.message,
        created_at=datetime.now()
    )
    db.add(student_emotion)
    db.commit()

    if risk_level in ["medium", "high"]:
        counselors = db.query(User).filter(User.role.has(name="counselor")).all()
        for counselor in counselors:
            db.add(EmotionNotification(
                student_id=req.user_id,
                counselor_id=counselor.id,
                student_emotion_id=student_emotion.id,
                risk_level=risk_level,
                message=req.message,
                created_at=datetime.now()
            ))
        db.commit()

    log_chat_interaction(req.message, system_response, emotion_label, emotion_score)
    log_alert_if_needed(req.message, emotion_label, emotion_score)

    return ChatResponse(
        message=system_response,
        emotion=emotion_label,
        emotion_score=emotion_score,
        risk_level=risk_level
    )

def classify_risk(label: str, score: float) -> str:
    if label in ["anger", "sadness", "fear", "disgust"]:
        if score > 0.75:
            return "high"
        elif score > 0.5:
            return "medium"
        else:
            return "low"
    return "none"
