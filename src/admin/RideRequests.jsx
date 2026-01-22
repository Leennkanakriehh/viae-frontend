import { useContext, useState } from "react";
import { viaeContext } from "../ViaeContext";
import RideTable from "./RideTable";
import "../styles/Table.css";

export default function RideRequests() {
    const { rides, loadingRides, ridesError } = useContext(viaeContext);
    const [statusFilter, setStatusFilter] = useState("");

    if (loadingRides) return <div className="p-5 text-center">Loading rides...</div>;
    if (ridesError) return <div className="alert alert-danger">{ridesError}</div>;

    const filteredRides = rides.filter(r => statusFilter === "" ? true : r.status === statusFilter)

    return (
        <div className="ride-requests-page">
            <header className="d-flex justify-content-between align-items-center mb-4">
                <h1>Ride Requests</h1>

                <div className="filter-group d-flex align-items-center gap-2">
                    <label className="small fw-bold">Filter By Status:</label>
                    <select
                        className="form-select w-auto"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Requests</option>
                        <option value="Pending">Pending</option>
                        <option value="Assigned">Assigned</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </header>

            <div className="content-card shadow-sm border rounded bg-white">
                <RideTable rides={filteredRides} />
            </div>
        </div>
    )
}