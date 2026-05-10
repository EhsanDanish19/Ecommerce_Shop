import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import remove_icon from '../assets/remove_icon.png'
import { BASE_URL } from '../api'
import pencil_icon from '../assets/pencile.png'
import delete_icon from '../assets/delete.png'
import { Link } from 'react-router-dom'

const CartItems = () => {

    const {
        getTotalCartAmount,
        all_product,
        cartItems,
        removeFromCart,
        increaseQty,
        decreaseQty,
        updateCart,
    } = useContext(ShopContext)

    return (
        <div className='px-4 md:px-10 lg:px-20 py-10'>

            {/* Cart Table*/}
            <div className='border border-gray-200'>

                {/* Header*/}
                <div className='hidden border-b border-gray-200 md:grid md:grid-cols-[2fr_1fr_1fr_1fr]  text-gray-700 text-lg font-bold '>
                    <div className='p-6 text-center border-r border-gray-200'>Products</div>
                    <div className='p-6 text-center border-r border-gray-200'>Price</div>
                    {/* <div className='p-6 text-center border-r border-gray-200'>Size</div> */}
                    <div className='p-6 text-center border-r border-gray-200'>Quantity</div>
                    <div className='p-6 text-center border-r border-gray-200'>Subtotal</div>
                </div>

                {all_product.map((e) => {

                    return Object.keys(cartItems).map((key) => {

                        const productId = key.split("_")[0]
                        const size = key.split("_")[1]

                        if (Number(productId) === e.id && cartItems[key] > 0) {

                            return (
                                <div
                                    key={key}
                                    className='grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] border-b border-gray-200'
                                >

                                    {/* Product */}
                                    <div className=' flex gap-5 p-6 border-r border-gray-200'>
                                        <img src={`${BASE_URL}${e.image}`} alt='' className=' w-28 h-30 object-cover' />
                                        <div className='flex flex-col justify-center'>
                                            <h1 className='text-lg font-bold text-gray-1000'>{e.name}</h1>

                                            <div className='flex gap-3 mt-3'>
                                                <button >
                                                    <img src={pencil_icon} alt='' className='h-4 cursor-pointer' />
                                                </button>
                                                <button className='text-sm text-gray-800 hover:text-black'>
                                                    <img src={delete_icon} alt='' className='h-5 cursor-pointer' onClick={() => removeFromCart(key)}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='hidden md:flex mt-8'>
                                            <p className='text-gray-1000 font-bold text-lg'>Size :&nbsp; </p>

                                            <p className='text-gray-900 font-semibold text-lg'>{size}</p>

                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className=' flex items-center justify-center border-r border-gray-200 p-6'>
                                        <p className='text-gray-800 text-lg'>RS : {e.new_price}</p>
                                    </div>


                                    {/* Quantity */}
                                    <div className='flex items-center justify-center border-r border-gray-200 p-6'>
                                        <div className='flex items-center gap-6 border border-gray-200 rounded-full px-5 py-2'>

                                            {/* minus button */}
                                            <button
                                                onClick={() => decreaseQty(key)}
                                                className='cursor-pointer font-bold text-xl text-center'
                                            >
                                                -
                                            </button>

                                            {/* quantity */}
                                            <p className='font-bold'>
                                                {cartItems[key]}
                                            </p>

                                            {/* plus button */}
                                            <button
                                                onClick={() => increaseQty(key)}
                                                className='cursor-pointer font-bold text-xl'
                                            >
                                                +
                                            </button>

                                        </div>
                                    </div>

                                    {/* Size for mobile screen */}
                                    <div className='sm:flex md:hidden flex items-center justify-center border-r border-gray-200 p-6'>
                                        <p className='text-gray-500 font-bold text-lg'>Size :&nbsp;</p>
                                        <p className='text-gray-500 font-semibold text-lg'>{size}</p>
                                    </div>

                                    {/* Subtotal */}
                                    <div className='flex items-center justify-center p-6'>
                                        <p className='text-md font-medium text-gray-800'>
                                            RS : {e.new_price * cartItems[key]}
                                        </p>
                                    </div>
                                </div>
                            )
                        }

                        return null
                    })
                })}
            </div>
            <div className='md:flex items-center justify-between  px-5 py-5'>
                <div className='text-center px-5 py-3'>
                    <Link to={'/'}>
                        <span className=''>
                            Continnue Shoping
                        </span>
                    </Link>
                </div>
                <div className='text-center px-5 py-3 border border-gray-500'>
                    <button className='' onClick={updateCart}>
                        Update Shoping Carts
                    </button>
                </div>
            </div>
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
                    <input className='h-10 border border-gray-500 rounded-sm pl-3' placeholder='Enter promo code.' /><br />
                    <button className='bg-gray-300 rounded-md mt-4 px-5 py-2'>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default CartItems
