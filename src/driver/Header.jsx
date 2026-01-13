import { NavLink } from "react-router-dom";
import homeIcon from "../assets/car.png"; // or dashboard.png depending on preference
import historyIcon from "../assets/clock.png";
import profileIcon from "../assets/user1.png";
import logoutIcon from "../assets/logout.png";
import "../styles/Header.css";

function Header({ image }) {
    return (
        <header className="dashboard-nav">
            <div className="nav-container">
                <div className="nav-left">
                    <img src={image} alt="Viae logo" className="nav-logo" />
                </div>
                <nav className="nav-right">
                    <NavLink to="." end className="nav-btn">
                        <img src={homeIcon} alt="" className="nav-icon-img" />
                        <span>Home</span>
                    </NavLink>

                    <NavLink to="history" className="nav-btn">
                        <img src={historyIcon} alt="" className="nav-icon-img" />
                        <span>History</span>
                    </NavLink>

                    <NavLink to="profile" className="nav-btn">
                        <img src={profileIcon} alt="" className="nav-icon-img" />
                        <span>Profile</span>
                    </NavLink>

                    <NavLink to="/" className="nav-btn logout">
                        <img src={logoutIcon} alt="" className="nav-icon-img" />
                        <span>Logout</span>
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}

export default Header;