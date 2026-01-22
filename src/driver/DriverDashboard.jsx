import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import Header from './Header';

function DriverDashboard() {
    return (
        <div className="driver-app-wrapper">
            <nav className="mb-0">
                <Header image={logo} />
            </nav>
            <main className="dashboard-content">
                <Outlet />
            </main>
        </div>
    );
}

export default DriverDashboard;