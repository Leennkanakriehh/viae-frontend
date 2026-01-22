import { useContext, useEffect } from "react";
import { viaeContext } from "../ViaeContext";
import { Check, X, Clock, User } from "lucide-react";
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
    }, [])

    if (loadingPendingDrivers) return <div className="p-5 text-center">Loading applications...</div>;
    if (pendingDriversError) return <div className="alert alert-danger m-4">{pendingDriversError}</div>;

    return (
        <div className="drivers-page">
            <div className="drivers-header mb-4">
                <div className="d-flex align-items-center gap-2">
                    <Clock className="text-primary" size={28} />
                    <h1 className="m-0">Pending Applications</h1>
                </div>
                <p className="text-muted">Review and verify new driver registration requests.</p>
            </div>

            <div className="content-card shadow-sm border rounded bg-white">
                <div className="p-4 border-bottom bg-light d-flex justify-content-between align-items-center">
                    <h3 className="m-0 fs-6 fw-bold text-uppercase text-secondary">Awaiting Review ({pendingDrivers.length})</h3>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Applicant</th>
                            <th>Contact Details</th>
                            <th>Applied On</th>
                            <th className="text-end">Verification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingDrivers.map(driver => (
                            <tr key={driver.id}>
                                <td>
                                    <div className="fw-bold">{driver.username}</div>
                                    <div className="small text-muted">ID: #{String(driver.id).slice(-4)}</div>
                                </td>
                                <td>
                                    <div>{driver.email}</div>
                                    <div className="small text-secondary">{driver.phone}</div>
                                </td>
                                <td>
                                    <div className="small text-dark">
                                        {driver.appliedAt || "New Request"}
                                    </div>
                                </td>
                                <td>
                                    <div className="action-cell d-flex justify-content-end gap-2">
                                        <button
                                            className="btn-approve d-flex align-items-center gap-1"
                                            onClick={() => approvePendingDriver(driver.id)}
                                        >
                                            <Check size={16} /> Approve
                                        </button>
                                        <button
                                            className="btn-reject-pill d-flex align-items-center gap-1"
                                            onClick={() => rejectPendingDriver(driver.id)}
                                        >
                                            <X size={16} /> Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {pendingDrivers.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-5 text-muted">
                                    No pending driver applications at the moment.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
