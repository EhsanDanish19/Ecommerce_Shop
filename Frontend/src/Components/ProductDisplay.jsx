import React from 'react'
import star_icon from '../assets/star_icon.png'
import star_half_icon from '../assets/star_half_icon.png'
const ProductDisplay = (props) => {
  const { product } = props;
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 p-10 md:mx-5 lg:mx-30 mb-5'>
      {/* Left Side */}
      <div className='flex '>
        <div className=''>
          <img className=' h-30' src={product.image} alt="" />
          <img className='my-5 h-30' src={product.image} alt="" />
          <img className=' h-30' src={product.image} alt="" />
        </div>
        <div>
          <img className=' ml-5 h-100' src={product.image} alt='' />
        </div>
      </div>
      {/* Right Side */}
      <div className='md:col-span-2 mt-5 md:mt-[-10px] lg:mt-[-35px] px-5 md:ml-10 items-center'>
        <h1 className='lg:mt-7 text-4xl font-bold'>{product.name}</h1>
        <div className='flex gap-1 py-2'>
          <img className='h-7 p-1' src={star_icon} alt='' />
          <img className='h-7 p-1' src={star_icon} alt='' />
          <img className='h-7 p-1' src={star_icon} alt='' />
          <img className='h-7 p-1' src={star_icon} alt='' />
          <img className='h-7 p-1' src={star_half_icon} alt='' />
          <p className='font-bold'>(130)</p>
        </div>
        <div className='flex gap-5 font-bold'>
          <p className='text-gray-500 line-through'>
            Rs : {product.old_price}
          </p>
          <p className='text-red-500'>
            Rs : {product.new_price}
          </p>
        </div>
        <div>
          <p className='text-md font-semibold'>You can find various styles of half-star icons in PNG format on these popular platforms:
            UXWing: Offers a clean yellow half-star icon available for download in PNG (up to 512px) and SVG formats.</p>
        </div>
        <div>
          <h1 className='text-xl font-bold text-gray-700 py-1 mb-2'>Select Size</h1>
          <div className='flex flex-row pb-2 gap-3 md:gap-2 lg:gap-4 xl:gap-10'>
            <div className='border border-gray-500 shadow-xl py-1  text-center w-10 flex-shrink-0'><span>S</span></div>
            <div className='border border-gray-500 shadow-lx py-1  text-center  w-10 h-10 flex-shrink-0'>M</div>
            <div className='border border-gray-500 shadow-xl py-1  text-center w-10 flex-shrink-0'>L</div>
            <div className='border border-gray-500 shadow-xl py-1  text-center w-10 flex-shrink-0'>XL</div>
            <div className='border border-gray-500 shadow-xl py-1  text-center w-10 flex-shrink-0'>XXL</div>
          </div>
          <button className='bg-orange-600 w-full lg:w-[400px] p-2 text-white font-semibold text-xl hover:bg-orange-500 cursor-pointer my-2 outline-none'>ADD TO CART</button>
        </div>
        <div>
          <span>Category: <span>Women, T_Shirt , Crop Top</span></span>
        </div>
        <div>
          <span>Tags: <span>Modern , Latest , Trend Shop</span></span>
        </div>
      </div>

    </div>
  )
}

export default ProductDisplay
