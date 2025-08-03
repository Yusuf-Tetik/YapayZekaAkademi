# backend/admin_routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import User, Role, Subject, Topic
from typing import List

router = APIRouter()

@router.get("/users", response_model=List[dict])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return [
        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role.name if user.role else None
        }
        for user in users
    ]

@router.get("/roles", response_model=List[dict])
def get_all_roles(db: Session = Depends(get_db)):
    roles = db.query(Role).all()
    return [
        {
            "id": role.id,
            "name": role.name
        }
        for role in roles
    ]

@router.post("/role")
def create_role(name: str, db: Session = Depends(get_db)):
    existing = db.query(Role).filter(Role.name == name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Role already exists")
    role = Role(name=name)
    db.add(role)
    db.commit()
    return {"message": "Role created successfully", "role_id": role.id}

@router.get("/subjects", response_model=List[dict])
def get_subjects(db: Session = Depends(get_db)):
    subjects = db.query(Subject).all()
    return [
        {"id": s.id, "name": s.name}
        for s in subjects
    ]

@router.post("/subjects")
def create_subject(name: str, db: Session = Depends(get_db)):
    existing = db.query(Subject).filter(Subject.name == name).first()
    if existing:
        raise HTTPException(status_code=400, detail="Subject already exists")
    subject = Subject(name=name)
    db.add(subject)
    db.commit()
    return {"message": "Subject created", "subject_id": subject.id}

@router.get("/topics/{subject_id}", response_model=List[dict])
def get_topics(subject_id: int, db: Session = Depends(get_db)):
    topics = db.query(Topic).filter(Topic.subject_id == subject_id).all()
    return [
        {"id": t.id, "name": t.name}
        for t in topics
    ]

@router.post("/topics")
def create_topic(subject_id: int, name: str, db: Session = Depends(get_db)):
    topic = Topic(subject_id=subject_id, name=name)
    db.add(topic)
    db.commit()
    return {"message": "Topic created", "topic_id": topic.id}
