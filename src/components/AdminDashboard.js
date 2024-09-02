import React, { useState } from "react";
import AdminGalleryDetailsCard from "./AdminGalleryDetailsCard";
import './style/AdminDashboard.css'

const AdminDashboard = () => {
    const [adminData, setAdminData] = useState(null);
    return (
        <div>
            <h1 className="admin-dashboard-title">Dashboard</h1>
            <div className="admin-dashboard-content">
                <div className="admin-dashboard-profile-details-container">
                    <div className="admin-dashboard-profile-details">
                        <h2>Profile Details</h2>
                        <p>Username: Adela Zenkić</p>
                        <p>Email: adela@gmail.com</p>
                        <p>InstagramURL: <i>link</i></p>
                        <p>FacebookURL: <i>link</i></p>
                        <p>LinkedInURL: <i>link</i></p>
                        <p className="admin-dashboard-edit-profile">Edit profile details</p>
                    </div>
                    <div className="admin-dashboard-more-settings">
                        <h2>More Settings</h2>
                        <p>Change Password</p>
                        <p>Change profile photo</p>
                        <p>Edit Available Services</p>
                    </div>
                </div>
                <div className="admin-dashboard-gallery-details">
                    <h2>Gallery Details</h2>
                    <div className="admin-dashboard-gallery-details-container">
                        <AdminGalleryDetailsCard number='100' text="photos online" />
                        <AdminGalleryDetailsCard number='100' text="active albums" />
                        <AdminGalleryDetailsCard number='100' text="categories" />
                        <AdminGalleryDetailsCard number='100' text="services" />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AdminDashboard;