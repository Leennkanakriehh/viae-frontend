import "../styles/DriverProfile.css";
import userIcon from "../assets/user1.png";
import logoutIcon from "../assets/logout.png";
import carIcon from "../assets/car.png";
import { useContext, useState } from "react";
import { viaeContext } from "../ViaeContext";

export default function Profile() {

    const { drivers } = useContext(viaeContext)

    // These would typically come from your context
    const driverData = {
        id: "D001",
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "+1 (555) 123-4567",
        vehicle: "Toyota Camry - ABC 1234",
        totalRides: 145,
        rating: 4.9,
        memberSince: "Jan 2024",
        status: "Online"
    };

    return (
        <div className="profile-page">
            <header className="profile-header">
                <div>
                    <h1>Profile</h1>
                    <p>Manage your driver information</p>
                </div>
                <span className="status-badge online">{driverData.status}</span>
            </header>

            <section className="profile-card info-section">
                <div className="card-header">
                    <h3>Driver Information</h3>
                    <button className="btn-edit">Edit Profile</button>
                </div>

                <div className="info-grid">
                    <div className="info-item full-width">
                        <label>Driver ID</label>
                        <p className="driver-id">{driverData.id}</p>
                    </div>

                    <div className="info-item">
                        <div className="item-content">
                            <img src={userIcon} alt="" className="profile-field-icon" />
                            <div>
                                <label>Name</label>
                                <p>{driverData.name}</p>
                            </div>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="item-content">
                            <span className="profile-field-icon">✉️</span>
                            <div>
                                <label>Email</label>
                                <p>{driverData.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="item-content">
                            <span className="profile-field-icon">📞</span>
                            <div>
                                <label>Phone</label>
                                <p>{driverData.phone}</p>
                            </div>
                        </div>
                    </div>

                    <div className="info-item">
                        <div className="item-content">
                            <img src={carIcon} alt="" className="profile-field-icon" />
                            <div>
                                <label>Vehicle</label>
                                <p>{driverData.vehicle}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="profile-card stats-section">
                <h3>Statistics</h3>
                <div className="stats-row">
                    <div className="stat-box">
                        <label>Total Rides</label>
                        <p className="stat-number">{driverData.totalRides}</p>
                    </div>
                    <div className="stat-box">
                        <label>Rating</label>
                        <p className="stat-number">{driverData.rating} <span className="star">⭐</span></p>
                    </div>
                    <div className="stat-box">
                        <label>Member Since</label>
                        <p className="stat-number">{driverData.memberSince}</p>
                    </div>
                </div>
            </section>

            <button className="btn-logout-footer">
                <img src={logoutIcon} alt="" className="footer-icon" />
                Logout
            </button>
        </div>
    );
}