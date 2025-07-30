from fastapi import FastAPI
from app.routes import audio

app = FastAPI()
app.include_router(audio.router)
