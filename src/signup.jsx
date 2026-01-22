import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { User, Mail, Lock, UserPlus, ArrowLeft } from "lucide-react";
import { viaeContext } from "./ViaeContext";
const BASE_URL = import.meta.env.VITE_SERVER_URL;
import "./styles/login.css";

function Signup() {
    const navigate = useNavigate();
    const { login } = useContext(viaeContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const savedRole = localStorage.getItem("selectedRole");
        if (!savedRole) {
            navigate("/");
        } else {
            setRole(savedRole);
        }
    }, [navigate])
    const isDriver = role === "driver";
    const themeClass = isDriver ? "theme-driver" : "theme-admin";



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, role }),
            })

            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Signup failed");
                return;
            }

            login(data.user);
            if (data.user.role === "admin") navigate("/admin");
            else if (data.user.role === "driver") navigate("/driver");

        } catch (err) {
            setError("Server not responding");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={`login-page-container ${themeClass}`}>
            <Container className="d-flex align-items-center justify-content-center min-vh-100">
                <Row className="login-card shadow-lg g-0 overflow-hidden">

                    <Col lg={5} className="d-none d-lg-flex flex-column justify-content-center p-5 brand-side text-white">
                        <h2 className="display-6 fw-bold">Viae</h2>
                        <p className="lead opacity-75">Join the network. Manage routes with ease.</p>
                        <div className="mt-4 p-3 bg-white bg-opacity-10 rounded-3">
                            <small>Signing up as a professional <strong>{role}</strong></small>
                        </div>
                    </Col>

                    <Col lg={7} className="bg-white p-4 p-md-5">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <button onClick={() => navigate("/")} className="btn-back">
                                <ArrowLeft size={20} />
                            </button>
                            <span className="badge-role">New {role} Account</span>
                        </div>

                        <div className="mb-4">
                            <h2 className="fw-bold">Create Account</h2>
                            <p className="text-muted small">Fill in your details to get started.</p>
                        </div>

                        {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-semibold">Full Name</Form.Label>
                                <div className="input-group-custom">
                                    <User className="input-icon" size={18} />
                                    <Form.Control
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-semibold">Email Address</Form.Label>
                                <div className="input-group-custom">
                                    <Mail className="input-icon" size={18} />
                                    <Form.Control
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label className="small fw-semibold">Password</Form.Label>
                                <div className="input-group-custom">
                                    <Lock className="input-icon" size={18} />
                                    <Form.Control
                                        type="password"
                                        placeholder="Min. 8 characters"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 py-3 rounded-pill btn-submit" disabled={loading}>
                                {loading ? "Creating Account..." : <><UserPlus size={18} className="me-2" /> Register Now</>}
                            </Button>

                            <p className="text-center mt-4 text-muted small">
                                Already have an account? <Link to="/login" className="fw-bold text-decoration-none text-theme">Log in</Link>
                            </p>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Signup;