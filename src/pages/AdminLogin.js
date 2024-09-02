import React, { useEffect, useState, useContext } from 'react'
import "@fontsource/cardo";
import "@fontsource/poiret-one";
import './style/AdminLogin.css'
import LoginPhoto from '../icons/AdminLogin.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from '../context/UserContext';


const AdminLogin = () => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

    const [token, setToken] = useContext(UserContext);
    console.log("Token: ", token);
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitLogin = async () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'accept': 'application/json'
            },
            body: JSON.stringify(`grant_type=password&username=${email}&password=${password}&scope=&client_id=string&client_secret=string`)
        }
    
        try {
            const response = await fetch(`${API_URL}/admin/login`, requestOptions);
            
            const data = await response.json();
            if (response.ok) {
                await setToken(data.access_token);
            } else {
                console.log(`Failed to login user: ${data.detail}`);
            }
        } catch (error) {
            console.log(`An error occurred: ${error.message}`);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        submitLogin();
    }


    return (
        <div className='admin-login-container' id='admin-login-img'>
            <img src={LoginPhoto} className='admin-login-photo'/>
            <div className='admin-login-left'>
                <h2>Welcome <br/>back !</h2>
                <form onSubmit={handleSubmit}>
                    <p>Email:</p>
                    <input
                        type="text"
                        name="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <p>Password:</p>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type='submit'>Log In</button>
                </form>
            </div>
            <div className='admin-login-right'>

            </div>
            
        </div>
    )
}

export default AdminLogin