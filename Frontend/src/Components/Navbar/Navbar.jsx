import React, { useContext, useState, useEffect } from 'react'
import logo from "../../assets/logo.png"
import cartIcon from "../../assets/cart-icon.png"
import './Navbar.css'
import "bootstrap-icons/font/bootstrap-icons.css"
import { Link, useNavigate,useLocation } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const [profileOpen, setProfileOpen] = useState(false)

    const location = useLocation();

    const [username, setUsername] = useState(
        localStorage.getItem('username')
    )

    useEffect(() => {
        setUsername(localStorage.getItem('username'))
    }, [token])

    const [menu, setMenu] = useState()
    const [open, setOpen] = useState(false)
    const { getTotalItems } = useContext(ShopContext)

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')

        alert("Logout Successfully")
        navigate('/login')
    }
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
                <ul className="hidden lg:flex gap-6 text-gray-600 ">
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

                    {
                        token ? (
                            <h1 className="font-semibold text-center">
                                Welcome, {username} 👋
                            </h1>
                        ) : (
                            <h1 className="font-semibold text-center">
                                Welcome, Guest 😊
                            </h1>
                        )
                    }

                    <div className='hidden lg:flex'>
                        {
                            token ?
                                (
                                    token && location.pathname !== "/profile" && location.pathname !== "/my_orders" ? (

                                    

                                    <div className="relative">

                                        {/* Profile Icon */}
                                        <button
                                            onClick={() => setProfileOpen(!profileOpen)}
                                            className="text-3xl cursor-pointer">
                                            <i className="bi bi-person-circle"></i>
                                        </button>

                                        {/* Dropdown */}
                                        {
                                            profileOpen && (
                                                <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg p-3 z-50">

                                                    <Link to="/profile">
                                                        <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
                                                            Profile
                                                        </button>
                                                    </Link>

                                                    <Link to="/my_orders">
                                                        <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
                                                            Orders
                                                        </button>
                                                    </Link>

                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-500">
                                                        Logout
                                                    </button>

                                                </div>
                                            )
                                        }

                                    </div>

                                ) : (

                                    <Link to="/login">
                                        <button className="nav-login w-[100px] h-[35px] border border-gray-500 px-4 py-1 rounded-full text-sm">
                                            Login
                                        </button>
                                    </Link>

                                )
                                ):null
                        }
                    </div>
                    <div className="relative">
                        <Link to="/cart"><img src={cartIcon} alt="" className=" nav-cart w-8" /></Link>
                        <div className="nav-count absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {getTotalItems()}
                        </div>
                    </div>

                    {/* Hamburger */}
                    <div className="lg:hidden " onClick={() => setOpen(!open)}>
                        <i className="bi bi-list cursor-pointer text-4xl"></i>
                    </div>
                </div>

            </div>

            {/* Mobile Menu */}
            {open && (
                <ul className="flex flex-col gap-3 mt-4 lg:hidden text-gray-600">
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
                    <Link to="/my_orders">
                        <li
                            className={`cursor-pointer px-3 py-1 rounded-lg ${menu === "my_orders" ? "bg-gray-100 text-black" : ""}`} onClick={() => setMenu("my_orders")}
                        >
                            Orders
                        </li>
                    </Link>
                    {
                        token ? (
                            <div className="relative">

                                {/* Profile Icon */}
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="text-3xl cursor-pointer"
                                >
                                    <i className="bi bi-person-circle"></i>
                                </button>


                                {/* Dropdown */}
                                {
                                    profileOpen && (
                                        <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg p-3 z-50">

                                            <Link to="/profile">
                                                <button className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">
                                                    Profile
                                                </button>
                                            </Link>

                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-500"
                                            >
                                                Logout
                                            </button>

                                        </div>
                                    )
                                }

                            </div>

                        ) : (

                            <Link to="/login">
                                <button className="nav-login w-[100px] h-[35px] border border-gray-500 px-4 py-1 rounded-full text-sm">
                                    Login
                                </button>
                            </Link>

                        )
                    }


                </ul>
            )}

        </div>
    )
}

export default Navbar