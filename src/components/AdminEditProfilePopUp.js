import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const AdminEditProfilePopUp = ({adminData, changeAdminData}) => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"
    const [newAdminData, setNewAdminData] = useState(adminData)
    const [token,] = useContext(UserContext)

    const handleChange = (event) => {
        console.log(newAdminData)
        setNewAdminData({
            ...newAdminData,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(newAdminData)

        try {
            const response = fetch(`${API_URL}/admin/update/${newAdminData.id_user}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newAdminData)
            })

            changeAdminData(newAdminData)
        }

        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" name="username" onChange={handleChange} value={newAdminData.username}/>
                <label>Email</label>
                <input type="email" name="email" onChange={handleChange} value={newAdminData.email}/>
                <label>Description</label>
                <input type="text" name="description" onChange={handleChange} value={newAdminData.description}/>
                <label>InstagramURL</label>
                <input type="url" name="instagram_url" onChange={handleChange} value={newAdminData.instagram_url}/>
                <label>FacebookURL</label>
                <input type="url" name="facebook_url" onChange={handleChange} value={newAdminData.facebook_url}/>
                <label>LinkedInURL</label>
                <input type="url" name="linkedin_url" onChange={handleChange} value={newAdminData.linkedin_url}/>
                
                <button>Submit</button>
            </form>
        </div>
    )
};
export default AdminEditProfilePopUp