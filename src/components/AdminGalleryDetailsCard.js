import React from "react";
import './style/AdminGalleryDetailsCard.css'

const AdminGalleryDetailsCard = (props) => {
    return (
        <div className="admin-gallery-details-card">
            <p>{props.number}</p>
            <p>{props.text}</p>
        </div>
    )
}

export default AdminGalleryDetailsCard