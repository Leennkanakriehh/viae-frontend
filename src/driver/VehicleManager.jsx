import { useState, useContext, useEffect } from "react";
import { viaeContext } from "../ViaeContext";
import { MDBCard, MDBCardBody, MDBBtn, MDBInput, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { Car, Save, AlertCircle } from "lucide-react";

export default function VehicleManager() {
    const { vehicle, saveVehicle, loadingVehicle } = useContext(viaeContext);
    const [formData, setFormData] = useState({
        model: "",
        plate_number: "",
        color: "",
        year: ""
    });

    // Sync form with existing vehicle data if it exists
    useEffect(() => {
        if (vehicle) {
            setFormData({
                model: vehicle.model || "",
                plate_number: vehicle.plate_number || "",
                color: vehicle.color || "",
                year: vehicle.year || ""
            });
        }
    }, [vehicle]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveVehicle(formData);
    };

    if (loadingVehicle) return <div className="spinner-border text-primary"></div>;

    return (
        <MDBCard className="border-0 shadow-sm rounded-4">
            <MDBCardBody className="p-4">
                <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="bg-primary bg-opacity-10 p-2 rounded-3">
                        <Car className="text-primary" size={24} />
                    </div>
                    <div>
                        <h5 className="fw-bold mb-0">
                            {vehicle ? "Update Vehicle" : "Register Vehicle"}
                        </h5>
                        <p className="text-muted small mb-0">
                            {vehicle ? "Modify your current vehicle details" : "Add your vehicle to start receiving rides"}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <MDBRow className="g-3">
                        <MDBCol md="6">
                            <label className="small fw-bold text-muted mb-1">Vehicle Model</label>
                            <MDBInput
                                placeholder="e.g. Toyota Camry"
                                value={formData.model}
                                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                required
                            />
                        </MDBCol>
                        <MDBCol md="6">
                            <label className="small fw-bold text-muted mb-1">Plate Number</label>
                            <MDBInput
                                placeholder="e.g. ABC-1234"
                                value={formData.plate_number}
                                onChange={(e) => setFormData({ ...formData, plate_number: e.target.value })}
                                required
                            />
                        </MDBCol>
                        <MDBCol md="6">
                            <label className="small fw-bold text-muted mb-1">Color</label>
                            <MDBInput
                                placeholder="e.g. Silver"
                                value={formData.color}
                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                            />
                        </MDBCol>
                        <MDBCol md="6">
                            <label className="small fw-bold text-muted mb-1">Year</label>
                            <MDBInput
                                type="number"
                                placeholder="e.g. 2022"
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            />
                        </MDBCol>
                    </MDBRow>

                    {!vehicle && (
                        <div className="mt-4 p-3 bg-warning bg-opacity-10 rounded-3 d-flex gap-2">
                            <AlertCircle className="text-warning" size={20} />
                            <p className="small text-warning-emphasis mb-0">
                                You must register a vehicle before you can go online.
                            </p>
                        </div>
                    )}

                    <MDBBtn type="submit" className="w-100 mt-4 py-3 rounded-3 shadow-0 fw-bold">
                        <Save size={18} className="me-2" />
                        {vehicle ? "Update Details" : "Register Vehicle"}
                    </MDBBtn>
                </form>
            </MDBCardBody>
        </MDBCard>
    );
}