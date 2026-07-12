import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../api';
const My_Orders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        
        const fetchOrders = async ()=> {

            try{
            const token = localStorage.getItem("token");

            const res = await axios.get(
                `${BASE_URL}/api/my_orders`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );
            
            console.log("Orders:", res.data);

            setOrders(res.data)
            
        } catch (error) {
            console.log(error.response)
        }
    }
        fetchOrders();

    },[]);


  return (
    <div className=''>
    <h1 className=''>
        My orders
    </h1>

    {
        orders.map(order=>(
            <div key={order.id} className=''>

            <h2>Order #{order.id}</h2>
            <p>Total : Rs {order.total_amount}</p>
            <p>Payment : {order.payment_method}</p>
            <p>Status : {order.status} </p>
            <p>Date : {order.created_at} </p>

            </div>
        ))
    }      
    </div>
  )
}

export default My_Orders
