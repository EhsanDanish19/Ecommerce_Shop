import React, { createContext, useState, useEffect } from "react"
import { BASE_URL } from "../api"

export const ShopContext = createContext(null)

const ShopContextProvider = (props) => {

    const [all_product, setAll_product] = useState([])

    const [cartItems, setCartItems] = useState({})

    // FETCH PRODUCTS FROM BACKEND
    useEffect(() => {
        fetch(`${BASE_URL}/api/products/`)
            .then(res => res.json())
            .then(data => setAll_product(data))
            .catch(err => console.log(err))
    }, [])

    // ADD TO CART
    const addToCart = (product, size) => {
        if (!size) {
            alert("Please select a size")
            return
        }

        const itemKey = product.id + "_" + size

        setCartItems(prev => ({
            ...prev,
            [itemKey]: (prev[itemKey] || 0) + 1
        }))
    }

    // Increase quantity
    const increaseQty= (key)=> {
        setCartItems(prev=>({
            ...prev,[key]:prev[key]+1
        }))
    }

    //Decrease quantity
    const decreaseQty=(key)=>{
        setCartItems(prev=>{
            const updateQty = prev[key] - 1
            if (updateQty <= 0){
                const newCart = {...prev }
                delete newCart[key]
                return newCart
            }
            return {
                ...prev, [key]:updateQty
            }
        })
    }
    // REMOVE
    const removeFromCart = (itemKey) => {
        setCartItems(prev => {
            const newCart = {...prev}
            delete newCart[itemKey]
            return newCart
        })
    }

    // TOTAL AMOUNT
    const getTotalCartAmount = () => {
        let totalAmount = 0

        for (const item in cartItems) {

            const productId = item.split("_")[0]

            const product = all_product.find(
                p => p.id === Number(productId)
            )

            if (product) {
                totalAmount += product.new_price * cartItems[item]
            }
        }

        return totalAmount
    }

    // TOTAL ITEMS
    const getTotalCartItems = () => {
        let total = 0
        for (const item in cartItems) {
            total += cartItems[item]
        }
        return total
    }

    const contextValue = {
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        increaseQty,
        decreaseQty,
    }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider