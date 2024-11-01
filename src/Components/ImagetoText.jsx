import React, { useState } from 'react';
import Textarea from './Textarea';
import Input from './Input';



function ImagetoText() {
  const [translatedText, setTranslatedText] = useState('');
  const [Text, setText] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle file upload and OCR process
  async function processImg(img,lang) {
    setLoading(true)
    const formData = new FormData();
    formData.append('image', img);
    formData.append('lang', lang);

    try {
      const response = await fetch('https://languz-server.onrender.com/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error processing image');
      }

      const data = await response.json();
      setText(data.text); // Display recognized text
      setTranslatedText(data.translatedText);
      setLoading(false)
    } catch (error) {
      setError('Error processing image or language not detected.');
      console.error(error);
    }
  }

  return (
    <div className='h-[600px] pt-28' >
      <h2 className='text-3xl font-semibold text-center m-4 mb-20'>Image text translator</h2>
     

      <Input uploadImage={processImg} />

      {loading && (
        <div className="flex items-center justify-center mt-5">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          <p className="ml-2 text-blue-500 font-semibold">Translating... Please wait</p>
        </div>
      )}


      {error && <p className='text-center text-red-800'>{error}</p>}

     {Text ? <Textarea heading="Image Your Text" text={Text} /> : null }
     {translatedText ? <Textarea heading="Translated" text={translatedText} /> : null }

     
    </div>
  );
}

export default ImagetoText;
