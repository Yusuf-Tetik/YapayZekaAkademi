from fastapi import APIRouter, File, UploadFile, Form
from fastapi.responses import FileResponse
from app.services.speech_to_text import speech_to_text
from app.services.text_to_speech import text_to_speech
from pydub import AudioSegment
import os

router = APIRouter()

def convert_to_wav(input_path, output_path):
    audio = AudioSegment.from_file(input_path)
    audio.export(output_path, format="wav")
    return output_path

@router.post("/api/speech-to-text")
async def api_speech_to_text(audio: UploadFile = File(...)):
    temp_path = "temp_input"
    with open(temp_path, "wb") as f:
        f.write(await audio.read())

    # Sadece dosya uzantısına bakmak yeterli olmayabilir, dosya tipine göre dönüştür
    wav_path = "temp.wav"
    try:
        convert_to_wav(temp_path, wav_path)
        text = speech_to_text(wav_path)
    except Exception as e:
        # Eğer zaten wav ise veya dönüştürülemiyorsa direkt dene
        text = speech_to_text(temp_path)

    os.remove(temp_path)
    if os.path.exists(wav_path):
        os.remove(wav_path)
    return {"text": text}
from fastapi import APIRouter, File, UploadFile, Form
from fastapi.responses import FileResponse
from app.services.speech_to_text import speech_to_text
from app.services.text_to_speech import text_to_speech
from pydub import AudioSegment
import os

router = APIRouter()

def convert_to_wav(input_path, output_path):
    audio = AudioSegment.from_file(input_path)
    audio.export(output_path, format="wav")
    return output_path

@router.post("/api/speech-to-text")
async def api_speech_to_text(audio: UploadFile = File(...)):
    temp_path = "temp_input"
    with open(temp_path, "wb") as f:
        f.write(await audio.read())

    wav_path = "temp.wav"
    try:
        convert_to_wav(temp_path, wav_path)
        text = speech_to_text(wav_path)
    except Exception as e:
        text = speech_to_text(temp_path)

    os.remove(temp_path)
    if os.path.exists(wav_path):
        os.remove(wav_path)
    return {"text": text}

@router.post("/api/text-to-speech")
async def api_text_to_speech(text: str = Form(...)):
    output_path = "out.mp3"
    text_to_speech(text, output_path=output_path)
    return FileResponse(output_path, media_type="audio/mp3", filename="output.mp3")
