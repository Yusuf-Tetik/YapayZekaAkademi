# backend/auth.py
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from models import User, Role
from database import get_db
from config import PASSWORD_HASH_SCHEME

router = APIRouter()

pwd_context = CryptContext(schemes=[PASSWORD_HASH_SCHEME], deprecated="auto")

class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role_name: str = "student"

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/register")
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    normalized_email = req.email.lower()
    existing_user = db.query(User).filter(User.email == normalized_email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    role = db.query(Role).filter(Role.name == req.role_name).first()
    if not role:
        role = Role(name=req.role_name)
        db.add(role)
        db.commit()
        db.refresh(role)

    hashed_password = pwd_context.hash(req.password)
    user = User(
        name=req.name,
        email=normalized_email,
        password_hash=hashed_password,
        role_id=role.id
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User registered successfully", "user_id": user.id}

@router.post("/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    normalized_email = req.email.lower()
    user = db.query(User).filter(User.email == normalized_email).first()
    if not user or not pwd_context.verify(req.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "user_id": user.id, "role": user.role.name}
