import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Default import
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export default function AdminRoute({ children }) {
  const [token, ] = useContext(UserContext);

  if (token) { // Check if the token exists
    return children;
  } else { // user is not logged in
    return <Navigate to="/" />;
  }
}
