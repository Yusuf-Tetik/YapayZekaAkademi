# backend/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config import DATABASE_URL

# SQLAlchemy engine kurulumu
engine = create_engine(DATABASE_URL)

# Session oluşturucu
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base sınıfı
Base = declarative_base()

# DB bağlantısı dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Uygulama başlatıldığında çağrılan tablo oluşturucu
def create_tables():
    from models import (
        User, Role, Subject, Topic,
        Emotion, StudentEmotion, ChatLog,
        EmotionNotification, LoginAudit
    )
    Base.metadata.create_all(bind=engine)
