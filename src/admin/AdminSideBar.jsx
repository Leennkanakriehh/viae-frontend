import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { viaeContext } from "../ViaeContext";
import { LayoutDashboard, Car, Users, Clock, LogOut } from "lucide-react";
import "../styles/sidebar.css";

function AdminSidebar({ image }) {
    const { logout } = useContext(viaeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <aside className="admin-sidebar shadow-sm">
            <div className="sidebar-header">
                <img src={image} alt="Viae logo" className="sidebar-logo" />
                <div className="sidebar-brand-text">
                    <span className="brand-name">VIAE</span>
                    <span className="brand-tag">ADMIN</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="." end className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="rides" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
                    <Car size={20} />
                    <span>Ride Requests</span>
                </NavLink>

                <NavLink to="drivers" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
                    <Users size={20} />
                    <span>Active Drivers</span>
                </NavLink>

                <NavLink to="pending-drivers" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
                    <Clock size={20} />
                    <span>Pending Approval</span>
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}

export default AdminSidebar;