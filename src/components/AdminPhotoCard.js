import React, { useEffect, useState } from "react";
import './style/AdminPhotoCard.css'; // Import the CSS file for styling
import Popup from 'reactjs-popup';
import AdminEditPhotoPopUp from "./AdminEditPhotoPopUp";

const AdminPhotoCard = ({ currentPhoto }) => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
  const [photo, setPhoto] = useState(currentPhoto);

  useEffect(() => {
    if (photo.categories.length !== 0) {
      console.log(photo.categories);
      console.log("here");
      console.log(photo.categories[0].category.category_name);
      photo.categories.forEach((category) =>
        console.log(category.category.category_name)
      );
    }
  }, [photo.categories]);

  const changePhotoDetails = (newDetails) => {
    setPhoto({
      title: newDetails.title,
      location: newDetails.location,
      date: newDetails.date,
      description: newDetails.description,
      categories: photo.categories,
      galleries: photo.galleries,
      photo_path: photo.photo_path
    });
    console.log("Photo Details Changed", photo);
  };

  const changeCategories = (newCategories) => {
    setPhoto({
      id_photo: photo.id_photo,
      title: photo.title,
      location: photo.location,
      date: photo.date,
      description: photo.description,
      categories: newCategories,
      galleries: photo.galleries,
      photo_path: photo.photo_path
    });
  }

  const changeAlbums = (newAlbums) => {
    setPhoto({
      id_photo: photo.id_photo,
      title: photo.title,
      location: photo.location,
      date: photo.date,
      description: photo.description,
      categories: photo.categories,
      galleries: newAlbums,
      photo_path: photo.photo_path
    });
  }
  

  return (
    <div className="admin-photo-card">
      <img
        className="photo-img"
        src={API_URL + photo.photo_path}
        alt={photo.title || "Photo"}
      />
      <div className="photo-details">
        <h4 className="photo-title">{photo.title}</h4>
        <p className="photo-location">Location: {photo.location}</p>
        <p className="photo-date">Date: {new Date(photo.date).toLocaleDateString()}</p>
        <p className="photo-description">Description: {photo.description}</p>

        {photo.categories.length > 0 && (
          <div className="photo-categories">
            <p className="category-label">Categories:</p>
            <ul>
              {photo.categories.map((category) => (
                <li key={category.category.id_category}>{category.category.category_name}</li>
              ))}
            </ul>
          </div>
        )}

        {photo.galleries.length > 0 && (
          <div className="photo-albums">
            <p className="album-label">Albums:</p>
            <ul>
              {photo.galleries.map((gallery) => (
                <li key={gallery.gallery.id_gallery}>{gallery.gallery.gallery_name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Popup 
            trigger=
            {<p className="admin-dashboard-edit-profile">Edit Photo</p>}
            modal nested>
            {close => (
                <div className='modal user-modal'>
                    <div>
                        <i className="modal-close-btn fa-solid fa-x" onClick={() => close()}>X</i>
                    </div>
                    <div className='content'>
                        <AdminEditPhotoPopUp 
                        photo={photo} 
                        close={close} 
                        changePhotoDetails={changePhotoDetails} 
                        changeCategories={changeCategories}
                        changeAlbums={changeAlbums}/>
                    </div>
                </div>
            )}
        </Popup>
    </div>
  );
};

export default AdminPhotoCard;
