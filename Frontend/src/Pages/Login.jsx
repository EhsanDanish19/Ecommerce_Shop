import React from 'react'
import bgImage from '../assets/register_banner.avif'
import bg from '../assets/bg.webp'
const Login = () => {
  return (
    <div className='py-15 bg-center bg-cover bg-no-repeat mb-15 h-screen' style={{ backgroundImage: `url(${bgImage})` }}
>
    <div className='p-10 border-2 border-gray-500 rounded-xl mx-5 md:mx-55 lg:mx-150 ' style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className='font-bold text-4xl text-green-900'>Sign Up</h1>
      <div className='flex flex-col my-4'>
        <input className='border-1  border-gray-500 rounded-md outline-none focus:bg-gray-300 my-2 pl-4 py-1' type="text" placeholder='Enter User Name' />
        <input className='border-1  border-gray-500 rounded-md outline-none focus:bg-gray-300 my-2 pl-4 py-1' type="text" placeholder='Enter Your Email' />
        <input className='border-1  border-gray-500 rounded-md outline-none focus:bg-gray-300 my-2 pl-4 py-1' type="password" placeholder='Enter Password' />
        <input className='border-1  border-gray-500 rounded-md outline-none focus:bg-gray-300 my-2 pl-4 py-1' type="password" placeholder='Confirm Password'/>
        <button className='border-1 rounded-full bg-red-500 mx-auto cursor-pointer py-1 px-8 my-2 mt-3 hover:bg-red-400'>Register</button>
      </div>
      <p className='font-semibold'>Already have an account ? <span className='text-blue-600 font-semibold'>Login Here</span></p>
    </div>
    </div>
  )
}

export default Login
Login