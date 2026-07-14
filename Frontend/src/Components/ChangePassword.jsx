import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api";

const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [show, setShow] = useState(false);

    const token = localStorage.getItem("token");


    const changePassword = async () => {


        if(newPassword !== confirmPassword){

            alert("New password and confirm password not match");
            return;

        }


        try{

            await axios.post(

                `${BASE_URL}/api/change-password/`,

                {
                    old_password: oldPassword,
                    new_password: newPassword
                },

                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }

            );


            alert("Password Changed Successfully");

            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

            setShow(false);


        }
        catch(error){

            alert(
                error.response?.data?.error ||
                "Password change failed"
            );

        }

    }



   return (

    <div className="mt-5">

        {
            !show && (

                <button
                    onClick={() => setShow(true)}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg"
                >
                    Change Password
                </button>

            )
        }

        {
            show && (

                <div className="mt-5 bg-gray-50 p-6 rounded-xl">

                    <h3 className="font-bold text-lg mb-4">
                        Change Password
                    </h3>

                    <input
                        type="password"
                        placeholder="Old Password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="border p-3 rounded-lg w-full mb-3"
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border p-3 rounded-lg w-full mb-3"
                    />

                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border p-3 rounded-lg w-full mb-4"
                    />

                    <button
                        onClick={changePassword}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg mr-3"
                    >
                        Save Password
                    </button>

                    <button
                        onClick={() => setShow(false)}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                    >
                        Cancel
                    </button>

                </div>

            )
        }

    </div>

);

}


export default ChangePassword;