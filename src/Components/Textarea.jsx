import React from 'react';

function Textarea(props) {
  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <h2 className='text-2xl font-semibold p-2 mt-10 mb-2'>{props.heading} :</h2>
      <textarea
        readOnly
        value={props.text} // Use the value prop to control the text area
        className='bg-gray-200 h-[260px] w-3/4 rounded-xl border-gray-200 border-8 resize-none outline-none p-4'
        name="text"
      />
    </div>
  );
}

export default Textarea;
