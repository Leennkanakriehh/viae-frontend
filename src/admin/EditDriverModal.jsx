import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useContext, useEffect } from "react";
import { viaeContext } from "../ViaeContext";


export default function EditDriverModal({ driver, ...props }) {
    const { updateDriver } = useContext(viaeContext)

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [car, setCar] = useState("");
    const [plate, setPlate] = useState("");

    useEffect(() => {
        if (driver) {
            setName(driver.name);
            setEmail(driver.email);
            setPhone(driver.phone);
            setCar(driver.car);
            setPlate(driver.plate);
        }
    }, [driver])

    function handleSubmit(e) {
        e.preventDefault();

        const updatedDriver = {
            ...driver,
            name,
            email,
            phone,
            car,
            plate,
        }

        updateDriver(updatedDriver)
        props.onHide()
    } if (!driver) return null;

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Driver
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="driver-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Vehicle</label>
                            <input value={car} onChange={(e) => setCar(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Plate</label>
                            <input value={plate} onChange={(e) => setPlate(e.target.value)} />
                        </div>
                    </div>

                    <div className="popup-actions">
                        <button type="submit" className="btn-submit">
                            Save Changes
                        </button>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}