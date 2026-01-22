import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPinOff, Home } from "lucide-react";
import "./styles/NotFound.css";

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="not-found-wrapper d-flex align-items-center justify-content-center">
            <div className="container text-center">
                <div className="error-content shadow-sm p-5 bg-white rounded-4">
                    <div className="icon-circle mb-4 mx-auto">
                        <MapPinOff size={60} strokeWidth={1.5} className="text-danger" />
                    </div>

                    <h1 className="display-1 fw-bold text-dark mb-0">404</h1>
                    <h2 className="h4 text-muted mb-4">Route Not Found</h2>

                    <p className="text-secondary mb-5 mx-auto" style={{ maxWidth: "400px" }}>
                        It looks like the path you're looking for has converged somewhere else.
                        Let’s get you back on track.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="btn btn-primary px-4 py-2 rounded-pill d-inline-flex align-items-center"
                    >
                        <Home size={18} className="me-2" />
                        Return Home
                    </button>
                </div>

                <footer className="mt-5 text-muted small opacity-50">
                    © 2026 Viae • Fleet Navigation System
                </footer>
            </div>
        </div>
    )
}

export default NotFound;