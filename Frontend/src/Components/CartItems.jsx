import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import remove_icon from '../assets/remove_icon.png'
import { BASE_URL } from '../api'
const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItems, removeFromCart, increaseQty, decreaseQty } = useContext(ShopContext)

    return (
        <div>
            <div className='flex items-center justify-between text-gray-500 font-semibold text-sm md:text-xl mx-10 md:mx-30 my-5'>
                <p >Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Size</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr className='h-3' />

           {all_product.map((e) => {

    return Object.keys(cartItems).map((key) => {

        const productId = key.split("_")[0]
        const size = key.split("_")[1]

        if (Number(productId) === e.id && cartItems[key] > 0) {

            return (
                <div
                    key={key}
                    className='flex items-center justify-between font-semibold text-gray-500 mx-10 md:mx-30 my-5'
                >
                    <img     src={`${BASE_URL}${e.image}`}
 alt='' className='h-30' />

                    <p>{e.name}</p>

                    <p>${e.new_price}</p>

                    <p>Size: {size}</p>

                    <div className='flex items-center gap-2'>
    
    {/* minus button */}
    <button
        onClick={() => decreaseQty(key)}
        className='w-8 h-8 border'
    >
        -
    </button>

    {/* quantity */}
    <button className='w-10 h-8 border'>
        {cartItems[key]}
    </button>

    {/* plus button */}
    <button
        onClick={() => increaseQty(key)}
        className='w-8 h-8 border cursor-pointer'
    >
        +
    </button>

</div>

                    <p>
                        {e.new_price * cartItems[key]}
                    </p>

                    <img
                        className='h-6 cursor-pointer'
                        src={remove_icon}
                        alt=''
                        onClick={() => removeFromCart(key)}
                    />
                </div>
            )
        }

        return null
    })
})}
            <div className='mx-10 md:mx-20 lg:mx-50 xl:mx-80 md:flex justify-between items-center gap-10 text-xl font-semibold mb-20 md:mb-40 mt-20'>
                <div className='text-2xl mb-5'>
                    <h1 className='text-gray-800 font-bold text-4xl'>Total Carts</h1>
                    <div className='text-gray-800 flex justify-between p-5'>
                        <p>Subtotal</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className='p-5 flex justify-between'>
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className='flex p-5 justify-between'>
                        <p>Total</p>
                        <p>${getTotalCartAmount()}</p>
                    </div>

                    <button className='bg-red-400 py-2 px-2 rounded-lg'>PROCEED TO CHECKOUT</button>
                </div>

                <div>
                    <p className='py-2'>If you have a promo code? enter here.</p>
                    <input className='h-10 border border-gray-500 rounded-sm pl-3' placeholder='Enter promo code.' /><br/>
                    <button className='bg-gray-300 rounded-md mt-4 px-5 py-2'>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default CartItems
