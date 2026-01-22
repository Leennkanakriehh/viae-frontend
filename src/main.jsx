import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DriverDashboard from "./driver/DriverDashboard.jsx";

import NotFound from "./notFound.jsx";
import Profile from './driver/Profile.jsx';

import AdminDashboard from './admin/AdminDashboard.jsx';
import DriverHome from './driver/DriverHome.jsx';
import RoleSelect from './RoleSelect.jsx';
import AdminHome from './admin/AdminHome.jsx';
import RideRequests from './admin/RideRequests.jsx';
import Drivers from './admin/Drivers.jsx';
import PendingDrivers from './admin/PendingDrivers.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

import { AdminRoute, DriverRoute } from "./ProtectedRoutes.jsx";
import Login from "./login.jsx";
import Signup from "./signup.jsx";
import { ViaeProvider } from "./ViaeProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <RoleSelect /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      {
        path: "admin",
        element: <AdminRoute />,
        children: [
          {
            element: <AdminDashboard />,
            children: [
              { index: true, element: <AdminHome /> },
              { path: "rides", element: <RideRequests /> },
              { path: "drivers", element: <Drivers /> },
              { path: "pending-drivers", element: <PendingDrivers /> },
            ]
          }
        ]
      },

      {
        path: "driver",
        element: <DriverRoute />,
        children: [
          {
            element: <DriverDashboard />,
            children: [
              { index: true, element: <DriverHome /> },

              { path: "profile", element: <Profile /> },
            ]
          }
        ]
      }
    ]
  },
  { path: "*", element: <NotFound /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ViaeProvider>
      <RouterProvider router={router} />
    </ViaeProvider>
  </StrictMode>
);
