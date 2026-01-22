// Add this as a sub-component or separate file
function RideRequestOverlay({ ride, onAccept, onDecline }) {
    if (!ride) return null;

    return (
        <div className="position-fixed bottom-0 start-50 translate-middle-x mb-4 z-3 w-100 px-3" style={{ maxWidth: '500px' }}>
            <MDBCard className="border-0 shadow-2-strong rounded-5 overflow-hidden animate__animated animate__slideInUp">
                <div className="bg-primary p-2 text-center text-white small fw-bold">
                    NEW RIDE REQUEST
                </div>
                <MDBCardBody className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">${ride.fare}</h5>
                        <span className="text-muted small">2.4 miles away</span>
                    </div>
                    <p className="mb-3 text-truncate fw-medium">
                        <MapPin size={16} className="text-danger me-2" />
                        {ride.pickup_location}
                    </p>
                    <div className="d-flex gap-2">
                        <MDBBtn color="danger" outline className="flex-grow-1 rounded-pill" onClick={onDecline}>Decline</MDBBtn>
                        <MDBBtn color="primary" className="flex-grow-2 w-100 rounded-pill shadow-0" onClick={onAccept}>Accept Ride</MDBBtn>
                    </div>
                </MDBCardBody>
            </MDBCard>
        </div>
    );
}