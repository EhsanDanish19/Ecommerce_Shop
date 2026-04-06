import React from 'react'
import offer from "../../assets/offer.png"
const Offer = () => {
  return (
    <div className='grid grid-cols md:grid-cols-2 direction-col justify-center items-center pt-10 lg:pl-40 bg-green-100'>
      <div className='pl-20'>
      <h1 className='text-[#324232] text-5xl font-bold'>Exclusive</h1>
      <h1 className='text-[#324232] text-5xl font-bold'>Offers For You</h1>
      <p className='text-sl font-bold text-[#424242]'>ONLY ON BEST SELLERS PRODUCTS</p>
      <button className='bg-red-500 rounded-2xl mt-3 text-white w-30 h-8 text-sm'>Check Now</button>
      </div>
      <div className='mt-3 lg:ml-20 pl-20'>
      <img src={offer} alt='' className='w-70'/>
      </div>
    </div>
  )
}

export default Offer
