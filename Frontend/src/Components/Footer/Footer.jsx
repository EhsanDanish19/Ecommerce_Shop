import React from 'react'
import footer_logo from '../../assets/logo.png'
import instagram from '../../assets/intagram.png'
import tiktok from '../../assets/tiktok.avif'
import whatsappp from '../../assets/whatsapp.webp'
import facebook from '../../assets/facebook.avif'
const Footer = () => {
  return (
    <div className='flex flex-col items-center p-5 pt-0'>
      <div className='flex items-center font-bold text-5xl gap-4'>
      <img src={footer_logo} alt='' className='w-15'/>
        <h1>Shopify</h1>
      </div>
      <div className='p-5 m-5'>
        <ul className='flex gap-3 md:gap-12 text-2xl font-semibold'>
            <li>About</li>
            <li>Product</li>
            <li>Offices</li>
            <li>Contact</li>
        </ul>
      </div>
      <div className='flex gap-5'>
        <img src={instagram} alt="" className='h-15' />
        <img src={tiktok} alt="" className='h-15'/>
        <img src={whatsappp} alt="" className='h-25 -mt-5 -ml-5'/>
        <img src={facebook} alt="" className='h-27 -mt-6 -ml-10'/>
      </div>
      <hr className='w-full md:w-150 lg:w-200 border-1 border-gray-500'/>
      <p className='m-5 text-lg font-semibold text-gray-700'>Copyright @ 2023 - All Right Reserved </p>
    </div>
  )
}

export default Footer
