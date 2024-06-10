import { IncomingForm } from 'formidable';
import fs from 'fs';
import axios from 'axios';

export const config = {
  api: {
    bodyParser: false,
  },
};

const translate = async (req, res) => {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    const filePath = files.file.filepath;
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    try {
      const response = await axios.post('http://localhost:8000/api/translate', {
        content: fileContent,
      });

      res.setHeader('Content-Type', 'text/markdown');
      res.status(200).send(response.data);
    } catch (error) {
      res.status(500).send(error);
    }
  });
};

export default translate;
