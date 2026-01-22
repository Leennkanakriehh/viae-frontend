import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { viaeContext } from "../ViaeContext";
import "../styles/Header.css"
import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBBtn,
    MDBBadge
} from "mdb-react-ui-kit";

// Replace local images with Lucide icons for a cleaner look
import { Car, Clock, User, LogOut } from "lucide-react";

function Header({ image }) {
    const { logout, driverProfile } = useContext(viaeContext);
    const navigate = useNavigate();

    const isBlocked =
        driverProfile?.status === "pending" ||
        driverProfile?.status === "rejected";

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    }

    return (
        <MDBNavbar light bgColor="white" className="header-smooth py-3 border-bottom sticky-top">
            <MDBContainer fluid className="px-lg-5">

                {/* Logo Section */}
                <MDBNavbarBrand className="fw-bold d-flex align-items-center">
                    <img
                        src={image}
                        alt="Viae logo"
                        height="32"
                        className="me-2"
                    />
                </MDBNavbarBrand>

                {/* Navigation Links */}
                <MDBNavbarNav className="d-flex flex-row align-items-center gap-2 w-auto">

                    <MDBNavbarItem>
                        <NavLink
                            to="."
                            end
                            className={({ isActive }) =>
                                `nav-pill-link ${isActive ? 'active' : ''} ${isBlocked ? "disabled-link" : ""}`
                            }
                        >
                            <Car size={18} />
                            <span>Dashboard</span>
                        </NavLink>
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                        <NavLink
                            to="profile"
                            className={({ isActive }) =>
                                `nav-pill-link ${isActive ? 'active' : ''}`
                            }
                        >
                            <User size={18} />
                            <span>Profile</span>
                        </NavLink>
                    </MDBNavbarItem>

                    {/* Status Badge with custom coloring */}
                    {driverProfile?.status && (
                        <MDBNavbarItem className="ms-2 d-none d-md-flex">
                            <MDBBadge
                                className={`status-badge-smooth ${driverProfile.status}`}
                                pill
                            >
                                {driverProfile.status.toUpperCase()}
                            </MDBBadge>
                        </MDBNavbarItem>
                    )}

                    {/* Logout with refined button style */}
                    <MDBNavbarItem className="ms-3 border-start ps-3">
                        <MDBBtn
                            color="none"
                            className="logout-btn-smooth shadow-0 d-flex align-items-center gap-2"
                            onClick={handleLogout}
                        >
                            <LogOut size={18} />
                            <span className="d-none d-lg-inline">Sign Out</span>
                        </MDBBtn>
                    </MDBNavbarItem>

                </MDBNavbarNav>
            </MDBContainer>
        </MDBNavbar>
    );
}

export default Header;