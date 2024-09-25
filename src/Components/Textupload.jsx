import React, { useState } from 'react';

function Textupload(props) {
  const [text, setText] = useState('');
  const [lang, setLang] = useState("hi")

  function handleSelector(event){
    setLang(event.target.value)

  }

  const handleChange = (event) => {
    const value = event.target.value;
    setText(value); // Update the state immediately


    // Trigger translation if a space is detected
    if (value.endsWith(' ')) {
      props.textProcess(value.trim(), lang); // Send the trimmed text for translation
    }
  };

  const handleKeyDown = (event) => {
    // Trigger translation on Enter key
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent new line on Enter
      props.textProcess(text.trim()); // Send the trimmed text for translation
    }
  };

  

  

  // Optional: Call the translation when input is submitted (if needed)
  const handleBlur = () => {
    if (text) {
      props.textProcess(text.trim());
    }
  };

  return (
    <div>
      <div className='flex flex-col w-full justify-center items-center my-6'>

      <form
        className='flex flex-col justify-center items-center h-max p-6 w-fit rounded-xl bg-gray-300 gap-6'
      >
        
        
        <span className='flex m-2'>
        <label className='block px-3 py-1' for="language">Choose a language :</label>
        <select
        onChange={handleSelector}
        className="ml-1 px-3 py-1 text-center rounded-lg"
        id="language" name="language">
            <option value="hi">Hindi</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
           
        </select>
        </span>



      </form>



        <h2 className='text-2xl font-semibold p-2 mt-10 mb-2 '>{props.heading} :</h2>
        <textarea
          placeholder='spacebar to reflect changes'
          name="text"
          value={text} // Ensure textarea reflects current state
          onChange={handleChange}
          onKeyDown={handleKeyDown} // Listen for key down events
          onBlur={handleBlur} // Trigger on blur
          className='bg-gray-200 h-[260px] w-3/4 rounded-xl border-gray-200 border-8 resize-none outline-none p-4'
        />
      </div>
    </div>
  );
}

export default Textupload;

