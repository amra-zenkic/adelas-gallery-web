import React, { useContext } from "react";
import './style/AdminSidebar.css'
import { UserContext } from "../context/UserContext";

const AdminSidebar = (props) => {
    const [token, setToken] = useContext(UserContext)
    const handleLogout = async () => {
        setToken(null)
    }

    return (
        <div className="admin-sidebar"> 
            <div className="admin-profile">
                <img  alt="Admin profile photo"/>
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