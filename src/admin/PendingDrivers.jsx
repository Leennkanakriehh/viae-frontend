import { useContext, useEffect } from "react";
import { viaeContext } from "../ViaeContext";
import "../styles/Pending.css"

export default function PendingDrivers() {
    const {
        pendingDrivers,
        fetchPendingDrivers,
        loadingPendingDrivers,
        pendingDriversError,
        approvePendingDriver,
        rejectPendingDriver
    } = useContext(viaeContext);

    useEffect(() => {
        fetchPendingDrivers();
    }, []);

    if (loadingPendingDrivers) {
        return <p>Loading pending drivers...</p>;
    }

    if (pendingDriversError) {
        return <p>{pendingDriversError}</p>;
    }

    return (
        <div className="drivers-page">
            <h1>Pending Driver Applications</h1>

            <table className="drivers-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {pendingDrivers.map(driver => (
                        <tr key={driver.id}>
                            <td>{driver.id}</td>
                            <td>{driver.username}</td>
                            <td>{driver.email}</td>
                            <td>{driver.phone}</td>
                            <td>
                                <button
                                    onClick={() => approvePendingDriver(driver.id)}
                                >
                                    Approve
                                </button>

                                <button
                                    className="btn-reject"
                                    onClick={() => rejectPendingDriver(driver.id)}
                                >
                                    Reject
                                </button>
                            </td>

                        </tr>
                    ))}

                    {pendingDrivers.length === 0 && (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                No pending drivers
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
