import React, {
    createContext,
    useEffect,
    useState
} from "react"

import axios from "axios"
import { BASE_URL } from "../api"

export const ShopContext = createContext(null)

const ShopContextProvider = ({ children }) => {

    const [all_product, setAll_product] = useState([])
    const [cartData, setCartData] = useState([])

    // ==============================
    // FETCH PRODUCTS
    // ==============================
    const fetchProducts = async () => {

        try {

            const res = await axios.get(
                `${BASE_URL}/api/products/`
            )

            setAll_product(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    // ==============================
    // FETCH CART
    // ==============================
    const fetchCart = async () => {

        const token = localStorage.getItem("token")

        if (!token) return

        try {

            const res = await axios.get(
                `${BASE_URL}/api/cart/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setCartData(res.data)

        } catch (error) {
            console.log(error)
        }
    }

    // ==============================
    // INCREASE QUANTITY
    // ==============================
    const increaseQty = async (id) => {

        const token = localStorage.getItem("token")

        try {

            await axios.post(
                `${BASE_URL}/api/cart/increase/${id}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            fetchCart()

        } catch (error) {
            console.log(error)
        }
    }

    // ==============================
    // DECREASE QUANTITY
    // ==============================
    const decreaseQty = async (id) => {

        const token = localStorage.getItem("token")

        try {

            await axios.post(
                `${BASE_URL}/api/cart/decrease/${id}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            fetchCart()

        } catch (error) {
            console.log(error)
        }
    }

    // ==============================
    // REMOVE ITEM
    // ==============================
    const removeItem = async (id) => {

        const token = localStorage.getItem("token")

        try {

            await axios.delete(
                `${BASE_URL}/api/cart/remove/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            fetchCart()

        } catch (error) {
            console.log(error)
        }
    }

    // ==============================
    // TOTAL AMOUNT
    // ==============================
    const getTotalAmount = () => {

        let total = 0

        cartData.forEach((item) => {
            total += item.subtotal
        })

        return total
    }

    // ==============================
    // TOTAL ITEMS
    // ==============================
    const getTotalItems = () => {

        let total = 0

        cartData.forEach((item) => {
            total += item.quantity
        })

        return total
    }

    // ==============================
    // LOAD DATA
    // ==============================
    useEffect(() => {

        fetchProducts()
        fetchCart()

    }, [])


    
    // ==============================
    // CONTEXT VALUE
    // ==============================
    const contextValue = {

        all_product,
        cartData,

        fetchCart,

        increaseQty,
        decreaseQty,
        removeItem,

        getTotalAmount,
        getTotalItems
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider