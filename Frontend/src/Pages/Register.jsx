import React, { useState } from 'react'
import { BASE_URL } from '../api';
import bgImage from '../assets/register_banner.avif'
import bg from '../assets/bg.webp'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match")
            return
        }

        try {
            const res = await axios.post(
                `${BASE_URL}/api/register/`,
                {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }
            )
            alert("Registration Successful")

        } catch (error) {
                 console.log("ERROR:", error.response?.data || error.message)

            alert("Something went wrong")
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='py-15 bg-center bg-cover bg-no-repeat mb-15 h-screen' style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className='p-10 border-2 border-gray-500 rounded-xl mx-5 md:mx-55 lg:mx-150 ' style={{ backgroundImage: `url(${bg})` }}
                >
                    <h1 className='font-bold text-4xl text-green-900'>Sign Up</h1>
                    <div className='flex flex-col my-4'>
                        <input className='border-1  border-gray-500 rounded-md outline-none focus:bg-gray-300 my-2 pl-4 py-1' type="text" placeholder='Enter User Name' onChange={handleChange} name="username" />

                        <input className='border-1  border-gray-500 rounded-md outline-none focus:bg-gray-300 my-2 pl-4 py-1' type="email" placeholder='Enter Your Email' onChange={handleChange} name="email" />

                        <input className='border-1  border-gray-500 rounded-md outline-none focus:bg-gray-300 my-2 pl-4 py-1' type="password" placeholder='Enter Password' onChange={handleChange} name="password" />

                        <input className='border-1  border-gray-500 rounded-md outline-none focus:bg-gray-300 my-2 pl-4 py-1' type="password" placeholder='Confirm Password' onChange={handleChange} name="confirmPassword" />

                        <button className='border-1 rounded-full bg-red-500 mx-auto cursor-pointer py-1 px-8 my-2 mt-3 hover:bg-red-400' type='submit'>Register</button>
                    </div>

                    <p className='font-semibold'>Already have an account ?
                    <Link to={'/login'} >
                     <span className='text-blue-600 font-semibold'>Login Here</span>
                     </Link>
                     </p>
                </div>
            </div>
        </form>
    )
}

export default Register
