import React from 'react'
import Item from '../Item/Item'
import data_product from '../../assets/data'

const Popular = () => {
  return (
    <div className='flex items-center flex-col pb-15 pt-15 bg-gradient-to-b from-gray-200 to-green-300'>
      <h1 className='text-gray-800 text-3xl md:text-4xl lg:text-5xl font-bold'>
      POPULAR IN WOMEN
      </h1>
      <hr className='w-55 border-2 border-gray-500 mt-1' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] mt-10 mx-10 md:mx-30 md:mt-10 xl:xm-70 xl:mt-10'>
        {data_product.map((item,i) =>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default Popular
