import { useState, useEffect } from "react"
import { viaeContext } from "./ViaeContext"
import { API_URL } from "./config";


export function ViaeProvider({ children }) {

    const [refreshDrivers, setRefreshDrivers] = useState(0);
    const [refreshPending, setRefreshPending] = useState(0);
    const [refreshRides, setRefreshRides] = useState(0);


    //states for hadling drivers operations
    const [drivers, setDrivers] = useState([])
    const [loadingDrivers, setLoadingDrivers] = useState(true);
    const [driversError, setDriversError] = useState(null)

    //states for hadling driver requests operations
    const [pendingDrivers, setPendingDrivers] = useState([]);
    const [loadingPendingDrivers, setLoadingPendingDrivers] = useState(false);
    const [pendingDriversError, setPendingDriversError] = useState(null);

    //states for hadling rides operations
    const [rides, setRides] = useState([]);
    const [loadingRides, setLoadingRides] = useState(true);
    const [ridesError, setRidesError] = useState(null);

    //----driver opoerations------------------------
    //1. fetch all drivers
    useEffect(() => {
        async function loadDrivers() {
            try {
                setLoadingDrivers(true);
                setDriversError(null);

                const res = await fetch(`${API_URL}/api/drivers`);
                if (!res.ok) throw new Error("Failed to fetch drivers");

                const data = await res.json();

                const normalized = data.map(d => ({
                    id: d.id,
                    username: d.username,
                    email: d.email,
                    phone: d.phone,
                    status: d.is_online ? "Online" : "Offline",
                }));

                setDrivers(normalized);
            } catch (err) {
                setDriversError(err.message);
            } finally {
                setLoadingDrivers(false);
            }
        }

        loadDrivers();
    }, [refreshDrivers]);


    //2. for pending drivers
    async function fetchPendingDrivers() {
        try {
            setLoadingPendingDrivers(true);
            setPendingDriversError(null);

            const res = await fetch(`${API_URL}/api/admin/pending-drivers`);
            if (!res.ok) throw new Error("Failed to fetch pending drivers");

            const data = await res.json();
            setPendingDrivers(data);
        } catch (err) {
            setPendingDriversError(err.message);
        } finally {
            setLoadingPendingDrivers(false);
        }
    }
    useEffect(() => {
        fetchPendingDrivers();
    }, [refreshPending])


    //3.approve a pending on id
    async function approvePendingDriver(id) {
        try {
            const res = await fetch(
                `${API_URL}/api/admin/approve-driver/${id}`,
                { method: "PATCH" }
            );

            if (!res.ok) throw new Error("Failed to approve");

            // 🔄 trigger refresh
            setRefreshPending(prev => prev + 1);
            setRefreshDrivers(prev => prev + 1);

        } catch (err) {
            alert(err.message);
        }
    }

    //3.reject pending on id
    async function rejectPendingDriver(id) {
        try {
            const res = await fetch(
                `${API_URL}/api/admin/reject-driver/${id}`,
                { method: "PATCH" }
            );

            if (!res.ok) throw new Error("Failed to reject");

            setRefreshPending(prev => prev + 1);
        } catch (err) {
            alert(err.message);
        }
    }


    //4. delete driver 
    async function deleteDriver(driverId) {
        try {
            const res = await fetch(
                `${API_URL}/api/drivers/${driverId}`,
                { method: "DELETE" }
            );

            if (!res.ok) {
                throw new Error("Failed to delete driver");
            }

            setDrivers(prev => prev.filter(d => d.id !== driverId));

        } catch (err) {
            alert(err.message);
        }
    }

    //5. edit driver
    async function updateDriver(id, updatedData) {
        try {
            const res = await fetch(
                `${API_URL}/api/drivers/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedData),
                }
            );

            if (!res.ok) {
                throw new Error("Failed to update driver");
            }

            const updated = await res.json();

            setDrivers(prev =>
                prev.map(d => d.id === id ? { ...d, username: updated.username, phone: updated.phone, status: updated.is_online ? "Online" : "Offline" } : d)
            );
        } catch (err) {
            alert(err.message);
        }
    }
    //---Ride operations----------------------------------------------------

    //normalizing status
    function normalizeRideStatus(status) {
        switch (status) {
            case "requested":
                return "Pending";
            case "assigned":
                return "Assigned";
            case "in_progress":
                return "InProgress";
            case "completed":
                return "Completed";
            default:
                return "Pending";
        }
    }
    //-----rides operations------------------------------
    //1. fetch rides
    useEffect(() => {
        async function loadRides() {
            try {
                setLoadingRides(true);
                setRidesError(null);
                const res = await fetch(`${API_URL}/api/rides`);
                if (!res.ok) throw new Error("Failed to fetch rides");

                const data = await res.json();

                const normalized = data.map(r => ({
                    id: r.id,
                    rideCode: r.ride_code,
                    pickup: r.pickup_location,
                    destination: r.destination,
                    driver: r.driver_name ?? null,
                    driverId: r.driver_id,
                    //backend
                    rawStatus: r.status,
                    //UI
                    status: normalizeRideStatus(r.status),
                    requestedAt: r.requested_at,
                }))

                setRides(normalized);
            } catch (err) {
                setRidesError(err.message);
            } finally {
                setLoadingRides(false);
            }
        }
        loadRides();
    }, [refreshRides])

    //2. assign driver
    async function assignDriver(rideId, driverId) {
        try {
            const res = await fetch(
                `${API_URL}/api/rides/${rideId}/assign`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ driver_id: Number(driverId) }),

                }
            );

            if (!res.ok) throw new Error("Failed to assign driver");
            setRefreshRides(prev => prev + 1);
        } catch (err) {
            alert(err.message);
        }
    }
    //3.create ride
    // CREATE ride
    async function createRide(rideData) {
        try {
            const res = await fetch(`${API_URL}/api/rides`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(rideData),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Failed to create ride");
            }
            setRefreshRides(prev => prev + 1);
        } catch (err) {
            alert(err.message);
        }
    }

    //------------------------------------------------


    const stats = {
        totRidesDay: rides.length,
        activeDrivers: drivers.filter(d => d.status === "Online").length,
        pendingRequests: rides.filter(r => r.status === "Pending").length,
        completedToday: rides.filter(r => r.status === "Completed").length
    }







    return (
        <viaeContext.Provider value={{
            // drivers
            drivers,
            loadingDrivers,
            driversError,
            updateDriver,
            deleteDriver,

            // pending drivers
            pendingDrivers,
            fetchPendingDrivers,
            loadingPendingDrivers,
            pendingDriversError,
            approvePendingDriver,
            rejectPendingDriver,

            // rides
            rides,
            createRide,
            loadingRides,
            ridesError,
            assignDriver,

            // stats
            stats,

        }}>
            {children}
        </viaeContext.Provider>
    )


}