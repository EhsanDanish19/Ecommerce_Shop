import React from 'react'
import Item from '../Item/Item'
import new_collections from '../../assets/newcollections'

const NewCollection = () => {
  return (
    <div className='flex flex-col items-center '>
      <h1 className='flex mt-5 text-center text-3xl md:text-4xl lg:text-5xl font-bold'>NEW COLLECTIONS</h1>
      <hr className='w-55 border-2 border-gray-500'/>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-5 gap-5 w-50 md:w-150 lg:w-250'>
      {new_collections.map((item,i)=>{
        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />

      })}
      </div>
    </div>
  )
}

export default NewCollection
