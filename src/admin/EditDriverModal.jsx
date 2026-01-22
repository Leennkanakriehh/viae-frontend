import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useContext, useEffect } from "react";
import { viaeContext } from "../ViaeContext";

export default function EditDriverModal({ driver, onHide, ...props }) {
    const { updateDriver } = useContext(viaeContext);

    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        if (driver) {
            setUsername(driver.username || "");
            setPhone(driver.phone || "");
            setIsOnline(driver.status === "Online");
        }
    }, [driver])

    if (!driver) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        updateDriver(driver.id, {
            username, phone, is_online: isOnline
        })
        onHide()
    };

    return (
        <Modal {...props} onHide={onHide} centered className="smooth-modal">
            <Modal.Header closeButton border={0}>
                <Modal.Title className="fw-bold">Edit Driver Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-4 pb-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="small fw-bold text-muted">USERNAME</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="smooth-input"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label className="small fw-bold text-muted">PHONE NUMBER</Form.Label>
                        <Form.Control
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className="smooth-input"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4 d-flex align-items-center gap-2">
                        <Form.Check
                            type="switch"
                            id="online-switch"
                            label="Active / Online Status"
                            checked={isOnline}
                            onChange={(e) => setIsOnline(e.target.checked)}
                        />
                    </Form.Group>

                    <div className="d-flex gap-2">
                        <Button variant="primary" type="submit" className="w-100 py-2 fw-bold">
                            Save Changes
                        </Button>
                        <Button variant="light" onClick={onHide} className="w-100 py-2 border">
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}