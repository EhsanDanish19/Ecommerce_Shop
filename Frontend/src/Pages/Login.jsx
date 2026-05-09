import React, { useState } from 'react'
import bgImage from '../assets/register_banner.avif'
import bg from '../assets/bg.webp'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../api'

const Login = () => {

  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        `${BASE_URL}/api/login/`,
        loginData
      )

      console.log(res.data)

      localStorage.setItem(
        'token',
        res.data.access
      )
      alert('Login Successful')

    } catch (error) {
      console.log("ERROR:",error.res?.data)
          alert("Invalid username or password")

    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='py-15 bg-center bg-cover bg-no-repeat mb-15 h-screen' style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className='p-10 border-2 border-gray-500 rounded-xl mx-5 md:mx-55 lg:mx-150 ' style={{ backgroundImage: `url(${bg})` }}
        >
          <h1 className='font-bold text-4xl text-green-900'>Login</h1>
          <div className='flex flex-col my-4'>
            <input className='border-1  border-gray-500 rounded-md outline-none focus:bg-gray-300 my-2 pl-4 py-1' type="text" placeholder='Enter User Name' name='username' onChange={handleChange} />

            <input className='border-1  border-gray-500 rounded-md outline-none focus:bg-gray-300 my-2 pl-4 py-1' type="password" placeholder='Enter Password' name='password' onChange={handleChange} />

            <button className='border-1 rounded-full bg-red-500 mx-auto cursor-pointer py-1 px-8 my-2 mt-3 hover:bg-red-400' type='submit'>Login</button>
          </div>
          <p className='font-semibold'>Don't have an account ? <span className='text-blue-600 font-semibold'>Register Here</span></p>
        </div>
      </div>
    </form>
  )
}

export default Login