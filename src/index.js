import App from './App';
import AdminLogin from './pages/AdminLogin'
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Admin from './pages/Admin';
import { UserProvider } from './context/UserContext';
import AdminRoute from './auth/AdminRoute';
import AdminLoggenIn from './auth/AdminLoggedIn';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin/login",
    element: (
      <AdminLoggenIn>
        <AdminLogin />
      </AdminLoggenIn>
    )
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <Admin />
      </AdminRoute>
    )
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
