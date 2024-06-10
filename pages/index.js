// pages/index.js
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [translatedFilePath, setTranslatedFilePath] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/translate', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setTranslatedFilePath(data.translatedFilePath);
  };

  return (
    <div>
      <h1>GPT Markdown Translator</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".md" />
        <button type="submit">Upload and Translate</button>
      </form>
      {translatedFilePath && (
        <div>
          <h2>Translated File</h2>
          <a href={`/api/download?file=${translatedFilePath}`} download>Download Translated File</a>
        </div>
      )}
    </div>
  );
}
