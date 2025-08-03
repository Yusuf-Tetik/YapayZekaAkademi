# backend/teacher_routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User, StudentEmotion, Emotion, EmotionNotification
from typing import List

router = APIRouter()

@router.get("/students", response_model=List[dict])
def get_all_students(db: Session = Depends(get_db)):
    students = db.query(User).filter(User.role.has(name="student")).all()
    return [{
        "id": s.id,
        "name": s.name,
        "email": s.email
    } for s in students]

@router.get("/student/{student_id}/emotions")
def get_student_emotions(student_id: int, db: Session = Depends(get_db)):
    logs = db.query(StudentEmotion).filter(StudentEmotion.student_id == student_id).order_by(StudentEmotion.created_at.desc()).all()
    return [
        {
            "timestamp": log.created_at,
            "emotion": db.query(Emotion.label).filter(Emotion.id == log.emotion_id).scalar(),
            "score": float(log.emotion_score),
            "message": log.message
        }
        for log in logs
    ]

@router.get("/notifications")
def get_notifications(db: Session = Depends(get_db)):
    notifications = db.query(EmotionNotification).order_by(EmotionNotification.created_at.desc()).all()
    result = []
    for n in notifications:
        student = db.query(User).filter(User.id == n.student_id).first()
        result.append({
            "timestamp": n.created_at,
            "student_name": student.name if student else "Unknown",
            "emotion": db.query(Emotion.label).join(StudentEmotion, Emotion.id == StudentEmotion.emotion_id).filter(StudentEmotion.id == n.student_emotion_id).scalar(),
            "risk_level": n.risk_level,
            "message": n.message
        })
    return result
