import React from 'react'
import Item from '../Item/Item'
import data_product from '../../assets/data'

const Popular = () => {
  return (
    <div className='flex items-center flex-col pb-8 pt-5 bg-gradient-to-b from-gray-200 to-green-300'>
      <h1 className='text-[#171717] text-3xl md:text-4xl lg:text-5xl font-bold c-green'>
      POPULAR IN WOMEN
      </h1>
      <hr className='w-40' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] mt-[50px] w-50 md:w-150 lg:w-250'>
        {data_product.map((item,i) =>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default Popular
