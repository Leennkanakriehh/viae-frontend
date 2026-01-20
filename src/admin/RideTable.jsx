import "../styles/Table.css"
import { useContext, useState } from "react";
import { viaeContext } from "../ViaeContext";
import RideDetailsModal from "./RideDetailsModal";

export default function RideTable({ rides }) {
    const { drivers, assignDriver } = useContext(viaeContext);
    const [assigningRideId, setAssigningRideId] = useState(null);
    const [viewModal, setViewModal] = useState(false)
    const [selectedRide, setSelectedRide] = useState(null);

    function handleClick() {
        setViewModal(true)
    }


    return (

        <table className="data-table">
            <thead>
                <tr>
                    <th>Ride ID</th>
                    <th>Pickup Location</th>
                    <th>Destination</th>
                    <th>Assigned Driver</th>
                    <th>Status</th>
                    <th>Requested At</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {rides.map((ride) => (
                    <tr key={ride.id}>
                        <td>{ride.id}</td>
                        <td>{ride.pickup}</td>
                        <td>{ride.destination}</td>
                        <td>{ride.driver ?? "—"}</td>
                        <td>
                            <span className={`status ${ride.status.toLowerCase()}`}>
                                {ride.status}
                            </span>
                        </td>
                        <td>{ride.requestedAt ?? "—"}</td>
                        <td>
                            <div className="action-cell">
                                {ride.status?.toLowerCase() === "pending" && assigningRideId !== ride.id && (
                                    <button
                                        className="btn-outline"
                                        onClick={() => setAssigningRideId(ride.id)}
                                    >
                                        Assign Driver
                                    </button>
                                )}

                                {assigningRideId === ride.id && (
                                    <select
                                        defaultValue=""
                                        disabled={assigningRideId === "loading"}
                                        onChange={(e) => {
                                            const driverId = e.target.value;
                                            if (!driverId) return;

                                            setAssigningRideId("loading");
                                            assignDriver(ride.id, driverId);
                                            setAssigningRideId(null);
                                        }}
                                    >
                                        <option value="" disabled>Select driver</option>
                                        {(drivers || [])
                                            .filter(d => d.status === "Online")
                                            .map(driver => (
                                                <option key={driver.id} value={driver.id}>
                                                    {driver.username}
                                                </option>
                                            ))}
                                    </select>
                                )}

                                <button className="btn-outline" onClick={() => { handleClick(); setSelectedRide(ride) }}>View Details</button>
                            </div>
                        </td>
                    </tr>
                ))}
                <RideDetailsModal
                    show={viewModal}
                    onHide={() => setViewModal(false)}
                    ride={selectedRide}
                />


            </tbody>
        </table>
    )
}