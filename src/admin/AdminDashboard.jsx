import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/sidebar.css";
import AdminSidebar from "./AdminSideBar";


export default function AdminDashboard() {


    return (
        <div className="admin-layout">
            <AdminSidebar image={logo} />
            <main className="admin-main-content">
                <Outlet />
            </main>
        </div>
    )
}

