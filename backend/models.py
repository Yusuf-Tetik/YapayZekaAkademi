# backend/models.py
from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey, Text, Numeric
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Role(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True, nullable=False)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    role = relationship("Role")

class Subject(Base):
    __tablename__ = "subjects"
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)

class Topic(Base):
    __tablename__ = "topics"
    id = Column(Integer, primary_key=True)
    subject_id = Column(Integer, ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(100), nullable=False)

class Emotion(Base):
    __tablename__ = "emotions"
    id = Column(Integer, primary_key=True)
    label = Column(String(50), unique=True, nullable=False)
    description = Column(Text)

class StudentEmotion(Base):
    __tablename__ = "student_emotions"
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    emotion_id = Column(Integer, ForeignKey("emotions.id"), nullable=False)
    emotion_score = Column(Numeric(3, 2))
    message = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class ChatLog(Base):
    __tablename__ = "chat_logs"
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    topic_id = Column(Integer, ForeignKey("topics.id", ondelete="CASCADE"), nullable=False)
    question = Column(Text, nullable=False)
    student_answer = Column(Text)
    system_feedback = Column(Text)
    emotion_id = Column(Integer, ForeignKey("emotions.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

class EmotionNotification(Base):
    __tablename__ = "emotion_notifications"
    id = Column(Integer, primary_key=True)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    counselor_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    student_emotion_id = Column(Integer, ForeignKey("student_emotions.id"), nullable=False)
    risk_level = Column(String(10))
    message = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

class LoginAudit(Base):
    __tablename__ = "login_audit"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    ip_address = Column(String)
    user_agent = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
