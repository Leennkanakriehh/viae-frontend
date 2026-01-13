import { Outlet } from "react-router-dom";
import logo from "../assets/logo.png";
import Header from './Header';

function DriverDashboard() {
    return (
        <>
            <nav>
                <Header image={logo}></Header>
            </nav>
            <Outlet />
        </>
    )

}
export default DriverDashboard;