import { useContext } from "react";
import { viaeContext } from "../ViaeContext";
import VehicleManager from "./VehicleManager";
import {
    MDBContainer, MDBRow, MDBCol, MDBCard,
    MDBCardBody, MDBBadge
} from "mdb-react-ui-kit";
import {
    User, Mail, Phone,
    Hash, Award, CheckCircle
} from "lucide-react";

export default function Profile() {
    const { driverProfile, loadingDriverProfile } = useContext(viaeContext);

    if (loadingDriverProfile) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center mt-5" style={{ minHeight: "60vh" }}>
                <div className="spinner-border text-primary mb-3" role="status"></div>
                <p className="text-muted">Loading your credentials...</p>
            </div>
        );
    }

    if (!driverProfile) {
        return (
            <div className="text-center mt-5 text-muted p-5">
                <User size={48} className="mb-3 opacity-25" />
                <h5>No driver profile found</h5>
                <p>Please contact support if this is an error.</p>
            </div>
        );
    }

    const {
        driver_code,
        username,
        email,
        phone,
        is_online,
        total_rides,
    } = driverProfile;

    return (
        <MDBContainer fluid className="py-4 px-lg-5">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-end mb-4">
                <div>
                    <h2 className="fw-bold mb-1">My Account</h2>
                    <p className="text-muted mb-0">Manage your profile and vehicle details</p>
                </div>
                <MDBBadge
                    pill
                    className={`px-3 py-2 ${is_online ? 'bg-success-subtle text-success' : 'bg-light text-muted border'}`}
                >
                    <div className="d-flex align-items-center gap-2">
                        <div className={`status-dot ${is_online ? 'pulse' : ''}`} style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'currentColor' }}></div>
                        {is_online ? "Active Now" : "Currently Offline"}
                    </div>
                </MDBBadge>
            </div>

            <MDBRow className="g-4">
                {/* Left Column: Identity */}
                <MDBCol lg={7}>
                    <MDBCard className="border-0 shadow-sm rounded-4 h-100">
                        <MDBCardBody className="p-4">
                            <div className="d-flex align-items-center gap-2 mb-4">
                                <User className="text-primary" size={20} />
                                <h5 className="fw-bold mb-0 text-dark">Personal Information</h5>
                            </div>

                            <MDBRow className="g-4">
                                <ProfileItem icon={<Hash size={18} />} label="Driver ID" value={driver_code} />
                                <ProfileItem icon={<User size={18} />} label="Full Name" value={username} />
                                <ProfileItem icon={<Mail size={18} />} label="Email Address" value={email} />
                                <ProfileItem icon={<Phone size={18} />} label="Phone Number" value={phone || "Not linked"} />
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>

                {/* Right Column: Performance & Vehicle Management */}
                <MDBCol lg={5}>
                    {/* Performance Summary */}
                    <MDBCard className="border-0 shadow-sm rounded-4 mb-4 bg-primary text-white">
                        <MDBCardBody className="p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <Award size={32} className="opacity-75" />
                                <span className="small text-uppercase fw-bold opacity-75">Driver Score</span>
                            </div>
                            <h3 className="fw-bold mb-1">Expert Level</h3>
                            <p className="small mb-4 opacity-75">You've completed {total_rides} total trips</p>
                            <div className="d-flex align-items-center gap-2">
                                <CheckCircle size={16} />
                                <span className="small fw-medium">Identity Verified</span>
                            </div>
                        </MDBCardBody>
                    </MDBCard>

                    {/* VEHICLE MANAGEMENT SECTION */}
                    <VehicleManager />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}

function ProfileItem({ icon, label, value }) {
    return (
        <MDBCol md={6}>
            <label className="text-uppercase small fw-bold text-muted d-block mb-1">{label}</label>
            <div className="d-flex align-items-center gap-2">
                <span className="text-primary opacity-50">{icon}</span>
                <span className="fw-medium text-dark">{value}</span>
            </div>
        </MDBCol>
    );
}