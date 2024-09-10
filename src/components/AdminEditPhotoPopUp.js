import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const AdminEditPhotoPopUp = ({ photo, changePhotoDetails, changeCategories, changeAlbums }) => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
    const [token, ] = useContext(UserContext);
    const [editedPhoto, setEditedPhoto] = useState({
        title: photo.title,
        location: photo.location,
        date: photo.date,
        description: photo.description
    });
    const [allCategories, setAllCategories] = useState([]);
    const [allAlbums, setAllAlbums] = useState([]);
 
    useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_URL}/admin/category/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error fetching categories: ${response.statusText}`);
            }
            const data = await response.json();
            console.log("Starting Categories", data);

            // Update state once with the fetched data
            const updatedCategories = data.map(category => {
                // Check if `photo.categories` contains a category with the same `id_category`
                let isSelected = false
                photo.categories.map(pc => {
                    if (pc.id_category === category.id_category) {
                        isSelected = true
                    }
                })
                console.log("photo categories", photo.categories);
                return {
                    ...category,  // Spread the original category properties
                    selected: isSelected  // Add or update the `selected` property
                };
            });

            setAllCategories(updatedCategories);
            console.log("final categories", updatedCategories);

        } catch (error) {
            console.log(error);
        }
    }

    const fetchAlbums = async () => {
        try {
            const response = await fetch(`${API_URL}/admin/gallery/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error fetching albums: ${response.statusText}`);
            }
            else {
                const data = await response.json();
                console.log("Starting Albums", data);
                const updatedAlbums = data.map(album => {
                    // Check if `photo.categories` contains a category with the same `id_category`
                    let isSelected = false
                    photo.galleries.map(pc => {
                        if (pc.id_gallery === album.id_gallery) {
                            isSelected = true
                        }
                    })
                    console.log("photo gallery", photo.galleries);
                    return {
                        ...album,  // Spread the original category properties
                        selected: isSelected  // Add or update the `selected` property
                    };
                });

                setAllAlbums(updatedAlbums);
                console.log("final albums", updatedAlbums);
            }
        } catch (error) {
            console.log(error);
        }
    }

    fetchCategories();
    fetchAlbums();
}, []); // Add dependencies if `photo.categories` or `token` might change
    
    const handleChange = (event) => {
        setEditedPhoto({
            ...editedPhoto,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmitPhotoDetails = (event) => {
        event.preventDefault();
        console.log(editedPhoto);

        try {
            const response = fetch(`${API_URL}/admin/photos/update-details/${photo.id_photo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editedPhoto)
            });

            
            console.log("Photo Details Updated");
            changePhotoDetails(editedPhoto);
        
        }

        catch (error) {
            console.log(error);
        }
    }
    const handleChangeCategory = (event) => {
        setAllCategories(allCategories.map(category => category.id_category == event.target.name ? { ...category, selected: !category.selected } : category));
    }
    const handleChangeAlbum = (event) => {
        setAllAlbums(allAlbums.map(album => album.id_gallery == event.target.name ? { ...album, selected: !album.selected } : album));
    }
    const handleSubmitCategory = async (event) => {
        event.preventDefault();

        let categoryIds = allCategories.filter(category => category.selected).map(category => category.id_category);
        categoryIds = categoryIds.join(',');

        try {
            const response = await fetch(`${API_URL}/admin/photos/update-category/${photo.id_photo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ list_id_category: categoryIds })
            })

            if(!response.ok) {
                throw new Error(`Error updating categories: ${response.statusText}`);
            }
            else {
                console.log("Categories Updated");

                // Filter selected categories and map them to the desired structure
                let selectedCategories = allCategories
                .filter(category => category.selected) // Filter only selected categories
                .map(category => ({
                    id_category: category.id_category,
                    id_photo: photo.id_photo, // Add the photo id
                    category: {
                    id_category: category.id_category,
                    category_name: category.category_name
                    }
                }));

                console.log("selectedCategories", selectedCategories);

                // Call changeCategories with the transformed data
                changeCategories(selectedCategories);


            }
        }

        catch (error) {
            console.log(error);
        }
    }
    const handleSubmitAlbum = async (event) => {
        event.preventDefault();

        let albumIds = allAlbums.filter(album => album.selected).map(album => album.id_gallery);
        albumIds = albumIds.join(',');

        try {
            const response = await fetch(`${API_URL}/admin/photos/update-gallery/${photo.id_photo}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ list_id_gallery: albumIds })
            })

            if(!response.ok) {
                throw new Error(`Error updating categories: ${response.statusText}`);
            }
            else {
                console.log("Categories Updated");

                // Filter selected categories and map them to the desired structure
                let selectedAlbums = allAlbums
                .filter(album => album.selected) // Filter only selected categories
                .map(album => ({
                    id_gallery: album.id_gallery,
                    id_photo: photo.id_photo, // Add the photo id
                    gallery: {
                    id_gallery: album.id_gallery,
                    gallery_name: album.gallery_name
                    }
                }));

                console.log("selectedAlbums", selectedAlbums);

                // Call changeCategories with the transformed data
                changeAlbums(selectedAlbums);


            }
        }

        catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div>
                <h4>Edit Photo Details</h4>
                <form onSubmit={handleSubmitPhotoDetails}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" value={editedPhoto.title} onChange={handleChange} />
                    <label htmlFor="location">Location:</label>
                    <input type="text" id="location" name="location" value={editedPhoto.location} onChange={handleChange} />
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" value={editedPhoto.date} onChange={handleChange} />
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description" value={editedPhoto.description} onChange={handleChange} />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div>
                <h4>Edit Photo Categories</h4>
                <form onSubmit={handleSubmitCategory}>
                    <label htmlFor="categories">Categories:</label>
                    {allCategories.map((category) => (
                        <div key={category.id_category}>
                            <input
                            type="checkbox"
                            id={category.id_category}
                            name={category.id_category}
                            value={category.id_category}
                            checked={category.selected}
                            onChange={handleChangeCategory}
                            />
                            <label htmlFor={category.id_category}>{category.category_name}</label>
                        </div>
                    ))}
                    <button type="submit">Change Categories</button>
                    </form>
            </div>
            <div>
                <h4>Edit Photo Albums</h4>
                <form onSubmit={handleSubmitAlbum}>
                    <label htmlFor="albums">Albums:</label>
                    {allAlbums.map((album) => (
                        <div key={album.id_gallery}>
                            <input
                            type="checkbox"
                            id={album.id_gallery}
                            name={album.id_gallery}
                            value={album.id_gallery}
                            checked={album.selected}
                            onChange={handleChangeAlbum}
                            />
                            <label htmlFor={album.id_gallery}>{album.gallery_name}</label>
                        </div>
                    ))}
                    <button type="submit">Change Albums</button>
                </form>
            </div>
        </div>
    )
};

export default AdminEditPhotoPopUp;