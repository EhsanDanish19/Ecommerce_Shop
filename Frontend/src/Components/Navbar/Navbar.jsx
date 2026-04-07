import React, { useState } from 'react'
import logo from "../../assets/logo.png"
import cartIcon from "../../assets/cart-icon.png"
import './Navbar.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [menu, setMenu] = useState()
    const [open, setOpen] = useState(false)


    return (
        <div className="navbar shadow-md px-14 py-3">

            {/* Top Bar */}
            <div className="nav-menu flex justify-between items-center">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img src={logo} alt="" className="nav-logo h-10" />
                    <p className="nav-p text-xl font-semibold">Shopify</p>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-6 text-gray-600 ">
                    <Link to="/"><li
                        className={`cursor-pointer px-3 py-1 rounded-lg ${menu === "home" ? "bg-gray-100 text-black" : ""}`}
                        onClick={() => setMenu("home")}
                    >
                        Home
                    </li>
                        </Link>
                        <Link to="/mens">
                    <li
                        className={`cursor-pointer px-3 py-1 rounded-lg ${menu === "mens" ? "bg-gray-100 text-black" : ""}`} onClick={() => setMenu("mens")}
                    >
                        Men
                    </li>
                        </Link>
                        <Link to="/womens">
                    <li
                        className={`cursor-pointer px-3 py-1 rounded-lg ${menu === "womens" ? "bg-gray-100 text-black" : ""}`} onClick={() => setMenu("womens")}
                    >
                        Women
                    </li>
                        </Link>
                        <Link to="/kids">
                    <li
                        className={`cursor-pointer px-3 py-1 rounded-lg ${menu === "kids" ? "bg-gray-100 text-black" : ""}`} onClick={() => setMenu("kids")}
                    >
                        Kids
                    </li>
                        </Link>
                </ul>

                {/* Right */}
                <div className="flex items-center gap-4">
                    <Link to="/login">
                    <button className="nav-login w-[100px] h-[35px] border border-gray-500 px-4 py-1 rounded-full text-sm cursor-pointer">
                        Login
                    </button>
                        </Link>

                    <div className="relative">
                        <Link to="/cart"><img src={cartIcon} alt="" className=" nav-cart w-8" /></Link>
                        <div className="nav-count absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            0
                        </div>
                    </div>

                    {/* Hamburger */}
                    <div className="md:hidden " onClick={() => setOpen(!open)}>
                        <i className="bi bi-list cursor-pointer text-4xl"></i>
                    </div>
                </div>

            </div>

            {/* Mobile Menu */}
            {open && (
                <ul className="flex flex-col gap-3 mt-4 md:hidden text-gray-600">
                    <Link to="/">
                                        <li
                        className={`cursor-pointer px-3 py-1 rounded-lg ${menu === "home" ? "bg-gray-100 text-black" : ""}`}
                        onClick={() => setMenu("home")}
                    >
                    Home    
                    </li>
                    </Link>
                        <Link to="/mens">
                    <li
                        className={`cursor-pointer px-3 py-1 rounded-lg ${menu === "mens" ? "bg-gray-100 text-black" : ""}`} onClick={() => setMenu("mens")}
                    >
                        Men
                    </li>
                        </Link>
                        <Link to="/womens">
                    <li
                        className={`cursor-pointer px-3 py-1 rounded-lg ${menu === "womens" ? "bg-gray-100 text-black" : ""}`} onClick={() => setMenu("womens")}
                    >
                        Women
                    </li>
                        </Link>
                        <Link to="/kids">
                    <li className={`cursor-pointer px-3 py-1 rounded-lg ${menu === "kids" ? "bg-gray-100 text-black" : ""}`} onClick={() => setMenu("kids")}
                    >
                        Kids
                    </li>
                        </Link>
                </ul>
            )}

        </div>
    )
}

export default Navbar