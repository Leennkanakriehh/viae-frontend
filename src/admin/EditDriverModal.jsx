import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useContext, useEffect } from "react";
import { viaeContext } from "../ViaeContext";


export default function EditDriverModal({ driver, ...props }) {
    const { updateDriver } = useContext(viaeContext)

    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        if (driver) {
            setUsername(driver.username);
            setPhone(driver.phone);
            setIsOnline(driver.status === "Online");
        }
    }, [driver]);

    function handleSubmit(e) {
        e.preventDefault();
        updateDriver(driver.id, {
            username,
            phone,
            is_online: isOnline
        });

        onHide();
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
                        <label>Username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>


                    <label>Phone</label>
                    <input
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                    />

                    <label>
                        <input
                            type="checkbox"
                            checked={isOnline}
                            onChange={e => setIsOnline(e.target.checked)}
                        />
                        Online
                    </label>

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