import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext } from "react";
import { viaeContext } from "../ViaeContext";
import { MapPin, Clock, User, Car, Phone } from "lucide-react"; // Smooth icons
import "../styles/RideDetailsModal.css"

export default function RideDetailsModal({ onHide, ride, show }) {
    const { drivers } = useContext(viaeContext);

    if (!ride) return null;

    // Find the driver object if one is assigned
    const driver = drivers?.find(d => d.id === ride.driverId || d.id === ride.driver);

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md" // Changed to md for a tighter, smoother look
            centered
            className="smooth-modal"
        >
            <Modal.Header closeButton className="border-0 pb-0">
                <Modal.Title className="fw-bold fs-5">
                    Ride Details <span className="text-muted fw-normal">#{String(ride.id).slice(-5)}</span>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="pt-3">
                {/* STATUS HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded-3">
                    <span className="small fw-bold text-muted text-uppercase">Current Status</span>
                    <span className={`status-badge ${ride.status?.toLowerCase()}`}>
                        {ride.status}
                    </span>
                </div>

                {/* LOCATIONS SECTION */}
                <div className="location-timeline mb-4">
                    <div className="d-flex gap-3 mb-3">
                        <div className="icon-column d-flex flex-column align-items-center">
                            <MapPin size={18} className="text-primary" />
                            <div className="line"></div>
                        </div>
                        <div>
                            <p className="small text-muted mb-0 uppercase-label">Pickup</p>
                            <p className="fw-medium mb-0">{ride.pickup}</p>
                        </div>
                    </div>

                    <div className="d-flex gap-3">
                        <div className="icon-column">
                            <MapPin size={18} className="text-danger" />
                        </div>
                        <div>
                            <p className="small text-muted mb-0 uppercase-label">Destination</p>
                            <p className="fw-medium mb-0">{ride.destination}</p>
                        </div>
                    </div>
                </div>

                <hr className="my-4 opacity-50" />

                {/* DETAILS GRID */}
                <div className="details-grid">
                    <div className="detail-item">
                        <Clock size={16} className="text-muted" />
                        <div>
                            <span className="d-block small text-muted">Requested At</span>
                            <span className="fw-medium">{ride.requestedAt || "Just now"}</span>
                        </div>
                    </div>

                    {driver && (
                        <>
                            <div className="detail-item">
                                <User size={16} className="text-muted" />
                                <div>
                                    <span className="d-block small text-muted">Driver</span>
                                    <span className="fw-medium">{driver.username}</span>
                                </div>
                            </div>

                            <div className="detail-item">
                                <Car size={16} className="text-muted" />
                                <div>
                                    <span className="d-block small text-muted">Vehicle</span>
                                    <span className="fw-medium">
                                        {/* Logic: Check if vehicle data exists on the driver object */}
                                        {driver.vehicle_model || driver.model || "No Model"} • {driver.plate_number || "No Plate"}
                                    </span>
                                </div>
                            </div>
                            <div className="detail-item">
                                <Phone size={16} className="text-muted" />
                                <div>
                                    <span className="d-block small text-muted">Contact</span>
                                    <span className="fw-medium">{driver.phone}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Modal.Body>

            <Modal.Footer className="border-0">
                <Button variant="light" className="w-100 py-2 border fw-bold" onClick={onHide}>
                    Dismiss
                </Button>
            </Modal.Footer>
        </Modal>
    );
}