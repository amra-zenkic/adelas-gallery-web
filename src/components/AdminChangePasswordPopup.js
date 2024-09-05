import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import {jwtDecode} from "jwt-decode";

const AdminChangePasswordPopup = () => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"
    
    const [token,] = useContext(UserContext)
    const user = jwtDecode(token);


    const [newAdminData, setNewAdminData] = useState({
        current_password: '',
        new_password: '',
        confirm_new_password: ''
    })
    

    const handleChange = (event) => {
        setNewAdminData({
            ...newAdminData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(newAdminData);
    
        if (newAdminData.new_password !== newAdminData.confirm_new_password) {
            console.log("Passwords do not match");
            return;
        }
    
        try {
            const response = await fetch(`${API_URL}/admin/update/password/${user.id}`, {
                method: 'PUT',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "current_password": newAdminData.current_password,
                    "new_password": newAdminData.new_password
                })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.log(`Failed to change password: ${errorData.detail}`, errorData.detail);
                return;
            }
            
            console.log("Password Changed");
        } catch (error) {
            console.log("An error occurred:", error);
        }
    };
    

    return (
        <div>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>Old Password</label>
                <input type="text" name="current_password" onChange={handleChange} value={newAdminData.username}/>

                <label>New Password</label>
                <input type="text" name="new_password" onChange={handleChange} value={newAdminData.username}/>
                <label>Confirm New Password</label>
                <input type="text" name="confirm_new_password" onChange={handleChange} value={newAdminData.username}/>
                
                <button>Submit</button>
            </form>
        </div>
    )
};
export default AdminChangePasswordPopup