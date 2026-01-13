import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext } from "react";
import { viaeContext } from "../ViaeContext";
import "../styles/RideDetailsModal.css"

export default function RideDetailsModal({ onHide, ride, show }) {
    const { drivers } = useContext(viaeContext);

    if (!ride) return null;

    const driver = drivers.find(d => d.id === ride.driver);

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Ride Details - {ride.id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* STATUS */}
                <div className="ride-status">
                    <span className={`status ${ride.status?.toLowerCase() ?? ""}`}>
                        {ride.status}
                    </span>
                </div>

                {/* LOCATIONS */}
                <div className="ride-locations">
                    <div className="location-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                        <p className="label">Pickup Location</p>
                        <p>{ride.pickup}</p>
                    </div>

                    <div className="location-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                        <p className="label">Destination</p>

                        <p>{ride.destination}</p>
                    </div>
                </div>

                <hr />

                {/* TIMELINE */}
                <div className="ride-timeline">
                    <h5>Ride Timeline</h5>

                    <div className="timeline-item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                        </svg>
                        <p>Requested</p>
                        <small>{ride.requestedAt}</small>
                    </div>

                    {driver && (
                        <div className="timeline-item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                            </svg>
                            <p>Assigned to {driver.username}</p>
                            <small>{driver.car} - {driver.plate}</small>
                        </div>
                    )}

                    {ride.status === "Completed" && (
                        <div className="timeline-item">
                            <p>Completed</p>
                            <small>{ride.requestedAt}</small>
                        </div>
                    )}
                </div>

                <hr />

                {/* DRIVER INFO */}
                {driver && (
                    <div className="driver-info">
                        <h5>Driver Information</h5>

                        <div className="driver-card">
                            <div>
                                <p className="label">Name</p>
                                <p>{driver.username}</p>
                            </div>

                            <div>
                                <p className="label">Phone</p>
                                <p>{driver.phone}</p>
                            </div>

                            <div>
                                <p className="label">Vehicle</p>
                                <p>{driver.car} - {driver.plate}</p>
                            </div>

                            <div>
                                <p className="label">Total Rides</p>
                                <p>{driver.completedRides}</p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
