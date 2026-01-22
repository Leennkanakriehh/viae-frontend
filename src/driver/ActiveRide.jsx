import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import { MapPin, Navigation, Phone, User } from "lucide-react";

function ActiveRide({ ride }) {
    //no ride assigned +++ uncompleted
    if (!ride) {
        return (
            <div className="p-5 text-center">
                <div className="mb-3 opacity-25">
                    <Navigation size={48} className="text-muted" />
                </div>
                <h5 className="text-muted fw-medium">No Active Ride</h5>
                <p className="small text-secondary mb-0">New requests will appear here once you're online.</p>
            </div>
        )
    }

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-start mb-4">
                <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill fw-bold">
                    IN PROGRESS
                </span>
                <div className="text-end">
                    <p className="text-muted small mb-0">Estimated Fare</p>
                    <h4 className="fw-bold text-success mb-0">${ride.fare || "0.00"}</h4>
                </div>
            </div>

            <MDBRow className="mb-4">
                <MDBCol md="6" className="mb-3 mb-md-0">
                    <div className="d-flex gap-3 mb-4">
                        <div className="d-flex flex-column align-items-center">
                            <div className="p-1 bg-primary rounded-circle shadow-sm"></div>
                            <div className="vr h-100 my-1 opacity-25"></div>
                            <MapPin size={18} className="text-danger" />
                        </div>
                        <div className="flex-grow-1">
                            <div className="mb-3">
                                <label className="text-uppercase small fw-bold text-muted d-block">Pickup</label>
                                <span className="fw-medium text-dark">{ride.pickup_location || "Not provided"}</span>
                            </div>
                            <div>
                                <label className="text-uppercase small fw-bold text-muted d-block">Destination</label>
                                <span className="fw-medium text-dark">{ride.destination || "Not provided"}</span>
                            </div>
                        </div>
                    </div>
                </MDBCol>

                <MDBCol md="6" className="border-start-md ps-md-4">
                    <div className="bg-light p-3 rounded-4 d-flex align-items-center gap-3 mb-3">
                        <div className="bg-white p-2 rounded-circle shadow-sm text-primary">
                            <User size={24} />
                        </div>
                        <div className="flex-grow-1">
                            <h6 className="fw-bold mb-0">{ride.passenger_name || "Guest Passenger"}</h6>
                            <p className="small text-muted mb-0">Passenger</p>
                        </div>
                        <MDBBtn color="light" className="shadow-0 p-2 rounded-circle border">
                            <Phone size={18} className="text-primary" />
                        </MDBBtn>
                    </div>
                </MDBCol>
            </MDBRow>

            <MDBBtn className="w-100 py-3 rounded-4 shadow-sm fw-bold">
                Complete Ride
            </MDBBtn>
        </div>
    )
}
export default ActiveRide;