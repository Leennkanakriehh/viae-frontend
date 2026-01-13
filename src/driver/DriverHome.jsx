import { useState } from 'react';
import Activity from './Activity';
import ActiveRide from "./ActiveRide";
import "../styles/DriverHome.css";

function DriverHome() {
    const [activity, setActivity] = useState(false);

    const toggle = () => {
        setActivity(!activity);
    };

    return (
        <main className="main-content">

            <div className="status-card">
                <Activity active={activity} onToggle={() => setActivity(!activity)} />
            </div>
            <div className="main-status-area">
                <ActiveRide />
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <p className="stat-label">Today's Rides</p>
                    <h2 className="stat-value">5</h2>
                </div>
                <div className="stat-card">
                    <p className="stat-label">Total Earnings</p>
                    <h2 className="stat-value">$245</h2>
                </div>
                <div className="stat-card">
                    <p className="stat-label">Rating</p>
                    <h2 className="stat-value">4.9 <span className="star">⭐</span></h2>
                </div>
            </div>
        </main>
    )

}
export default DriverHome;
