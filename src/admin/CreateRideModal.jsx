import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { viaeContext } from "../ViaeContext";

export default function CreateRideModal(props) {
    const { createRide } = useContext(viaeContext);

    const [form, setForm] = useState({
        ride_code: "",
        pickup_location: "",
        destination: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!form.ride_code || !form.pickup_location || !form.destination) {
            setError("All fields are required");
            return;
        }

        try {
            setLoading(true);
            await createRide(form);

            // Reset + close modal
            setForm({
                ride_code: "",
                pickup_location: "",
                destination: "",
            });

            props.onHide();
        } catch (err) {
            setError("Failed to create ride");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="create-ride-modal-title"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="create-ride-modal-title">
                    Create New Ride
                </Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label>Ride Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="ride_code"
                            placeholder="RIDE-1001"
                            value={form.ride_code}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Pickup Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="pickup_location"
                            placeholder="Abdali Mall"
                            value={form.pickup_location}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Destination</Form.Label>
                        <Form.Control
                            type="text"
                            name="destination"
                            placeholder="University of Jordan"
                            value={form.destination}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? "Creating..." : "Create Ride"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
