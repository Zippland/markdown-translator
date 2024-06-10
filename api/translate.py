import os
import openai
import json
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import tempfile

app = Flask(__name__)
app.config["DEBUG"] = True
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/api/translate', methods=['POST'])
def translate():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    content = file.read().decode('utf-8')

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"Translate the following markdown content to Chinese:\n\n{content}"}
            ],
            max_tokens=4096,
        )

        translated_content = response.choices[0].message['content'].strip()

        translated_file_path = os.path.join(tempfile.gettempdir(), f"translated_{filename}")
        with open(translated_file_path, 'w', encoding='utf-8') as f:
            f.write(translated_content)

        return jsonify({'translated_file_path': translated_file_path})
    except Exception as e:
        app.logger.error(f"Error during translation: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
