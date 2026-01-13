import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { viaeContext } from "../ViaeContext";
import { useState, useContext, use } from "react";


export default function AddDriverModal(props) {
    const { addDriver } = useContext(viaeContext)

    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [car, setCar] = useState("")
    const [plate, setPlate] = useState("")
    const [completedRides, setCompletedRides] = useState(0)

    function handleSubmit(e) {
        e.preventDefault();
        const newDriver = {
            id: `D${Math.floor(Math.random() * 10000)}`,
            name: username,
            email,
            phone: phonenumber,
            car,
            plate,
            status: "Offline",
            completedRides
        }

        addDriver(newDriver)
        props.onHide()
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Driver
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Enter driver details to register them in the fleet management system.</h4>
                <form className="driver-form" onSubmit={handleSubmit}>
                    {/* Heading */}
                    <div className="form-heading">
                        <h2>Add New Driver</h2>
                        <p className="form-subheading">
                            Enter driver details to register them in the fleet management system.
                        </p>
                    </div>

                    {/* Full Name */}
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            required
                            placeholder="e.g. John Smith"
                            onChange={(e) => setUserName(e.target.value)
                            }
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                required
                                placeholder="e.g. john@example.com"
                                onChange={(e) => setEmail(e.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                id="phone"
                                type="text"
                                required
                                placeholder="+962 7X XXX XXXX"
                                onChange={(e) => setPhonenumber(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {/* Vehicle Info */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="car">Vehicle Model</label>
                            <input
                                id="car"
                                type="text"
                                required
                                placeholder="e.g. Toyota Camry"
                                onChange={(e) => setCar(e.target.value)
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="plate">License Plate</label>
                            <input
                                id="plate"
                                type="text"
                                required
                                placeholder="ABC-1234"
                                onChange={(e) => setPlate(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="popup-actions">
                        <button type="submit" className="btn-submit" >
                            Add Driver
                        </button>
                    </div>

                </form>

            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-submit" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
