import React from 'react'
import arrow_icon from '../assets/arrow-icon.png'

const BredCrums = (props) => {
    const {product} = props;
  return (
    <div>
      Home<img className='h-30' src={arrow_icon} alt=''/>Shop<img className='h-30' src={arrow_icon} alt=''/>{product.category}<img className='h-30' src={arrow_icon} alt=''/>{product.name}<img className='h-30' src={arrow_icon} alt=''/>
    </div>
  )
}

export default BredCrums
