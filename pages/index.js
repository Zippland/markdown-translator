import { useState } from 'react';
import axios from 'axios';
import { Formik, Form } from 'formik';

export default function Home() {
  const [translatedFile, setTranslatedFile] = useState(null);

  const handleFileUpload = async (values) => {
    const formData = new FormData();
    formData.append('file', values.file);

    const response = await axios.post('/api/translate', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const blob = new Blob([response.data], { type: 'text/markdown' });
    setTranslatedFile(URL.createObjectURL(blob));
  };

  return (
    <div>
      <h1>Upload Markdown File for Translation</h1>
      <Formik
        initialValues={{ file: null }}
        onSubmit={handleFileUpload}
      >
        {({ setFieldValue }) => (
          <Form>
            <input
              id="file"
              name="file"
              type="file"
              onChange={(event) => {
                setFieldValue("file", event.currentTarget.files[0]);
              }}
            />
            <button type="submit">Upload</button>
          </Form>
        )}
      </Formik>
      {translatedFile && (
        <a href={translatedFile} download="translated.md">
          Download Translated File
        </a>
      )}
    </div>
  );
}
