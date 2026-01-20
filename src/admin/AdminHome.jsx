import StatCard from "./statCard";
import { useState, useContext } from "react";
import { viaeContext } from "../ViaeContext";
import userIcon from "../assets/users.png";
import carIcon from "../assets/car.png";
import checked from "../assets/checked.png";
import clock from "../assets/clock.png"
import "../styles/AdminHome.css"
import RideTable from "./RideTable";
import { Button } from "react-bootstrap";
import CreateRideModal from "./CreateRideModal";

export default function AdminHome() {
    const [modalShow, setModalShow] = useState(false);

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
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Create Ride
                </Button>

                <CreateRideModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />

                <RideTable rides={rides} />
            </div>
        </div>
    )
}