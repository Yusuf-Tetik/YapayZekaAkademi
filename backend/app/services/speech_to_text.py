import speech_recognition as sr

def speech_to_text(audio_path, lang="tr-TR"):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio = recognizer.record(source)
        try:
            text = recognizer.recognize_google(audio, language=lang)
            return text
        except Exception as e:
            return ""
