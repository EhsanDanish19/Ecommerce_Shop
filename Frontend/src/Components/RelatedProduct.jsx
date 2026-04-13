import React from 'react'
import Item from '../Components/Item/Item'
import data_product from '../assets/data'


const RelatedProduct = () => {
    return (
        <div className='flex flex-col items-center pt-5 mx-10 lg:mx-40'>
            <h1 className='flex mt-3 text-center text-3xl md:text-4xl lg:text-5xl font-bold text-black-300'>Related Products</h1>
            <hr className='w-50 border border-gray-800 mt-1' />
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 my-10'>


                {data_product.map((item, i) => {
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />

                })}
            </div>
        </div>
    )
}

export default RelatedProduct
