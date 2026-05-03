import Item from '../Item/Item'
import React, { useEffect, useState } from 'react'

const Popular = () => {
  const [products, setProducts] = useState([]);

useEffect(() => {
  fetch("http://127.0.0.1:8000/api/popular/")
    .then(res => res.json())
    .then(data => {
      console.log("POPULAR DATA:", data); // 👈 check here
      setProducts(data);
    });
}, []);

  return (
    <div className='flex items-center flex-col pb-15 pt-15 bg-gradient-to-b from-gray-200 to-green-300'>
      
      <h1 className='text-gray-800 text-3xl md:text-4xl lg:text-5xl font-bold'>
        POPULAR IN WOMEN
      </h1>

      <hr className='w-55 border-2 border-gray-500 mt-1' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] mt-10 mx-10 md:mx-30'>
        
        {products.map((item) => (
          <Item key={item.id} {...item} />
        ))}

      </div>
    </div>
  )
}

export default Popular