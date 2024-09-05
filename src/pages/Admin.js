import React, { useEffect, useState , useContext} from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminDashboard from "../components/AdminDashboard";
import AdminGallery from "../components/AdminGallery";
import AdminGallerySettings from "../components/AdminGallerySettings";
import './style/Admin.css'
import { UserContext } from "../context/UserContext";

const Admin = () => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"
    const [token, setToken] = useContext(UserContext)
    const [showDashboard, setShowDashboard] = useState(true);
    const [showGallery, setShowGallery] = useState(false);
    const [showGallerySettings, setShowGallerySettings] = useState(false);

    const [adminData, setAdminData] = useState({});

    useEffect(() => {
        setShowDashboard(true);

        async function fetchData() {
            try {
                const response = await fetch(`${API_URL}/admin/me`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                })
                const data = await response.json();
                setAdminData(data);

            } catch (error) {
                console.log(`An error occurred: ${error.message}`);
            }
        }
        fetchData();
        console.log("iz admina ", adminData);
    }, []);
    useEffect(() => {
        console.log("iz admina ", adminData);
    }, [adminData]);

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
            adminData={adminData}
            showDashboard={showDashboardState} 
            showGallery={showGalleryState} 
            showGallerySettings={showGallerySettingsState}
            />
            <div className="admin-container">
                <div className="admin-helper"></div>
                <div className="admin-content">
                    {showDashboard ? <AdminDashboard    /> : null}
                    {showGallery ? <AdminGallery /> : null}
                    {showGallerySettings ? <AdminGallerySettings /> : null}
                </div>
            </div>

        </div>
    )
};

export default Admin;