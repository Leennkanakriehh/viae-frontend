import { Link } from "react-router-dom";
import logo from "./assets/logo.png";
import "./styles/Role.css";

function RoleSelect() {
    return (
        <div className="page-container">
            <div className="logo-container">
                <img src={logo} alt="Viae Logo" className="role-logo" /> {/* Added class here */}
            </div>

            <header className="main-header">
                <h1>Where routes converge</h1>
                <p>Select your role to continue</p>
            </header>

            <div className="card-container">
                <div className="role-card">
                    <div className="icon-circle admin-icon">👤</div>
                    <h3>Admin Dashboard</h3>
                    <p>Manage ride requests, drivers, and view reports</p>
                    <ul className="feature-list">
                        <li> Manage ride requests</li>
                        <li> Assign drivers to rides</li>
                        <li> View analytics</li>
                    </ul>
                    <Link to="admin" className="btn btn-admin">Enter Admin Dashboard</Link>
                </div>

                <div className="role-card">
                    <div className="icon-circle driver-icon">🚗</div>
                    <h3>Driver Dashboard</h3>
                    <p>Manage your availability and view assigned rides</p>
                    <ul className="feature-list">
                        <li> Toggle online status</li>
                        <li> View assigned rides</li>
                        <li> Access ride history</li>
                    </ul>
                    <Link to="driver" className="btn btn-driver">Enter Driver Dashboard</Link>
                </div>
            </div>

            <footer className="footer">
                Internal Fleet Management Platform
            </footer>
        </div>
    );
}

export default RoleSelect;