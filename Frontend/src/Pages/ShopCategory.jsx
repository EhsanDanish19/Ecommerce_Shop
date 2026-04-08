import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../assets/dropdown.svg'
import Item from '../Components/Item/Item';
const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className='m-0 md:mx-20 md:mt-10 lg:mx-50 lg:mt-10 p-5'>
      <img className='w-full h-120' src={props.banner} alt='' />
      <div className='m-16'>
        <div className='grid md:grid-cols-2  items-center pb-10 '>
          {/* Left side */}
          <p className='text-left font-semibold text-gray-800'>
            <span className='mr-2'>Showing 1-12</span>out of 36 products
          </p>

          {/* Right Side */}
          <div className='flex md:justify-end mt-3 md:mt-0'>
            <div className='flex items-center border-2 rounded-full border-gray-500 h-10 px-3 font-semibold'>
              Sort by <img className='h-9 mt-1 float-right' src={dropdown_icon} alt='' />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
          {all_product.map((item, i) => {
            if (props.category === item.category) {
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            } else {
              return null;
            }
          })}
        </div>
      </div>
      <div className='border-1 border-gray-500 shadow-xl rounded-full bg-gray-300 w-40 mx-auto flex mb-5 hover:bg-gray-400'>
        <button className='flex mx-auto py-2 font-semibold text-black-400 text-lg cursor-pointer'>Explore more</button>
      </div>
    </div>
  )
}

export default ShopCategory
