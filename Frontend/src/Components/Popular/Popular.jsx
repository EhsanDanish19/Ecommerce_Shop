import React from 'react'
import Item from '../Item/Item'
import data_product from '../../assets/data'

const Popular = () => {
  return (
    <div>
      <h1>Popular In Women</h1>
      <hr/>
      <div>
        {data_product.map((item,i) =>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default Popular
