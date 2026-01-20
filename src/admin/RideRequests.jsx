import { useContext, useState } from "react";
import { viaeContext } from "../ViaeContext";
import RideTable from "./RideTable";
import "../styles/Table.css"


export default function RideRequests() {
    const { rides, loadingRides, ridesError, drivers, assignDriver } = useContext(viaeContext);
    const [statusFilter, setStatusFilter] = useState("");

    console.log("RIDES FROM CONTEXT:", rides);

    if (loadingRides) return <p>Loading rides...</p>;
    if (ridesError) return <p>{ridesError}</p>;

    const filteredRides = rides.filter(r =>
        statusFilter === "" ? true : r.status === statusFilter
    );

    return (
        <div className="ride-requests-page">
            <h1>Ride Requests</h1>

            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Assigned">Assigned</option>
                <option value="InProgress">InProgress</option>
                <option value="Completed">Completed</option>
            </select>

            <RideTable rides={filteredRides} />
            <></>


        </div>
    );
}
