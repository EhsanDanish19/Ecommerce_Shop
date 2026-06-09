import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Checkout = () => {

    const navigate = useNavigate();

    const { getTotalAmount, cartData } = useContext(ShopContext);

    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        address: "",
        payment_method: "COD",
    });

    const token = localStorage.getItem("token");

    // redirect if not logged in
    if (!token) {
        navigate("/login");
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const placeOrder = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/api/checkout/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Order Placed Successfully!");

            // redirect to home or success page
            navigate("/");

        } catch (error) {
            console.log(error);
            alert("Order Failed!");
        }
    };

    return (
        <div className="px-4 md:px-10 lg:px-20 py-10">

            <h1 className="text-3xl font-bold mb-8">
                Checkout
            </h1>

            <div className="flex flex-col md:flex-row gap-10">

                {/* FORM */}
                <form
                    onSubmit={placeOrder}
                    className="w-full md:w-2/3 border p-6 rounded-lg"
                >

                    <input
                        type="text"
                        name="full_name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        className="w-full border p-3 mb-4"
                        required
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        onChange={handleChange}
                        className="w-full border p-3 mb-4"
                        required
                    />

                    <textarea
                        name="address"
                        placeholder="Address"
                        onChange={handleChange}
                        className="w-full border p-3 mb-4"
                        required
                    />

                    <select
                        name="payment_method"
                        onChange={handleChange}
                        className="w-full border p-3 mb-4"
                    >
                        <option value="COD">Cash On Delivery</option>
                        <option value="JAZZCASH">JazzCash</option>
                        <option value="EASYPAISA">EasyPaisa</option>
                    </select>

                    <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-3 rounded-lg w-full"
                    >
                        Place Order
                    </button>

                </form>

                {/* ORDER SUMMARY */}
                <div className="w-full md:w-1/3 border p-6 rounded-lg h-fit">

                    <h2 className="text-xl font-bold mb-4">
                        Order Summary
                    </h2>

                    <div className="flex justify-between mb-3">
                        <p>Subtotal</p>
                        <p>RS: {getTotalAmount()}</p>
                    </div>

                    <div className="flex justify-between mb-3">
                        <p>Shipping</p>
                        <p>Free</p>
                    </div>

                    <hr className="my-3" />

                    <div className="flex justify-between font-bold text-lg">
                        <p>Total</p>
                        <p>RS: {getTotalAmount()}</p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Checkout;