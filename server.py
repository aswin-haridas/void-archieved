from flask import Flask, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)



OLLAMA_API_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "gemma2:2b"


if __name__ == '__main__':
    app.run(debug=True, port=3000)
