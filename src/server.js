import express from 'express';
import multer from 'multer';
import {createWorker} from 'tesseract.js';
import translate from 'translate';
import cors from "cors"
import bodyParser from 'body-parser';
import { franc } from 'franc';




const app = express();
const port = 5000; // Or any port you prefer
app.use(cors()); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

translate.engine = 'google'; // Example setup, may need API key


// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Endpoint for file upload and processing
app.post('/api/upload', upload.single('image'), async (req, res) => {
  const lang = req.body.lang
  

 

    if (!req.file) {
        console.error('File not uploaded correctly.');
        return res.status(400).send('Error: No file uploaded.');
      }

  const imagePath = req.file.path;

  try {
    
    const worker = await createWorker('eng');
    const ret = await worker.recognize(imagePath);
    await worker.terminate();

    const detect = franc(ret.data.text)
    const translatedText = await translate(ret.data.text, { from:detect.substring(0,2), to: lang }); // Translating
    const text = ret.data.text

    res.json({ 
        translatedText : translatedText, 
        text : text
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing image.');
  }
});


app.post('/api/uploadText', upload.none(), async (req, res) => {
  const text = req.body.text;
  const lang = req.body.lang
  let detect = franc(text)

  if(detect.substring(0,2) === 'un'){
    detect = 'en'
  }else{
    detect = detect.substring(0,2)
  }

  //  console.log('Received text:', detect);

  if (!text) {
    return res.status(400).send({ message: 'No text provided for translation.' });
  }

  try {
    const translatedText = await translate(text, { from: detect,to: lang  });
    res.json({ translatedText });
  } catch (error) {
    console.error('Translation error:', error.message);
    res.status(500).send({ message: 'Error processing text.' });
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
