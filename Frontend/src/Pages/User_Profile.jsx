import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { BASE_URL } from '../api';
import { ShopContext } from '../Context/ShopContext';
import ChangePassword from '../Components/ChangePassword';

const User_Profile = () => {
    const {
        user,
        fetchProfile
    } = useContext(ShopContext);

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [bio, setBio] = useState("");
    const [image, setImage] = useState(null);
    const [editMode, setEditMode] = useState(false);


    const token = localStorage.getItem("token");

    const cancelEdit = () => {
        setFullName(user?.full_name || "");
        setPhone(user?.phone || "");
        setAddress(user?.address || "");
        setBio(user?.bio || "");
        setImage(null);
        setEditMode(false);
    };

    const handleImage = (e) => {
        setImage(
            e.target.files[0]
        );
    }


    useEffect(() => {
        fetchProfile()

    }, []);


    useEffect(() => {

        if (user) {

            setFullName(user.full_name || "");
            setPhone(user.phone || "");
            setAddress(user.address || "");
            setBio(user.bio || "");

        }

    }, [user]);


    const updateProfile = async () => {


        const formData = new FormData();

        formData.append(
            "full_name",
            fullName
        );

        formData.append(
            "phone",
            phone
        );


        formData.append(
            "address",
            address
        );


        formData.append(
            "bio",
            bio
        );


        if (image) {

            formData.append(
                "image",
                image
            );

        }



        try {


            await axios.put(

                `${BASE_URL}/api/profile/`,

                formData,

                {

                    headers: {

                        Authorization:
                            `Bearer ${token}`,

                        "Content-Type":
                            "multipart/form-data"

                    }

                }

            );


            alert(
                "Profile Updated"
            );


            setEditMode(false);


            fetchProfile();


        }

        catch (error) {

            console.log(error)

        }


    }


    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

                {/* Cover */}
                <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

                {/* Profile */}
                <div className="px-8 pb-8">

                    <div className="flex flex-col md:flex-row md:items-end -mt-20">

                        <img
                            src={
                                user?.image
                                    ? `${BASE_URL}${user.image}`
                                    : "https://i.pravatar.cc/300"
                            }
                        />

                        <div className="md:ml-6 mt-4 md:mt-0 flex-1">
                            <h1 className="text-3xl font-bold">
                                {user?.full_name}
                            </h1>

                            <p className="text-gray-500">
                                @{user?.username}
                            </p>


                        </div>

                        <button

                            onClick={() => setEditMode(true)}

                            className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg">

                            Edit Profile

                        </button>
                        <ChangePassword />
                    </div>

                    {/* About */}
                    <div className="mt-10">
                        <h2 className="text-xl font-bold mb-3">
                            About
                        </h2>

                        {
                            editMode ?

                                <textarea

                                    value={bio}

                                    onChange={
                                        (e) => setBio(e.target.value)
                                    }

                                    className="border p-3 rounded w-full" />

                                :

                                <p>
                                    {user?.bio}
                                </p>

                        }
                    </div>

                    {/* Details */}
                    <div className="grid md:grid-cols-2 gap-6 mt-10">

                        <div className="bg-gray-50 p-5 rounded-xl">
                            <h3 className="font-semibold text-gray-700 mb-4">
                                Personal Information
                            </h3>

                            <div className="space-y-3">

                                <div>
                                    <span className="font-medium">Email</span>
                                    <p className="text-gray-600">
                                        {user?.email}
                                    </p>
                                </div>

                                <div>
                                    <span className="font-medium">Phone</span>
                                    {
                                        editMode ?

                                            <input
                                                value={phone}
                                                onChange={
                                                    (e) => setPhone(e.target.value)
                                                }
                                                className="border p-2 rounded w-full" />
                                            :
                                            <p>
                                                {user?.phone}
                                            </p>

                                    }
                                </div>

                                <div>
                                    <span className="font-medium">Address</span>
                                    {
                                        editMode ?

                                            <textarea

                                                value={address}

                                                onChange={
                                                    (e) => setAddress(e.target.value)
                                                }

                                                className="border p-3 rounded w-full" />

                                            :

                                            <p>
                                                {user?.address}
                                            </p>

                                    }
                                </div>

                            </div>
                        </div>

                        <div className="bg-gray-50 p-5 rounded-xl">
                            <h3 className="font-semibold text-gray-700 mb-4">
                                Account Information
                            </h3>

                            <div className="space-y-3">


                                <div>
                                    <span className="font-medium">Full Name</span>
                                    {
                                        editMode ? (
                                            <input
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="border p-2 rounded-lg w-full "
                                            />
                                        ) : (
                                            <h1 className="font-bold">
                                                {user?.full_name}
                                            </h1>
                                        )
                                    }
                                </div>
                                <div>
                                    <span className="font-medium">Username</span>
                                    <p className="text-gray-600">
                                        {user?.username}
                                    </p>
                                </div>

                                {
                                    editMode && (
                                        <div className="mt-4">
                                            <label className="block font-medium mb-2">
                                                Change Profile Image
                                            </label>

                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImage}
                                                className="border p-2 rounded-lg"
                                            />
                                        </div>
                                    )
                                }

                                <div>
                                    <span className="font-medium">Member Since</span>
                                    <p className="text-gray-600">
                                        {user?.date_joined
                                            ? new Date(user.date_joined).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                    {
                        editMode && (
                            <div className="flex gap-4 mt-6">

                                <button
                                    onClick={updateProfile}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
                                >
                                    Save Profile
                                </button>

                                <button
                                    onClick={cancelEdit}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
                                >
                                    Cancel
                                </button>

                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
};

export default User_Profile
