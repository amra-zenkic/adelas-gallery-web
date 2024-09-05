import React, { useState, useEffect, useContext } from "react";
import AdminGalleryDetailsCard from "./AdminGalleryDetailsCard";
import './style/AdminDashboard.css'
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdminEditProfilePopUp from "./AdminEditProfilePopUp";
import AdminChangePasswordPopup from "./AdminChangePasswordPopup";
import AdminChangeProfilePhotoPopUp from "./AdminChangeProfilePhotoPopUp";
import { UserContext } from "../context/UserContext";
import AdminServices from "./AdminServices";

//import { faXmark } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = ({ changeAdminPhoto }) => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"
    const [token, setToken] = useContext(UserContext)
    const [photoCount, setPhotoCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [galleryCount, setGalleryCount] = useState(0);
    const [servicesCount, setServicesCount] = useState(0);

    const [adminData, setAdminData] = useState({});

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:8000/admin/me", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                })
                const data = await response.json();
                setAdminData(data);
                console.log(data);

                const response1 = await fetch("http://localhost:8000/admin/category/count", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }, 
                });
                const data1 = await response1.json();
                console.log(data1);
                setCategoryCount(data1);
                //setCategoryCount(data);
                const response2 = await fetch("http://localhost:8000/admin/gallery/count", { // active albums
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const data2 = await response2.json();
                console.log(data2);
                setGalleryCount(data2);
                
                const response3 = await fetch("http://localhost:8000/admin/services/count", { // active albums
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const data3 = await response3.json();
                console.log(data3);
                setServicesCount(data3);

                const response4 = await fetch("http://localhost:8000/admin/photos/count", { // active albums
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const data4 = await response4.json();
                console.log(data4);
                setPhotoCount(data4);
            }
            catch (error) {
                console.error(error);
            }   
        }
        fetchData()
    }, []);

    const changeAdminData = (data) => {
        setAdminData(data);
    }
    
    return (
        <div>
            <h1 className="admin-dashboard-title">Dashboard</h1>
            <div className="admin-dashboard-content">
                <div className="admin-dashboard-profile-details-container">
                    <div className="admin-dashboard-profile-details">
                        <h2>Profile Details</h2>
                        <p>Username: {adminData.username}</p>
                        <p>Email: {adminData.email}</p>
                        <p>InstagramURL: {adminData.instagram_url}</p>
                        <p>FacebookURL: {adminData.facebook_url}</p>
                        <p>LinkedInURL: {adminData.linkedin_url}</p>
                        <p>Description: <Popup 
                            trigger=
                            {<p className="admin-dashboard-edit-profile">Read profile description</p>}
                            modal nested>
                            {close => (
                                <div className='modal user-modal'>
                                    <div>
                                        <i className="modal-close-btn fa-solid fa-x" onClick={() => close()}>X</i>
                                    </div>
                                    <div className='content'>
                                        {adminData.description ? adminData.description : "No description"}
                                    </div>
                                </div>
                            )}
                        </Popup></p>
                        <Popup 
                            trigger=
                            {<p className="admin-dashboard-edit-profile">Edit profile details</p>}
                            modal nested>
                            {close => (
                                <div className='modal user-modal'>
                                    <div>
                                        <i className="modal-close-btn fa-solid fa-x" onClick={() => close()}>X</i>
                                    </div>
                                    <div className='content'>
                                        <AdminEditProfilePopUp adminData={adminData} changeAdminData={changeAdminData}/>
                                    </div>
                                </div>
                            )}
                        </Popup>
                        
                    </div>
                    <div className="admin-dashboard-more-settings">
                        <h2>More Settings</h2>
                        <Popup 
                            trigger=
                            {<p className="admin-dashboard-edit-profile">Change Password</p>}
                            modal nested>
                            {close => (
                                <div className='modal user-modal'>
                                    <div>
                                        <i className="modal-close-btn fa-solid fa-x" onClick={() => close()}>X</i>
                                    </div>
                                    <div className='content'>
                                        <AdminChangePasswordPopup adminData={adminData} />
                                    </div>
                                </div>
                            )}
                        </Popup>
                        <Popup 
                            trigger=
                            {<p className="admin-dashboard-edit-profile">Change Profile Photo</p>}
                            modal nested>
                            {close => (
                                <div className='modal user-modal'>
                                    <div>
                                        <i className="modal-close-btn fa-solid fa-x" onClick={() => close()}>X</i>
                                    </div>
                                    <div className='content'>
                                        <AdminChangeProfilePhotoPopUp  
                                        adminData={adminData} 
                                        changeAdminPhoto={changeAdminPhoto} 
                                        />
                                    </div>
                                </div>
                            )}
                        </Popup>
                        <Popup 
                            trigger=
                            {<p className="admin-dashboard-edit-profile">Available Services</p>}
                            modal nested>
                            {close => (
                                <div className='modal user-modal'>
                                    <div>
                                        <i className="modal-close-btn fa-solid fa-x" onClick={() => close()}>X</i>
                                    </div>
                                    <div className='content'>
                                        <AdminServices />
                                    </div>
                                </div>
                            )}
                        </Popup>
                    </div>
                </div>
                <div className="admin-dashboard-gallery-details">
                    <h2>Gallery Details</h2>
                    <div className="admin-dashboard-gallery-details-container">
                        <AdminGalleryDetailsCard number={photoCount} text="photos online" />
                        <AdminGalleryDetailsCard number={galleryCount} text="active albums" />
                        <AdminGalleryDetailsCard number={categoryCount} text="categories" />
                        <AdminGalleryDetailsCard number={servicesCount} text="services" />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AdminDashboard;