import { useContext, useState } from "react";
import { viaeContext } from "../ViaeContext";
import RideDetailsModal from "./RideDetailsModal";
import "../styles/Table.css";

export default function RideTable({ rides }) {
    const { drivers, assignDriver } = useContext(viaeContext);

    const [assigningRideId, setAssigningRideId] = useState(null);
    const [viewModal, setViewModal] = useState(false);
    const [selectedRide, setSelectedRide] = useState(null);

    const handleViewDetails = (ride) => {
        setSelectedRide(ride);
        setViewModal(true);
    }

    return (
        <div className="table-responsive">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Ride ID</th>
                        <th>Pickup & Destination</th>
                        <th>Driver</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {rides.map((ride) => (
                        <tr key={ride.id}>
                            <td className="fw-bold text-muted">#{String(ride.id).slice(-5)}</td>

                            <td>
                                <div style={{ maxWidth: '250px' }}>
                                    <div className="text-truncate" title={ride.pickup}>{ride.pickup}</div>
                                    <div className="small text-muted text-truncate" title={ride.destination}>
                                        to: {ride.destination}
                                    </div>
                                </div>
                            </td>

                            <td className="fw-medium">{ride.driver ?? "—"}</td>

                            <td>
                                <span className={`status-badge ${ride.status.toLowerCase()}`}>
                                    {ride.status}
                                </span>
                            </td>

                            <td>
                                <div className="action-cell d-flex gap-2">
                                    {ride.status === "Pending" && (
                                        <>
                                            {assigningRideId !== ride.id ? (
                                                <button
                                                    className="btn-assign"
                                                    onClick={() => setAssigningRideId(ride.id)}
                                                >
                                                    Assign
                                                </button>
                                            ) : (
                                                <select
                                                    className="form-select-sm"
                                                    defaultValue=""
                                                    autoFocus
                                                    onBlur={() => setAssigningRideId(null)}
                                                    onChange={(e) => {
                                                        const driverId = e.target.value;
                                                        if (!driverId) return;
                                                        assignDriver(ride.id, driverId);
                                                        setAssigningRideId(null);
                                                    }}
                                                >
                                                    <option value="" disabled>Select Driver</option>
                                                    {(drivers || [])
                                                        .filter(d => d.status === "Online")
                                                        .map(driver => (
                                                            <option key={driver.id} value={driver.id}>
                                                                {driver.username}
                                                            </option>
                                                        ))}
                                                </select>
                                            )}
                                        </>
                                    )}

                                    <button className="btn-details" onClick={() => handleViewDetails(ride)}>
                                        Details
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedRide && (
                <RideDetailsModal
                    show={viewModal}
                    onHide={() => setViewModal(false)}
                    ride={selectedRide}
                />
            )}
        </div>
    )
}