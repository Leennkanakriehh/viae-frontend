import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { viaeContext } from "./ViaeContext";
const BASE_URL = import.meta.env.VITE_SERVER_URL;
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { LogIn, ArrowLeft, Mail, Lock } from "lucide-react";
import "./styles/login.css";

function Login() {
    const { login } = useContext(viaeContext);
    const navigate = useNavigate();
    const selectedRole = localStorage.getItem("selectedRole") || "user";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    //theme based on role
    const isDriver = selectedRole === "driver";
    const themeClass = isDriver ? "theme-driver" : "theme-admin";

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })
            const data = await res.json();


            if (!res.ok) {
                setError(data.message || "Login failed");
                return;
            }

            const userData = data.user || data;
            login(userData);
            if (userData.role === "admin") navigate("/admin");
            else if (userData.role === "driver") navigate("/driver");
            else if (userData.role === "pending_driver") setError("Your account is pending admin approval.");
            else setError(`Unknown user role: ${userData.role}`);

        } catch (err) {
            setError("Server not responding. Please try again later.");
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
                        <p className="lead opacity-75">Precision fleet management for the modern world.</p>
                        <div className="mt-auto">
                            <small className="opacity-50">Secure Portal Access</small>
                        </div>
                    </Col>

                    <Col lg={7} className="bg-white p-4 p-md-5">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <button onClick={() => navigate("/")} className="btn-back">
                                <ArrowLeft size={20} />
                            </button>
                            <span className="badge-role">{selectedRole} Portal</span>
                        </div>

                        <div className="text-center mb-4">
                            <h2 className="fw-bold">Welcome Back</h2>
                            <p className="text-muted small">Please enter your credentials to access your dashboard.</p>
                        </div>

                        {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 position-relative" controlId="formBasicEmail">
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

                            <Form.Group className="mb-4 position-relative" controlId="formBasicPassword">
                                <Form.Label className="small fw-semibold">Password</Form.Label>
                                <div className="input-group-custom">
                                    <Lock className="input-icon" size={18} />
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100 py-3 rounded-pill btn-submit" disabled={loading}>
                                {loading ? "Authenticating..." : <><LogIn size={18} className="me-2" /> Sign In</>}
                            </Button>

                            <p className="text-center mt-4 text-muted small">
                                Don’t have an account? <Link to="/signup" className="fw-bold text-decoration-none text-theme">Sign up</Link>
                            </p>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;