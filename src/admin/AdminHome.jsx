import { useState, useContext } from "react";
import { viaeContext } from "../ViaeContext";
import { Car, Users, Clock, CheckCircle, Plus } from "lucide-react";
import RideTable from "./RideTable";
import CreateRideModal from "./CreateRideModal";
import "../styles/AdminHome.css";

export default function AdminHome() {
    const [modalShow, setModalShow] = useState(false);
    const { stats, rides } = useContext(viaeContext);

    const displayStats = [
        { label: "Daily Rides", value: stats.totRidesDay, icon: <Car />, color: "#0d6efd" },
        { label: "Active Drivers", value: stats.activeDrivers, icon: <Users />, color: "#6610f2" },
        { label: "Pending", value: stats.pendingRequests, icon: <Clock />, color: "#fd7e14" },
        { label: "Completed", value: stats.completedToday, icon: <CheckCircle />, color: "#198754" }
    ]

    return (
        <div className="dashboard-container">
            <header className="dashboard-header d-flex justify-content-between align-items-end mb-4">
                <div>
                    <h2 className="fw-bold">Fleet Overview</h2>
                    <p className="text-muted mb-0">Monitor your operations in real-time</p>
                </div>
                <button className="btn btn-primary rounded-pill px-4 d-flex align-items-center" onClick={() => setModalShow(true)}>
                    <Plus size={18} className="me-2" /> Create New Ride
                </button>
            </header>

            <div className="stats-grid mb-5">
                {displayStats.map((item, i) => (
                    <div key={i} className="stat-card shadow-sm">
                        <div className="stat-icon" style={{ color: item.color, backgroundColor: `${item.color}15` }}>
                            {item.icon}
                        </div>
                        <div className="stat-info">
                            <h3>{item.value}</h3>
                            <p>{item.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="content-card shadow-sm">
                <div className="card-header bg-white py-3 px-4 border-bottom">
                    <h5 className="mb-0 fw-bold">Recent Ride Activity</h5>
                </div>
                <RideTable rides={rides} />
            </div>

            <CreateRideModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    )
}