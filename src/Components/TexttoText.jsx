import React, { useState } from 'react';
import Textarea from './Textarea';
import Textupload from './Textupload';
import Footer from './Footer';

function TexttoText() {
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function processText(text,lang) {
    setLoading(true)
    setError("")
    const formData = new FormData();
    formData.append('text', text);
    formData.append('lang', lang);
  
    try {
      const response = await fetch('https://languz-server.onrender.com/api/uploadText', {
        method: 'POST',
        body: formData,
      });

      const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server did not return JSON');
    }
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error processing text: ${errorData.message || 'Unknown error'}`);
      }
  
      const data = await response.json();
    //   console.log('Received translated text:', data.translatedText); // Log the translated text
      setTranslatedText(data.translatedText); // Update translated text
      setLoading(false)
    } catch (error) {
      setError('Keep typing or Please try again.');
      console.error(error);
    }
  }
  

  return (
    <div className='pt-28'>
      <Textupload textProcess={processText} heading="text to text" />
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

      {error ? <p className='text-center text-red-800'>{error}</p> : null} 

      {!loading && translatedText && (
      translatedText && <Textarea heading="Translated" text={translatedText} />
      )}
      

      <Footer/>
    </div>
  );
  
  
}

export default TexttoText;
