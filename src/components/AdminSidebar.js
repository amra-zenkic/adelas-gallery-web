import React from "react";
import './style/AdminSidebar.css'

const AdminSidebar = (props) => {
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
            <p>Log Out</p>
        </div>
    )
}

export default AdminSidebar