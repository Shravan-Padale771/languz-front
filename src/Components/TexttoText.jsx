import React, { useState } from 'react';
import Textarea from './Textarea';
import Textupload from './Textupload';
import Footer from './Footer';

function TexttoText() {
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function processText(text,lang) {
    const formData = new FormData();
    formData.append('text', text);
    formData.append('lang', lang);
  
    try {
      const response = await fetch('http://localhost:5000/api/uploadText', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error processing text: ${errorData.message || 'Unknown error'}`);
      }
  
      const data = await response.json();
    //   console.log('Received translated text:', data.translatedText); // Log the translated text
      setTranslatedText(data.translatedText); // Update translated text
    } catch (error) {
      setError('Error processing text. Please try again.');
      console.error(error);
    }
  }
  

  return (
    <div className='pt-28'>
      <Textupload textProcess={processText} heading="text to text" />
      {error ? <p className='text-center text-red-800'>{error}</p> : null} 
      {translatedText && <Textarea heading="Translated" text={translatedText} />}
      

      <Footer/>
    </div>
  );
  
  
}

export default TexttoText;
