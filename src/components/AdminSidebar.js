import React, { useContext, useEffect } from "react";
import './style/AdminSidebar.css'
import { UserContext } from "../context/UserContext";
import {jwtDecode} from "jwt-decode";

const AdminSidebar = (props) => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"
    const [token, setToken] = useContext(UserContext)
    const user = jwtDecode(token);
    const handleLogout = async () => {
        setToken(null)
    }

    

    return (
        <div className="admin-sidebar"> 
            <div className="admin-profile">
                <img src={API_URL + props.adminData.photo_path}  alt={API_URL + user.photo_path}/>
                <p className="admin-name">Adela Zenkić</p>
            </div>
            <nav>
                <ul>
                    <li onClick={() => props.showDashboard()}>Dashboard</li>
                    <li onClick={() => props.showGallery()}>Gallery</li>
                    <li onClick={() => props.showGallerySettings()}>Gallery Settings</li>
                </ul>
            </nav>
            <p onClick={handleLogout}>Log Out</p>
        </div>
    )
}

export default AdminSidebar