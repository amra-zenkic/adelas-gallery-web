import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Default import
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export default function AdminLoggenIn({ children }) {
  // function that checks if the user is logged in
  // if not, redirect to home page
  const [token, ] = useContext(UserContext);

  if (token && token !== "null") { // Check if the token exists
    console.log("Token exists ", token);
    return <Navigate to="/admin" />;
  } else { // user is not logged in
    console.log("Token does not exist ", token);
    return children
  }
}
