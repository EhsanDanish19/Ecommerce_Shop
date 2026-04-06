import React from 'react'

const Item = (props) => {
  return (
    <div className='pb-3 transform transition duration-300 hover:scale-110 justify-center items-center border-2 rounded-lg'>
      <img src={props.image} alt='' className='w-70 h-50 mx-auto rounded-tl-lg rounded-tr-lg  shadow-sm'/>
      <p className='ml-5 font-bold'>{props.name}</p>
      <div>
        <div className='ml-5 font-semibold text-sl text-gray-500'>
            Rs : {props.new_price}
        </div>
        <div className='ml-5 text-gray-500 text-sm font-semibold'>
            Rs : {props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item
