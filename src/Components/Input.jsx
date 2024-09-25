import React, { useState } from 'react';

function Input(props) {
  const [img, setImg] = useState(null); // Store the image file
  const [lang, setLang] = useState("hi")

  // Handle file input change
  function handleChange(event) {
    const file = event.target.files[0]; // Access the first file from input
    setImg(file); // Set the file to state
  }

  function handleSelector(event){
    const value = event.target.value
    setLang(value)


  }
  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    if (img) {
      props.uploadImage(img,lang); // Call parent function to process image
    } else {
      alert('Please select an image to upload.'); // Alert if no file is selected
    }
  }

  return (
    <div className='flex justify-center items-center w-full h-max my-6'>
      <form
        onSubmit={handleSubmit} // Change from onClick to onSubmit
        className='flex flex-col justify-center items-center h-max p-5 w-fit rounded-xl bg-gray-300 gap-6'
        encType="multipart/form-data"
      >
        <input
          onChange={handleChange}
          className='border p-4 rounded-lg border-slate-500'
          type="file"
          name="image"
          accept="image/*" // Restrict to image file types
        />
        
        <span className='flex m-2'>
        <label className='block px-3 py-1' for="language">Choose a language :</label>
        <select
        onChange={handleSelector}
        className="ml-1 px-3 py-1 text-center rounded-lg"
        id="language" name="language">
            <option value="hi">Hindi</option>
            <option value="eng">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
           
        </select>
        </span>



        <button
          className='px-4 py-2 bg-gray-900 rounded-xl text-white mt-6'
          type="submit"
        >
          Upload
        </button>


      </form>
    </div>
  );
}

export default Input;
