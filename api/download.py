import os
from flask import Flask, send_file, request, jsonify

app = Flask(__name__)

@app.route('/api/download', methods=['GET'])
def download():
    file_path = request.args.get('file')
    if not file_path or not os.path.exists(file_path):
        return jsonify({'error': 'File not found'}), 404

    return send_file(file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
