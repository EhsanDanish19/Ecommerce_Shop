import React from 'react'
import star_icon from '../assets/star_icon.png'
import star_half_icon from '../assets/star_half_icon.png'
const ProductDisplay = (props) => {
  const { product } = props;
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 md:m-10'>
      {/* Left Side */}
      <div className='flex'>
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
      <div className=' p-5 md:ml-20 items-center'>
        <h1 className=''>{product.name}</h1>
        <div>
          <img className='h-6 p-1' src={star_icon} alt='' />
          <img className='h-6 p-1' src={star_icon} alt='' />
          <img className='h-6 p-1' src={star_icon} alt='' />
          <img className='h-6 p-1' src={star_icon} alt='' />
          <img className='h-6 p-1' src={star_half_icon} alt='' />
          <p>(130)</p>
        </div>
        <div>
          {product.old_price}
        </div>
        <div>
          {product.new_price}
        </div>
        <div>
          <p>You can find various styles of half-star icons in PNG format on these popular platforms:
            UXWing: Offers a clean yellow half-star icon available for download in PNG (up to 512px) and SVG formats for free personal or commercial use.</p>
        </div>
        <div>
          <h1>Select Size</h1>
          <div>
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
          <button>ADD TO CART</button>
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
