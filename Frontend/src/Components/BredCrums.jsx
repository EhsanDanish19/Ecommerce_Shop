import React from 'react'
import arrow_icon from '../assets/arrow-icon.png'

const BredCrums = (props) => {
    const {product} = props;
  return (
    <div className='flex items-center justify-center mt-8 text-lg font-semibold'>
      Home<img className='h-5 mt-1' src={arrow_icon} alt=''/>SHOP<img className='h-5 mt-1 ' src={arrow_icon} alt=''/>{product.category}<img className='h-5 mt-1 ' src={arrow_icon} alt=''/>{product.name}<img className='h-5 mt-1 ' src={arrow_icon} alt=''/>
    </div>
  )
}

export default BredCrums
