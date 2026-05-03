import React from 'react'
import Item from '../Components/Item/Item'

const RelatedProduct = ({ products }) => {
  return (
    <div className='flex flex-col items-center pt-5 mx-10 lg:mx-40'>

      <h1 className='text-3xl font-bold'>
        Related Products
      </h1>

      <hr className='w-50 border border-gray-800 mt-1' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 my-10'>

        {products.map((item) => (
          <Item key={item.id} {...item} />
        ))}

      </div>

    </div>
  )
}

export default RelatedProduct