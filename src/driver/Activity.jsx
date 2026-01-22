import { MDBBtn } from "mdb-react-ui-kit";
import { Power, ShieldCheck, ShieldAlert } from "lucide-react";

function Activity({ active, onToggle }) {
    return (
        <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center justify-content-between">
                <div>
                    <h6 className="fw-bold mb-1">
                        {active ? "You are Online" : "You are Offline"}
                    </h6>
                    <p className="text-muted small mb-0">
                        {active
                            ? "Actively looking for nearby passengers."
                            : "Toggle on to start receiving ride requests."}
                    </p>
                </div>
                {active ? (
                    <ShieldCheck className="text-success opacity-75" size={28} />
                ) : (
                    <ShieldAlert className="text-secondary opacity-50" size={28} />
                )}
            </div>

            <MDBBtn
                onClick={onToggle}
                color={active ? "danger" : "primary"}
                className={`w-100 py-3 rounded-3 shadow-0 d-flex align-items-center justify-content-center gap-2 fw-bold transition-all ${active ? "bg-danger-subtle text-danger border-danger-subtle" : ""
                    }`}
                style={{ transition: '0.3s' }}
            >
                <Power size={20} />
                {active ? "Go Offline" : "Go Online Now"}
            </MDBBtn>
        </div>
    )
}

export default Activity;