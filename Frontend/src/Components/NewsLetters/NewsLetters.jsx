import React from 'react'

const NewsLetters = () => {
  return (
    <div className='text-center'>
      <h1 className='font-semibold text-gray-700 text-4xl md:text-5xl p-5 pb-0 mt-10'>Get Exclusive Offers on Your Email</h1>
      <p className='text-2xl font-semibold text-gray-600 m-5'>Subscribe to our newsletter and stay updated.</p>
      <div className="flex items-center border border-gray-400 rounded-full w-80 md:w-150 mx-auto mt-9 mb-20 overflow-hidden">

        <input
          type="email"
          placeholder="Your Email Id"
          className="flex-1 px-4 py-2 outline-none"
        />

        <button className="bg-gray-900 text-white px-8 py-2 rounded-3xl cursor-pointer -ml-4">
          Subscribe
        </button>

      </div>
    </div>
  )
}

export default NewsLetters