import { NavLink } from "react-router-dom";
import "../styles/sidebar.css"
import dashboardIcon from "../assets/dashboard.png";
import carIcon from "../assets/car.png";
import userIcon from "../assets/users.png";
import logoutIcon from "../assets/logout.png";

function AdminSidebar({ image }) {
    return (
        <aside className="admin-sidebar">
            <div className="sidebar-header">
                <img src={image} alt="Viae logo" className="sidebar-logo" />
                <p className="sidebar-subtitle">Admin Dashboard</p>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="." end className="sidebar-link">
                    <img src={dashboardIcon} alt="" className="nav-icon" />
                    <span>Dashboard</span>
                </NavLink>


                <NavLink to="rides" className="sidebar-link">
                    <img src={carIcon} alt="" className="nav-icon" />
                    <span>Ride Requests</span>
                </NavLink>

                <NavLink to="admin/drivers" className="sidebar-link">
                    <img src={userIcon} alt="" className="nav-icon" />
                    <span>Drivers</span>
                </NavLink>

                <NavLink to="admin/pending-drivers" className="sidebar-link">
                    <img src={userIcon} alt="" className="nav-icon" />
                    <span>Pending Drivers</span>
                </NavLink>

            </nav>

            <div className="sidebar-footer">
                <NavLink to="/" className="nav-link">
                    <img src={logoutIcon} alt="" className="nav-icon" />
                    <span>Logout</span>
                </NavLink>
            </div>
        </aside>
    );
}

export default AdminSidebar;
