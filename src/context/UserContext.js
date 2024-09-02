import React, { createContext, useEffect, useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = (props) => {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
    const [token, setToken] = useState(localStorage.getItem("awsomeToken"));

    useEffect(() => {
        // fetching user
        const fetchUser = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try{
                const response = await fetch(`${API_URL}/admin/me`, requestOptions);

                if(!response.ok) {
                    setToken(null);
                }
                localStorage.setItem("awsomeToken", token);
            } catch(error) {
                setToken(null);
            }
        }
        fetchUser();
    }, [token]);

    return (
        <UserContext.Provider value={[token, setToken]}>
            {props.children}
        </UserContext.Provider>
    )
}   