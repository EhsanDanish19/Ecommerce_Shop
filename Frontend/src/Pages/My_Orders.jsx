import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../api';
import { Link, useNavigate } from 'react-router-dom'


const My_Orders = () => {

    const navigate = useNavigate()
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const fetchOrders = async () => {

            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(
                    `${BASE_URL}/api/my_orders`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setOrders(res.data)

            } catch (error) {
                console.log(error.response)
            }
        }
        fetchOrders();

    }, []);


    return (
        <div className=''>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-center">
                    <h2 className="text-3xl font-bold text-gray-700">
                        Your Order is Empty
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Looks like you haven't ordered anything yet.
                    </p>
                    <p className="text-gray-500 mt-3">
                        Start shopping and place your first order today.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <div>
                    <h1 className=' text-center font-bold text-3xl lg:text-4xl py-10 bg-gray-200 mb-3'>
                        My Orders
                    </h1>

                    <div className='hidden md:grid grid-cols-9 md:mx-5 lg:mx-20 py-5 text-center font-bold border border-gray-300'>
                        <div>Id</div>
                        <div>Product</div>
                        <div>Size</div>
                        <div>Qty</div>
                        <div>Price</div>
                        <div>Total</div>
                        <div>Date</div>
                        <div>Payment</div>
                        <div>Status</div>


                    </div>

                    {
                        orders.map((order) => (

                            order.items.map((item, index) => (

                                <div
                                    key={`${order.id}-${index}`}
                                    className="grid grid-cols-1 md:grid-cols-9 md:mx-5 lg:mx-20 py-4 text-center border border-t-0 border-gray-300"
                                >

                                    <div>
                                        <span className="md:hidden font-bold">Id: </span>
                                        {order.id}
                                    </div>

                                    <div>
                                        <span className="md:hidden font-bold">Payment: </span>
                                        {order.payment_method}
                                    </div>

                                    <div>
                                        <span className="md:hidden font-bold">Status: </span>
                                        {order.status}
                                    </div>

                                    <div>
                                        <span className="md:hidden font-bold">Date: </span>
                                        {new Date(order.created_at).toLocaleString([], {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>

                                    <div>
                                        <span className="md:hidden font-bold">Product: </span>
                                        {item.name}
                                    </div>

                                    <div>
                                        <span className="md:hidden font-bold">Size: </span>
                                        {item.size}
                                    </div>

                                    <div>
                                        <span className="md:hidden font-bold">Qty: </span>
                                        {item.quantity}
                                    </div>

                                    <div>
                                        <span className="md:hidden font-bold">Price: </span>
                                        Rs {item.price}
                                    </div>

                                    <div>
                                        <span className="md:hidden font-bold">Total: </span>
                                        Rs {order.total_amount}
                                    </div>

                                </div>

                            ))

                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default My_Orders
