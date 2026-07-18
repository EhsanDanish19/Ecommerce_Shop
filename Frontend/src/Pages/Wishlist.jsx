import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Heart, Trash2, ShoppingBag } from "lucide-react";

const Wishlist = () => {

    const {
        wishlist,
        removeFromWishlist,
        addToCart
    } = useContext(ShopContext);

    return (

        <div className="max-w-7xl mx-auto px-4 py-10">

            {/* Header */}

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h1 className="text-3xl font-bold">
                        My Wishlist
                    </h1>

                    <p className="text-gray-500 mt-1">

                        {wishlist.length}{" "}
                        {wishlist.length === 1
                            ? "item"
                            : "items"}

                    </p>

                </div>

                <Heart
                    size={30}
                    className="text-red-500"
                    fill="currentColor"
                />

            </div>


            {/* Empty Wishlist */}

            {wishlist.length === 0 && (

                <div className="
                    min-h-[400px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-center
                ">

                    <Heart
                        size={70}
                        className="text-gray-300"
                    />

                    <h2 className="
                        text-2xl
                        font-semibold
                        mt-5
                    ">

                        Your Wishlist is Empty

                    </h2>

                    <p className="
                        text-gray-500
                        mt-2
                    ">

                        Save your favorite products here.

                    </p>

                </div>

            )}


            {/* Wishlist Products */}

            {wishlist.length > 0 && (

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-6
                ">

                    {wishlist.map((item) => (

                        <div
                            key={item.id}
                            className="
                                bg-white
                                rounded-2xl
                                shadow-sm
                                border
                                overflow-hidden
                                group
                            "
                        >

                            {/* Image */}

                            <div className="
                                relative
                                h-64
                                bg-gray-100
                            ">

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                />

                                <button
                                    onClick={() =>
                                        removeFromWishlist(
                                            item.id
                                        )
                                    }
                                    className="
                                        absolute
                                        top-3
                                        right-3
                                        w-10
                                        h-10
                                        rounded-full
                                        bg-white
                                        shadow
                                        flex
                                        items-center
                                        justify-center
                                        text-red-500
                                        hover:bg-red-500
                                        hover:text-white
                                        transition
                                    "
                                >

                                    <Trash2 size={18} />

                                </button>

                            </div>


                            {/* Details */}

                            <div className="p-4">

                                <h2 className="
                                    font-semibold
                                    truncate
                                ">

                                    {item.name}

                                </h2>

                                <p className="
                                    text-gray-500
                                    text-sm
                                    mt-1
                                ">

                                    {item.category}

                                </p>


                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    mt-4
                                ">

                                    <div>

                                        <span className="
                                            text-lg
                                            font-bold
                                        ">

                                            Rs. {item.price}

                                        </span>

                                        {item.old_price && (

                                            <span className="
                                                ml-2
                                                text-sm
                                                text-gray-400
                                                line-through
                                            ">

                                                Rs. {item.old_price}

                                            </span>

                                        )}

                                    </div>


                                    <button
                                        onClick={() =>
                                            addToCart(
                                                item.product_id
                                            )
                                        }
                                        className="
                                            p-3
                                            rounded-full
                                            bg-black
                                            text-white
                                            hover:scale-105
                                            transition
                                        "
                                    >

                                        <ShoppingBag
                                            size={18}
                                        />

                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

};

export default Wishlist;