# backend/student_routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import StudentEmotion, ChatLog, Emotion, Topic
from typing import List

router = APIRouter()

@router.get("/{user_id}/chat-history")
def get_chat_history(user_id: int, db: Session = Depends(get_db)):
    chats = db.query(ChatLog).filter(ChatLog.student_id == user_id).order_by(ChatLog.created_at.desc()).all()
    result = []
    for chat in chats:
        topic = db.query(Topic).filter(Topic.id == chat.topic_id).first()
        emotion_label = db.query(Emotion.label).filter(Emotion.id == chat.emotion_id).scalar()
        result.append({
            "timestamp": chat.created_at,
            "topic": topic.name if topic else None,
            "question": chat.question,
            "system_feedback": chat.system_feedback,
            "emotion": emotion_label
        })
    return result

@router.get("/{user_id}/emotions")
def get_student_emotions(user_id: int, db: Session = Depends(get_db)):
    emotions = db.query(StudentEmotion).filter(StudentEmotion.student_id == user_id).order_by(StudentEmotion.created_at.desc()).all()
    result = []
    for emo in emotions:
        label = db.query(Emotion.label).filter(Emotion.id == emo.emotion_id).scalar()
        result.append({
            "timestamp": emo.created_at,
            "emotion": label,
            "score": float(emo.emotion_score),
            "message": emo.message
        })
    return result
