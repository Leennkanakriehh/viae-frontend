import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DriverDashboard from "./driver/DriverDashboard.jsx";
import History from "./driver/History.jsx";
import NotFound from "./notFound.jsx";
import Profile from './driver/Profile.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import DriverHome from './driver/DriverHome.jsx';
import RoleSelect from './RoleSelect.jsx';
import AdminHome from './admin/AdminHome.jsx';
import RideRequests from './admin/RideRequests.jsx';
import Drivers from './admin/Drivers.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:
      [{
        index: true,
        element: <RoleSelect />
      },
      {
        path: "admin",
        element: <AdminDashboard />,
        children: [
          {
            index: true,
            element: <AdminHome />
          },
          {
            path: "rides",
            element: <RideRequests />
          },
          {
            path: "drivers",
            element: <Drivers />
          },

        ]
      },
      {
        path: "driver",
        element: <DriverDashboard />,
        children: [
          {
            index: true,
            element: <DriverHome />
          },
          {
            path: "history",
            element: <History />
          },
          {
            path: "profile",
            element: <Profile />
          },
        ]
      }
      ]
  },
  {
    path: "*",
    element: <NotFound />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,


)
