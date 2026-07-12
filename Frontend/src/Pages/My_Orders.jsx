import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../api';
const My_Orders = () => {

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
            <h1 className=' text-center font-bold text-3xl lg:text-4xl py-10 bg-gray-200 mb-3'>
                My Orders
            </h1>

            <div className='hidden md:grid grid-cols-5 md:mx-5 lg:mx-20 py-5 text-center font-bold border border-gray-300'>
                <div>Id</div>
                <div>Total</div>
                <div>Payment</div>
                <div>Status</div>
                <div>Date</div>
            </div>

            {orders.length === 0 ? (
                <h2 className='text-center text-gray-500 text-3xl mt-10'>
                    No Orders Found.
                </h2>
            ) : (
                orders.map(order => (
                    <div key={order.id} className='grid grid-cols-1 md:grid-cols-5 mx-5 md:mx-5 lg:mx-20 py-5 mb-4 md:mb-0 md:pl-0 pl-10 md:text-center border md:border-t-0 border-gray-300'>

                        <h2><span className='md:hidden font-bold'>Id : </span>{order.id}</h2>
                        <p><span className='md:hidden font-bold'>Total Amount : </span> {order.total_amount}</p>
                        <p><span className='md:hidden font-bold'>payment Method  : </span> {order.payment_method}</p>
                        <p><span className='md:hidden font-bold'>Status : </span> {order.status} </p>
                        <p><span className='md:hidden font-bold'>Date : </span> {order.created_at} </p>

                    </div>
                ))
            )}
        </div>
    )
}

export default My_Orders
