import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password);

    try {
      const response = await axios.post('/api/translate', formData, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'translated.md');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error translating the file', error);
    }
  };

  return (
    <div>
      <h1>Upload .md File for Translation</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".md" onChange={handleFileChange} required />
        <input type="password" placeholder="Password" onChange={handlePasswordChange} required />
        <button type="submit">Translate</button>
      </form>
    </div>
  );
}
