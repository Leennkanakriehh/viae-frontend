import StatCard from "./statCard";
import { useContext } from "react";
import { viaeContext } from "../ViaeContext";
import userIcon from "../assets/users.png";
import carIcon from "../assets/car.png";
import checked from "../assets/checked.png";
import clock from "../assets/clock.png"
import "../styles/AdminHome.css"
import RideRequests from "./RideRequests";
import RideTable from "./RideTable";

export default function AdminHome() {
    const { stats } = useContext(viaeContext)
    const { rides } = useContext(viaeContext)

    const displayStats = [
        { label: "Total Rides Today", value: stats.totRidesDay, icon: carIcon },
        { label: "Active Drivers", value: stats.activeDrivers, icon: userIcon },
        { label: "Pending Requests", value: stats.pendingRequests, icon: clock },
        { label: "Completed Today", value: stats.completedToday, icon: checked }
    ]


    return (
        <div>
            <h1>Dashboard</h1>
            <h5>Overview of your fleet operations</h5>
            <div className="stats-grid">
                {displayStats.map((item, i) => (<StatCard key={i} {...item} />))}
            </div>
            <div>
                <RideTable />
            </div>
        </div>
    )
}