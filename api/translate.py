from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)

openai.api_key = os.getenv('OPENAI_API_KEY')

@app.route('/api/translate', methods=['POST'])
def translate():
    data = request.json
    content = data['content']

    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": f"Translate the following Markdown content to Chinese:\n\n{content}"}
        ]
    )

    translated_content = response.choices[0].message['content'].strip()
    return jsonify(translated_content)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
