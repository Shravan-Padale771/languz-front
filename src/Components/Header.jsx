import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='fixed w-full bg-slate-800 shadow-slate-300 bg-opacity-90 shadow-md backdrop-blur-md'>
        <nav className='flex items-center justify-between mx-40 max-md:mx-5 h-[80px]'>
            <span className='text-white text-4xl font-bold max-md:text-3xl'>
            <Link to="/" className="hover:text-gray-300">
            Languz
          </Link>
            </span>
            <div className='flex gap-12 max-md:gap-6 text-white font-semibold '>
            <p className='justify-between float-right  max-md:font-light '>
            <Link to="/TexttoText" className="hover:text-gray-300 ">
            Translate Text
          </Link>
            </p>
            <p className='max-md:text-sm max-md:font-light '>
            <Link to="/ImagetoText" className="hover:text-gray-300">
            Translate Image
          </Link>
            </p>
            </div>
        </nav>
    </div>
  )
}

export default Header