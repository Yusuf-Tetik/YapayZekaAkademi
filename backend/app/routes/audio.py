from fastapi import APIRouter, File, UploadFile, Form
from fastapi.responses import FileResponse
from app.services.speech_to_text import speech_to_text
from app.services.text_to_speech import text_to_speech
import os

router = APIRouter()

@router.post("/api/speech-to-text")
async def api_speech_to_text(audio: UploadFile = File(...)):
    temp_path = "temp.wav"
    with open(temp_path, "wb") as f:
        f.write(await audio.read())
    text = speech_to_text(temp_path)
    os.remove(temp_path)
    return {"text": text}

@router.post("/api/text-to-speech")
async def api_text_to_speech(text: str = Form(...)):
    output_path = "out.mp3"
    text_to_speech(text, output_path=output_path)
    return FileResponse(output_path, media_type="audio/mp3", filename="output.mp3")
