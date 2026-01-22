import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { viaeContext } from "./ViaeContext";

// admin ONLY
export function AdminRoute() {
    const { user, authLoading } = useContext(viaeContext);

    //wait--> finish loading
    if (authLoading) return null;
    if (!user) return <Navigate to="/login" replace />;

    // if wrong role
    if (user.role !== "admin") return <Navigate to="/" replace />;

    return <Outlet />;
}

// driver Only
export function DriverRoute() {
    const { user, authLoading } = useContext(viaeContext);

    if (authLoading) return null;

    if (!user) return <Navigate to="/login" replace />;
    if (user.role !== "driver") return <Navigate to="/" replace />;

    return <Outlet />;
}
