import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import {jwtDecode} from "jwt-decode";

const AdminChangeProfilePhotoPopUp = ({ adminData }) => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"
    
    const [token,] = useContext(UserContext)
    const user = jwtDecode(token);

    const [file, setFile] = useState(null);

  // Function to handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    //event.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/admin/update/photo/${user.id}`, { // Replace with your endpoint
        method: 'PUT',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: formData, // Attach FormData as the request body
      });

      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded successfully:', data);

      } else {
        const response2 = await response.json();
        console.error('File upload failed:', response2.detail);
      }
    } catch (error) {
      console.error('An error occurred while uploading the file:', error);
    }
  };


    return (
        <div>
            <h2>Change Profile Photo</h2>
            <img src={API_URL + adminData.photo_path} alt="Profile Photo"/>
            <form onSubmit={handleSubmit}>
                <label>Select New Profile Photo</label>
                <input type="file" name="profile_photo" onChange={handleFileChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};
export default AdminChangeProfilePhotoPopUp