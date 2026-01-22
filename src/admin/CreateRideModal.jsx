import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import { viaeContext } from "../ViaeContext";

export default function CreateRideModal(props) {
    const { createRide, geocodeAddress } = useContext(viaeContext);

    const [form, setForm] = useState({
        ride_code: "",
        pickup_location: "",
        destination: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [validatedPickup, setValidatedPickup] = useState(null);
    const [validatedDestination, setValidatedDestination] = useState(null);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!form.ride_code || !form.pickup_location || !form.destination) {
            setError("All fields are required");
            return;
        }

        try {
            setLoading(true);

            const pickupGeo = await geocodeAddress(form.pickup_location);
            const destGeo = await geocodeAddress(form.destination);

            setValidatedPickup(pickupGeo.display);
            setValidatedDestination(destGeo.display);

            await createRide({
                ride_code: form.ride_code,
                pickup_location: pickupGeo.display,
                destination: destGeo.display,
            })

            setForm({ ride_code: "", pickup_location: "", destination: "" })
            setValidatedPickup(null);
            setValidatedDestination(null);

            props.onHide();
        } catch (err) {
            setError(err.message || "failed to create ride");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal {...props} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    🚕 Create New Ride
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
                        <Form.Label>
                            Ride Code <Badge bg="secondary">Required</Badge>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="ride_code"
                            placeholder="RIDE-1001"
                            value={form.ride_code}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>
                            Pickup Location
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="pickup_location"
                            placeholder="Abdali Mall"
                            value={form.pickup_location}
                            onChange={handleChange}
                        />
                        {validatedPickup && (
                            <small className="text-success">
                                ✔ {validatedPickup}
                            </small>
                        )}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            Destination
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="destination"
                            placeholder="University of Jordan"
                            value={form.destination}
                            onChange={handleChange}
                        />
                        {validatedDestination && (
                            <small className="text-success">
                                ✔ {validatedDestination}
                            </small>
                        )}
                    </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={props.onHide}>
                        Cancel
                    </Button>

                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? (
                            <>
                                <Spinner size="sm" className="me-2" />
                                Validating Address…
                            </>
                        ) : (
                            "Create Ride"
                        )}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
