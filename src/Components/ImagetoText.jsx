import React, { useState } from 'react';
import Textarea from './Textarea';
import Input from './Input';



function ImagetoText() {
  const [translatedText, setTranslatedText] = useState('');
  const [Text, setText] = useState('');
  const [error, setError] = useState(null);

  // Function to handle file upload and OCR process
  async function processImg(img,lang) {
    const formData = new FormData();
    formData.append('image', img);
    formData.append('lang', lang);

    try {
      const response = await fetch('https://languz-server-production.up.railway.app/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error processing image');
      }

      const data = await response.json();
      setText(data.text); // Display recognized text
      setTranslatedText(data.translatedText);
    } catch (error) {
      setError('Error processing image or language not detected.');
      console.error(error);
    }
  }

  return (
    <div className='h-[600px] pt-28' >
      <h2 className='text-3xl font-semibold text-center m-4 mb-20'>Image text translator</h2>
     

      <Input uploadImage={processImg} />
      {error && <p className='text-center text-red-800'>{error}</p>}
     {Text ? <Textarea heading="Image Your Text" text={Text} /> : null }
     {translatedText ? <Textarea heading="Translated" text={translatedText} /> : null }

     
    </div>
  );
}

export default ImagetoText;
