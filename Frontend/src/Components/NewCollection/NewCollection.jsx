import React, {useEffect, useState} from 'react'
import Item from '../Item/Item'
import {BASE_URL} from '../../api'


const NewCollection = () => {
  const [collectons, setCollections] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/new/`)
    .then(res => res.json())
    .then(data =>{
      setCollections(data)
    });
  },[]);
  return (
    <div className='flex flex-col items-center pt-8'>
      <h1 className='flex mt-5 text-center text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700'>NEW COLLECTIONS</h1>
      <hr className='w-55 border-2 border-gray-500 mt-1'/>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-5 gap-5 p-8'>
      {collectons.map((item)=>{
        return item.is_new && <Item key={item.id} {...item} />

      })}
      </div>
    </div>
  )
}

export default NewCollection
