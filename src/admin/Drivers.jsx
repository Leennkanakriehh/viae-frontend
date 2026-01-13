import { useState, useContext } from "react";
import { viaeContext } from "../ViaeContext";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import "../styles/AdminDrivers.css"
import AddDriverModal from "./AddDriverModal";
import EditDriverModal from "./EditDriverModal";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'

export default function Drivers() {
    const { drivers, deleteDriver } = useContext(viaeContext)
    const [displayModal, setDisplayModal] = useState(false)
    const [displayEditModal, setDisplayEditModal] = useState(false)
    const [editingDriver, setEditingDriver] = useState(null)

    function handleClick() {
        setDisplayModal(true)
    }
    function handleClose() {
        setDisplayModal(false)
    }
    function handleEdit() {
        setDisplayEditModal(true)
    }
    const deleteTooltip = (
        <Tooltip id="delete-tooltip">
            Delete driver
        </Tooltip>
    )

    return (
        <div className="drivers-page">
            <div className="drivers-header">
                <div>
                    <h1>Drivers</h1>
                    <p>Manage your fleet drivers</p>
                </div>
                <button className="add-driver-btn" onClick={handleClick}>Add Driver</button>
                <AddDriverModal show={displayModal} onHide={handleClose} />
            </div>


            <div className="drivers-card">
                <h3>All Drivers ({drivers.length})</h3>

                <table className="drivers-table">
                    <thead>
                        <tr>
                            <th>Driver ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Vehicle Info</th>
                            <th>Status</th>
                            <th>Total Rides</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {drivers.map((driver) => (
                            <tr key={driver.id}>
                                <td>{driver.id}</td>
                                <td>{driver.name}</td>
                                <td>{driver.email}</td>
                                <td>{driver.phone}</td>
                                <td>{driver.car} - {driver.plate}</td>
                                <td>
                                    <span className={`status ${driver.status.toLowerCase()}`}>
                                        {driver.status}
                                    </span>
                                </td>
                                <td>{driver.completedRides}</td>
                                <td>
                                    <button className="icon-btn"><img src={editIcon} alt="Edit" onClick={() => { handleEdit(); setEditingDriver(driver) }} /></button>
                                    <OverlayTrigger
                                        placement="right"
                                        overlay={deleteTooltip}
                                    >
                                        <button className="icon-btn delete" onClick={() => deleteDriver(driver.id)}><img src={deleteIcon} alt="Delete" /></button>
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        ))}
                        {drivers.length === 0 && (
                            <tr>
                                <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>No drivers found</td>
                            </tr>
                        )}
                    </tbody>
                    <EditDriverModal show={displayEditModal} onHide={() => setDisplayEditModal(false)} driver={editingDriver} />

                </table>
            </div>
        </div>
    )
}