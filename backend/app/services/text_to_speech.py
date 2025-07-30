from gtts import gTTS

def text_to_speech(text, lang="tr", output_path="out.mp3"):
    tts = gTTS(text=text, lang=lang)
    tts.save(output_path)
    return output_path
