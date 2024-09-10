import React, { useEffect, useState, useContext } from "react";
import AdminAddNewPhoto from "./AdminAddNewPhoto";
import { UserContext } from "../context/UserContext";
import AdminPhotoCard from "./AdminPhotoCard";
import './style/AdminGallery.css'

const AdminGallery = () => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"
    const [token,] = useContext(UserContext)
    const [addNewPhoto, setAddNewPhoto] = useState(false)
    const [newPhoto, setNewPhoto] = useState({})
    const [allAlbums, setAllAlbums] = useState([])
    const [allCategories, setAllCategories] = useState([])
    const [allPhotos, setAllPhotos] = useState([])

    useEffect(() => {
        
        async function fetchData() {
            try {
                // fetching all albums
                const response = await fetch(`${API_URL}/admin/gallery/all`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                })

                if (!response.ok) {
                    console.log("Failed to fetch albums")
                    return
                }
                const jsonData = await response.json()
                setAllAlbums(jsonData)


                // fetching all categories
                const response2 = await fetch(`${API_URL}/admin/category/all`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                })

                if (!response2.ok) {
                    console.log("Failed to fetch categories")
                    return
                }
                const jsonData2 = await response2.json()
                setAllCategories(jsonData2)

                const response3 = await fetch(`${API_URL}/admin/photos/all`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        
                    },
                })

                if (!response3.ok) {
                    console.log("Failed to fetch photos")
                    return
                }
                const jsonData3 = await response3.json()    
                setAllPhotos(jsonData3)
                console.log("all photos", jsonData3)
            }

            catch (error) {
                console.log(`An error occurred: ${error.message}`)
            }
        }

        fetchData()

    }, [])

    const addNewPhotoBtn = () => {
        setAddNewPhoto(!addNewPhoto)
    }

    const newPhotoAdded = (newPhoto) => {
        setAllPhotos([newPhoto, ...allPhotos ])
    }



    return (
        <div>
            <h1>AdminGallery</h1>
            {!addNewPhoto ?
            <button onClick={addNewPhotoBtn}>Add New Photo</button>
            : <AdminAddNewPhoto 
            addNewPhotoBtn={addNewPhotoBtn}
            allAlbums={allAlbums}
            allCategories={allCategories}
            newPhotoAdded={newPhotoAdded}/>
            }

            <div className="admin-gallery"> {/* All albums */}
                <h1>All Photos</h1>
                <div className="admin-gallery-container"> 
                    {allPhotos.map((photo) => (
                    <div className="admin-gallery-card" key={photo.id_photo}>
                        <AdminPhotoCard currentPhoto={photo}  />
                    </div>
                ))}

                </div>
            </div>
        </div>
    );
};

export default AdminGallery