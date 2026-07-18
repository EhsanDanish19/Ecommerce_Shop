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
    const [pendingCart, setPendingCart] = useState([])
    const [user, setUser] = useState(null);
    const [wishlist, setWishlist] = useState([]);


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



    const fetchProfile = async () => {
        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await axios.get(`${BASE_URL}/api/profile/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setUser(res.data);
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

            setCartData([...res.data])
            setPendingCart([...res.data])


        } catch (error) {
            console.log(error)
        }
    }

    // ==============================
    // INCREASE QUANTITY
    // ==============================
    const increaseQty = (id) => {

        setPendingCart(prev =>
            prev.map(item => {

                if (item.id === id) {

                    if (item.quantity >= item.available_stock) {
                        alert(
                            `Only ${item.available_stock} items available`
                        )
                        return item
                    }


                    return {
                        ...item,
                        quantity: item.quantity + 1,
                        subtotal: (item.quantity + 1) * item.price
                    }
                }

                return item
            })
        )

    }

    // ==============================
    // DECREASE QUANTITY
    // ==============================
    const decreaseQty = (id) => {

        setPendingCart(prev =>
            prev.map(item => {

                if (item.id === id && item.quantity > 1) {

                    return {
                        ...item,
                        quantity: item.quantity - 1,
                        subtotal: (item.quantity - 1) * item.price
                    }

                }

                return item

            })
        )

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

        fetchProducts();
        fetchCart();
        fetchProfile();
        fetchWishlist();

    }, [])



    const updateCart = async () => {

        const token = localStorage.getItem("token")

        try {

            await axios.post(
                `${BASE_URL}/api/cart/update/`,
                {
                    items: pendingCart
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )


            await fetchCart()

            alert("Cart Updated Successfully")


        }
        catch (error) {

            alert(
                error.response?.data?.error ||
                "Cart update failed"
            )

        }

    }



    // ==============================
    // Wishlist fetch
    // ==============================
    const fetchWishlist = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setWishlist([]);
            return;
        }

        try {
            const response = await axios.get(
                `${BASE_URL}/api/wishlist/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setWishlist(response.data.items || []);

        } catch (error) {
            console.log("Wishlist Error:", error);
        }
    };


    const addToWishlist = async (productId) => {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first");
            return;
        }

        try {

            await axios.post(
                `${BASE_URL}/api/wishlist/add/`,
                {
                    product: productId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await fetchWishlist();

        } catch (error) {

            console.log("Add Wishlist Error:", error);

        }
    };


    const removeFromWishlist = async (wishlistItemId) => {

        const token = localStorage.getItem("token");

        try {

            await axios.delete(
                `${BASE_URL}/api/wishlist/remove/${wishlistItemId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setWishlist((previousWishlist) =>
                previousWishlist.filter(
                    (item) => item.id !== wishlistItemId
                )
            );

        } catch (error) {

            console.log("Remove Wishlist Error:", error);

        }
    };

    const isInWishlist = (productId) => {

        return wishlist.some(
            (item) => item.product_id === productId
        );

    };

    // ==============================
    // CONTEXT VALUE
    // ==============================
    const contextValue = {

        all_product,
        cartData: pendingCart,

        user,
        fetchProfile,

        increaseQty,
        decreaseQty,

        updateCart,

        fetchCart,

        removeItem,

        getTotalAmount,
        getTotalItems,

        wishlist,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,


    }

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider