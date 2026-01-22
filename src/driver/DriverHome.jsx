import { useContext } from "react";
import { viaeContext } from "../ViaeContext";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard,
    MDBCardBody, MDBBadge
} from "mdb-react-ui-kit";
import {
    Clock, AlertCircle, CheckCircle, XCircle,
    Navigation, DollarSign, Star, Zap, User
} from "lucide-react";
import Activity from "./Activity";
import ActiveRide from "./ActiveRide";

// DELETE THE LINE THAT WAS HERE (outside the function)

function DriverHome() {
    // MOVE IT HERE inside the function
    const {
        user, // Added user here
        driverProfile,
        loadingDriverProfile,
        toggleAvailability
    } = useContext(viaeContext);

    if (loadingDriverProfile) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <div className="spinner-border text-primary mb-3" role="status"></div>
                <p className="text-muted fw-medium">Syncing your dashboard...</p>
            </div>
        );
    }

    /* ... rest of your status checks (pending, rejected, etc) ... */

    if (!driverProfile) {
        return (
            <MDBContainer className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <MDBCard className="border-0 shadow-lg text-center p-4" style={{ maxWidth: "450px", borderRadius: "24px" }}>
                    <MDBCardBody>
                        <AlertCircle size={60} className="text-danger mb-4 opacity-75" />
                        <h4 className="fw-bold mb-2">Profile Unreachable</h4>
                        <p className="text-muted">We couldn't retrieve your driver data.</p>
                        <button className="btn btn-primary w-100 rounded-pill py-2 mt-3">Retry Sync</button>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        );
    }

    return (
        <MDBContainer fluid className="py-4 px-lg-5">
            <MDBRow className="mb-4 align-items-center">
                <MDBCol md="8">
                    <div className="d-flex align-items-center gap-3">
                        <div className="avatar-placeholder rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                            <User size={24} />
                        </div>
                        <div>
                            {/* Use user.username from context safely */}
                            <h2 className="fw-bold mb-0">Hello, {user?.username || driverProfile.username}!</h2>
                            <p className="text-muted mb-0 small">Check your stats and active tasks below.</p>
                        </div>
                    </div>
                </MDBCol>
                <MDBCol md="4" className="text-md-end mt-3 mt-md-0">
                    <MDBBadge
                        pill
                        className={`px-4 py-2 fs-6 ${driverProfile.is_online ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'}`}
                    >
                        <div className="d-flex align-items-center gap-2">
                            <div className={`status-dot ${driverProfile.is_online ? 'pulse' : ''}`}></div>
                            {driverProfile.is_online ? "Receiving Rides" : "Offline"}
                        </div>
                    </MDBBadge>
                </MDBCol>
            </MDBRow>

            {/* Availability Toggle */}
            <MDBRow className="mb-4">
                <MDBCol lg="4" md="6">
                    <MDBCard className="border-0 shadow-sm rounded-4 overflow-hidden">
                        <MDBCardBody className="p-4">
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <Zap size={18} className="text-primary" />
                                <span className="small fw-bold text-muted text-uppercase">Availability</span>
                            </div>
                            <Activity
                                active={driverProfile.is_online}
                                onToggle={() => toggleAvailability(!driverProfile.is_online)}
                            />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>

            {/* Main Active Content Area */}
            <MDBRow className="mb-5">
                <MDBCol>
                    <MDBCard className="border-0 shadow-sm rounded-4">
                        <MDBCardBody className="p-0">
                            <ActiveRide />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>

            {/* Quick Stats Grid */}
            <h5 className="fw-bold mb-4 text-secondary">Quick Stats</h5>
            <MDBRow className="g-4">
                <MDBCol lg="4" md="6">
                    <StatCard icon={<Navigation className="text-primary" />} label="Today's Rides" value="0" />
                </MDBCol>
                <MDBCol lg="4" md="6">
                    <StatCard icon={<DollarSign className="text-success" />} label="Daily Earnings" value="$0.00" />
                </MDBCol>
                <MDBCol lg="4" md="6">
                    <StatCard icon={<Star className="text-warning" />} label="Service Rating" value="—" />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <MDBCard className="border-0 shadow-sm rounded-4">
            <MDBCardBody className="p-4 text-center">
                <div className="mb-2 d-flex justify-content-center">{icon}</div>
                <p className="text-muted mb-1 small fw-medium uppercase-label">{label}</p>
                <h3 className="fw-bold mb-0">{value}</h3>
            </MDBCardBody>
        </MDBCard>
    );
}

export default DriverHome;