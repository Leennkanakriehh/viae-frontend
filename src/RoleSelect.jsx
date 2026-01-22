import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Car, ArrowRight } from "lucide-react";
import logo from "./assets/logo.png";
import "./styles/Role.css";

function RoleSelect() {
    const navigate = useNavigate();

    const selectRole = (role) => {
        localStorage.setItem("selectedRole", role);
        navigate("/login");
    }

    return (
        <div className="role-page-container">
            <div className="container py-5">

                <div className="text-center mb-5">
                    <img src={logo} alt="Viae Logo" className="role-logo-img mb-4" />
                    <h1 className="fw-bold">Where routes <span className="text-primary">converge</span></h1>
                    <p className="text-muted">Select your role to continue</p>
                </div>

                <div className="row justify-content-center g-4">

                    <div className="col-12 col-md-5">
                        <div className="custom-role-card shadow-sm" onClick={() => selectRole("admin")}>
                            <div className="role-icon admin-bg">
                                <ShieldCheck size={32} />
                            </div>
                            <h3>Admin Dashboard</h3>
                            <p>Manage ride requests, drivers, and view reports</p>
                            <ul className="role-features">
                                <li>Manage ride requests</li>
                                <li>Assign drivers to rides</li>
                                <li>View analytics</li>
                            </ul>
                            <button className="btn btn-primary w-100 rounded-pill">
                                Continue as Admin <ArrowRight size={16} className="ms-2" />
                            </button>
                        </div>
                    </div>

                    <div className="col-12 col-md-5">
                        <div className="custom-role-card shadow-sm" onClick={() => selectRole("driver")}>
                            <div className="role-icon driver-bg">
                                <Car size={32} />
                            </div>
                            <h3>Driver Dashboard</h3>
                            <p>Manage your availability and view assigned rides</p>
                            <ul className="role-features">
                                <li>Toggle online status</li>
                                <li>View assigned rides</li>
                                <li>Access ride history</li>
                            </ul>
                            <button className="btn btn-dark w-100 rounded-pill">
                                Continue as Driver <ArrowRight size={16} className="ms-2" />
                            </button>
                        </div>
                    </div>

                </div>

                <footer className="role-footer text-center mt-5 text-muted">
                    Internal Fleet Management Platform
                </footer>
            </div>
        </div>
    );
}

export default RoleSelect;