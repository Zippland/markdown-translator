import os
from flask import Flask, send_file, request, jsonify
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

app = Flask(__name__)
app.config["DEBUG"] = True

@app.route('/api/download', methods=['GET'])
def download():
    file_path = request.args.get('file')
    if not file_path or not os.path.exists(file_path):
        return jsonify({'error': 'File not found'}), 404

    return send_file(file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
