import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import './style/AdminAddNewPhoto.css'; // Import the CSS file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminAddNewPhoto = ({ addNewPhotoBtn, allAlbums, allCategories, newPhotoAdded }) => {
  const [token] = useContext(UserContext);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  const [newPhoto, setNewPhoto] = useState({
    title: "",
    location: "",
    date: "",
    description: "",
    albums_id: [],
    categories_id: [],
    photo: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(newPhoto)
  
    // Create FormData object for the file upload
    const formData = new FormData();
    formData.append("file", newPhoto.photo); // Append the file
  
    // Construct the query string for other parameters
    const queryParams = new URLSearchParams({
      title: newPhoto.title,
      description: newPhoto.description,
      location: newPhoto.location,
      date: newPhoto.date,  // ensure date is in the expected format or remove it if not needed
      list_id_category: newPhoto.categories_id.join(","), // Combine categories into a comma-separated string
      list_id_gallery: newPhoto.albums_id.join(","), // Combine galleries into a comma-separated string
    }).toString();
  
    try {
      // Make a POST request with both query parameters and form data
      const response = await fetch(`${API_URL}/admin/photos/upload?${queryParams}`, { 
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData, // Pass the FormData object directly as the body
      });

      console.log("Response from post request:", response);
  
      if (!response.ok) {
        //console.log("Failed to upload photoo", response);
        toast.error("Failed to upload photo");
        return;
      }
      else {
        const data = await response.json();
        console.log("Successfuly added:", data);

        toast.success("Photo added successfully", { autoClose: 5000 }); // does not show up

        const newPhotoData = await fetch(`${API_URL}/admin/photos/${data.id_photo}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if(!newPhotoData.ok) {
          //console.log("Failed to fetch new photo", newPhotoData);
          toast.error("Failed to fetch new photo");
          return;
        }
        else {
          const photoData = await newPhotoData.json();
          console.log("Success:", data);
            addNewPhotoBtn();
            newPhotoAdded(photoData);
        }
        
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    setNewPhoto({
      ...newPhoto,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
    <ToastContainer />
    <div className="admin-add-photo-container">
    
      <h3>Add New Photo</h3>
      <form className="admin-add-photo-form" onSubmit={handleSubmit}>
        <label>Select Photo</label>
        <input type="file" name="photo" onChange={(e) => setNewPhoto({...newPhoto, photo: e.target.files[0]})}/>

        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" onChange={handleChange}/>

        <label>Location</label>
        <input type="text" name="location" id="location" onChange={handleChange}/>

        <label>Date</label>
        <input type="date" name="date" id="date" onChange={handleChange}/>

        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" onChange={handleChange}/>

        <div className="checkbox-group">
          <label>Select Albums</label>
          {allAlbums.map((album) => {
            const isChecked = newPhoto.albums_id.includes(album.id_gallery);
            return (
              <div key={album.id_gallery}>
                <input
                  type="checkbox"
                  onClick={() => {
                    if (isChecked) {
                      setNewPhoto({
                        ...newPhoto,
                        albums_id: newPhoto.albums_id.filter((id) => id !== album.id_gallery),
                      });
                    } else {
                      setNewPhoto({
                        ...newPhoto,
                        albums_id: [...newPhoto.albums_id, album.id_gallery],
                      });
                    }
                  }}
                  name="albums_id"
                  value={album.id_gallery}
                  id={album.id_gallery}
                  checked={isChecked}
                />
                <label htmlFor={album.id_gallery}>{album.gallery_name}</label>
              </div>
            );
          })}
        </div>

        <div className="checkbox-group">
          <label>Select Categories</label>
          {allCategories.map((category) => {
            const isChecked = newPhoto.categories_id.includes(category.id_category);
            return (
              <div key={category.id_category}>
                <input
                  type="checkbox"
                  onClick={() => {
                    if (isChecked) {
                      setNewPhoto({
                        ...newPhoto,
                        categories_id: newPhoto.categories_id.filter((id) => id !== category.id_category),
                      });
                    } else {
                      setNewPhoto({
                        ...newPhoto,
                        categories_id: [...newPhoto.categories_id, category.id_category],
                      });
                    }
                  }}
                  name="categories_id"
                  value={category.id_category}
                  id={category.id_category}
                  checked={isChecked}
                />
                <label htmlFor={category.id_category}>{category.category_name}</label>
              </div>
            );
          })}
        </div>

        <div className="admin-add-photo-buttons">
          <button type="submit">Submit</button>
          <button type="button" className="cancel" onClick={addNewPhotoBtn}>Cancel</button>
        </div>
      </form>
    </div>
    
    </>
  );
};

export default AdminAddNewPhoto;
