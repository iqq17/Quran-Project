from flask import Flask, request, jsonify
from flask_cors import CORS
import speech_recognition as sr
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)
CORS(app)

# Load your trained model here
model = load_model('path_to_your_model.h5')

@app.route('/get_feedback', methods=['POST'])
def get_feedback():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    audio_file = request.files['audio']
    surah = request.form.get('surah')
    verse = request.form.get('verse')

    # Convert audio to text
    r = sr.Recognizer()
    with sr.AudioFile(audio_file) as source:
        audio = r.record(source)
    try:
        text = r.recognize_google(audio, language='ar-AR')
    except sr.UnknownValueError:
        return jsonify({'error': 'Could not understand audio'}), 400

    # Process the text and get AI feedback
    # This is a placeholder for your actual AI processing
    feedback = process_recitation(text, surah, verse)

    return jsonify({'feedback': feedback})

def process_recitation(text, surah, verse):
    # This is where you would implement your AI logic
    # For now, we'll return a placeholder response
    return f"Your recitation of Surah {surah}, Verse {verse} was processed. The AI model suggests focusing on improving your tajweed in the following areas: [placeholder for specific feedback]"

if __name__ == '__main__':
    app.run(debug=True)
