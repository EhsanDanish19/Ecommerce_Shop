import React, { useContext } from 'react'

import { ShopContext } from '../Context/ShopContext'

import { BASE_URL } from '../api'

import delete_icon from '../assets/delete.png'

import { Link, useNavigate } from 'react-router-dom'

const CartItems = () => {

    const navigate = useNavigate()

    const {

        cartData,

        increaseQty,
        decreaseQty,
        removeItem,

        getTotalAmount

    } = useContext(ShopContext)

    const token = localStorage.getItem("token")

    if (!token) {
        navigate("/login")
    }

    return (

        <div className='px-4 md:px-10 lg:px-20 py-10'>

            {/* HEADER */}

            <div className='hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] border border-gray-300 font-bold text-lg text-center py-5'>

                <div>Products</div>

                <div>Price</div>

                <div>Quantity</div>

                <div>Subtotal</div>

            </div>

            {/* CART ITEMS */}

            {cartData.map((item) => (

                <div
                    key={item.id}
                    className='grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] border border-t-0 border-gray-300'
                >

                    {/* PRODUCT */}

                    <div className='flex gap-5 p-6 items-center'>

                        <img
                            src={`${BASE_URL}${item.image}`}
                            alt=''
                            className='w-28 h-30 object-cover'
                        />

                        <div>

                            <h1 className='text-xl font-bold'>
                                {item.name}
                            </h1>

                            <p className='mt-2 text-gray-700'>
                                Size : {item.size}
                            </p>

                            <button
                                className='mt-3'
                                onClick={() => removeItem(item.id)}
                            >

                                <img
                                    src={delete_icon}
                                    alt=''
                                    className='h-5 cursor-pointer'
                                />

                            </button>

                        </div>

                    </div>

                    {/* PRICE */}

                    <div className='flex items-center justify-center p-5'>

                        <p className='font-semibold'>
                            RS : {item.price}
                        </p>

                    </div>

                    {/* QUANTITY */}

                    <div className='flex items-center justify-center p-5'>

                        <div className='flex items-center gap-5 border border-gray-300 px-5 py-2 rounded-full'>

                            <button
                                className='font-bold text-xl'
                                onClick={() => decreaseQty(item.id)}
                            >
                                -
                            </button>

                            <p className='font-bold'>
                                {item.quantity}
                            </p>

                            <button
                                className='font-bold text-xl'
                                onClick={() => increaseQty(item.id)}
                            >
                                +
                            </button>

                        </div>

                    </div>

                    {/* SUBTOTAL */}

                    <div className='flex items-center justify-center p-5'>

                        <p className='font-bold'>
                            RS : {item.subtotal}
                        </p>

                    </div>

                </div>

            ))}

            {/* BOTTOM BUTTONS */}

            <div className='md:flex items-center justify-between py-8'>

                <Link to={'/'}>

                    <button className='border border-gray-400 px-5 py-3'>

                        Continue Shopping

                    </button>

                </Link>

            </div>

            {/* TOTAL SECTION */}

            <div className='md:flex justify-between gap-20 mt-15'>

                {/* TOTAL */}

                <div className='w-full md:w-[50%]'>

                    <h1 className='text-4xl font-bold mb-5'>

                        Cart Totals

                    </h1>

                    <div className='border border-gray-300'>

                        <div className='flex justify-between p-5 border-b border-gray-300'>

                            <p>Subtotal</p>

                            <p>
                                RS : {getTotalAmount()}
                            </p>

                        </div>

                        <div className='flex justify-between p-5 border-b border-gray-300'>

                            <p>Shipping Fee</p>

                            <p>Free</p>

                        </div>

                        <div className='flex justify-between p-5 font-bold text-xl'>

                            <p>Total</p>

                            <p>
                                RS : {getTotalAmount()}
                            </p>

                        </div>

                    </div>

                    <button className='bg-red-500 text-white px-6 py-3 mt-5 rounded-lg hover:bg-red-400'>

                        PROCEED TO CHECKOUT

                    </button>

                </div>

                {/* PROMO */}

                <div className='w-full md:w-[40%] mt-10 md:mt-0'>

                    <p className='mb-3'>

                        If you have a promo code, enter it here.

                    </p>

                    <input
                        type='text'
                        placeholder='Enter promo code'
                        className='border border-gray-400 w-full h-12 pl-4'
                    />

                    <button className='bg-gray-300 px-6 py-3 mt-4 rounded-lg'>

                        Submit

                    </button>

                </div>

            </div>

        </div>
    )
}

export default CartItems