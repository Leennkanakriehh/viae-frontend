import { useState, useContext } from "react";
import { viaeContext } from "../ViaeContext";
import { Edit, Trash2 } from "lucide-react";
import "../styles/AdminDrivers.css";
import EditDriverModal from "./EditDriverModal";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function Drivers() {
    const { drivers, deleteDriver, loadingDrivers, driversError } = useContext(viaeContext);
    const [displayEditModal, setDisplayEditModal] = useState(false);
    const [editingDriver, setEditingDriver] = useState(null);

    if (loadingDrivers) return <div className="p-5 text-center">Loading drivers...</div>;
    if (driversError) return <div className="alert alert-danger m-4">{driversError}</div>;

    const handleEdit = (driver) => {
        setEditingDriver(driver);
        setDisplayEditModal(true);
    };

    return (
        <div className="drivers-page">
            <div className="drivers-header mb-4">
                <h1>Fleet Management</h1>
                <p className="text-muted">Manage and monitor your active driver network.</p>
            </div>

            <div className="content-card shadow-sm border rounded bg-white">
                <div className="p-4 border-bottom">
                    <h3 className="m-0 fs-5">Active Drivers ({drivers.length})</h3>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Driver Details</th>
                            <th>Contact Info</th>
                            <th>Vehicle & Plate</th>
                            <th>Current Status</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver) => (
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
                                    <div className="fw-medium text-dark">{driver.car || "No Vehicle"}</div>
                                    <div className="small text-muted">{driver.plate}</div>
                                </td>
                                <td>
                                    <span className={`status-badge ${driver.status.toLowerCase()}`}>
                                        {driver.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-cell d-flex justify-content-end gap-2">
                                        <button className="btn-details" onClick={() => handleEdit(driver)}>
                                            <Edit size={16} />
                                        </button>

                                        <OverlayTrigger overlay={<Tooltip>Delete Driver</Tooltip>}>
                                            <button className="btn-details text-danger" onClick={() => deleteDriver(driver.id)}>
                                                <Trash2 size={16} />
                                            </button>
                                        </OverlayTrigger>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <EditDriverModal
                show={displayEditModal}
                onHide={() => setDisplayEditModal(false)}
                driver={editingDriver}
            />
        </div>
    );
}