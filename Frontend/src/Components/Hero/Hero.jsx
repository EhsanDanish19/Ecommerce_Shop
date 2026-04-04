import React from 'react'
import HeroImg from '../../assets/shoping.jpg'
const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row p-6 bg-gradient-to-b from-green-300 to-gray-200 items-center justify-between">
      {/* Left Side */}
      <div className='md:w-1/2 p-10'>
        <h1 className='text-3xl md:text-5xl font-bold'>
        Welcome to Shop.
        </h1>
        <p className='mt-4 text-gray-600'>
          Best products at amazing prices.
        </p>
        <button className='mt-6 px-6 py-2 bg-red-500 text-white rounded-lg'>
        shop now
        </button>
      </div>
      {/* Right Side */}
      <div className='md:w-1/2 mt-6 md:mt-0 flex justify-center'>
      <img src={HeroImg} alt='' className='w-80 md:w-120 rounded-xl'/>
      </div>
    </div>
  )
}

export default Hero
