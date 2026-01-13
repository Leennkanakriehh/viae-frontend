import { useContext, useState } from "react";
import { viaeContext } from "../ViaeContext";
import "../styles/rideRequest.css";
import RideTable from "./RideTable";

export default function RideRequests() {
    const { rides } = useContext(viaeContext);
    const [statusFilter, setStatusFilter] = useState("");

    const filteredRides = rides.filter(ride =>
        statusFilter === "" ? true : ride.status === statusFilter
    )
    return (
        <div className="ride-requests-page">
            <div className="page-header">
                <h1>Ride Requests</h1>
                <p>Manage and assign ride requests</p>
            </div>

            <div className="filters-card">
                <h3>Filters</h3>

                <div className="filter-group">
                    <label>Status</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Assigned">Assigned</option>
                        <option value="InProgress">InProgress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>

            <div className="rides-card">
                <h3>All Ride Requests ({filteredRides.length})</h3>
                <div className="table-card">
                    <RideTable rides={filteredRides} />
                </div>
            </div>
        </div >
    );
}
