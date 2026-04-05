import React from 'react'

const Item = (props) => {
  return (
    <div className='justify-between item-center'>
      <img src={props.image} alt='' className='w-40'/>
      <p>{props.name}</p>
      <div>
        <div>
            {props.new_price}
        </div>
        <div>
            {props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item
