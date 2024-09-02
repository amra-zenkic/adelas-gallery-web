import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminDashboard from "../components/AdminDashboard";
import AdminGallery from "../components/AdminGallery";
import AdminGallerySettings from "../components/AdminGallerySettings";
import './style/Admin.css'

const Admin = () => {
    const [showDashboard, setShowDashboard] = useState(true);
    const [showGallery, setShowGallery] = useState(false);
    const [showGallerySettings, setShowGallerySettings] = useState(false);

    useEffect(() => {
        setShowDashboard(true);
    }, []);

    const resetShowStates = () => {
        setShowDashboard(false);
        setShowGallery(false);
        setShowGallerySettings(false);
    };
    const showDashboardState = () => {
        resetShowStates();
        setShowDashboard(true);
    };
    const showGalleryState = () => {
        resetShowStates();
        setShowGallery(true);
    };
    const showGallerySettingsState = () => {
        resetShowStates();
        setShowGallerySettings(true);
    };

    return (
        <div className="admin-page">
            <AdminSidebar 
            showDashboard={showDashboardState} 
            showGallery={showGalleryState} 
            showGallerySettings={showGallerySettingsState}
            />
            <div className="admin-container">
                <div className="admin-helper"></div>
                <div className="admin-content">
                    {showDashboard ? <AdminDashboard /> : null}
                    {showGallery ? <AdminGallery /> : null}
                    {showGallerySettings ? <AdminGallerySettings /> : null}
                </div>
            </div>

        </div>
    )
};

export default Admin;