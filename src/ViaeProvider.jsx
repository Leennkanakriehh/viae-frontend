import { useState, useEffect } from "react"
import { viaeContext } from "./ViaeContext"
const BASE_URL = import.meta.env.VITE_SERVER_URL;

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

    //usersloadDrivers
    const STORAGE_KEY = "viae_user";

    // users
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    //drivers profiles 
    const [driverProfile, setDriverProfile] = useState(null);
    const [loadingDriverProfile, setLoadingDriverProfile] = useState(false);

    //vehicles
    const [vehicle, setVehicle] = useState(null);
    const [loadingVehicle, setLoadingVehicle] = useState(false);

    //ride history
    const [rideHistory, setRideHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem(STORAGE_KEY);
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setAuthLoading(false);
    }, []);


    const login = (userData) => {
        setUser(userData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    };

    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);

        // reset auth
        setUser(null);

        // reset app state
        setDrivers([]);
        setPendingDrivers([]);
        setRides([]);

        setRefreshDrivers(0);
        setRefreshPending(0);
        setRefreshRides(0);
    };

    function authFetch(url, options = {}) {
        return fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "x-role": user?.role ?? "",
                "x-user-id": user?.id ?? "",
                ...(options.headers || {})
            }
        });
    }

    //----------------------------------------------
    //externalAPI
    async function geocodeAddress(address) {
        try {
            if (!address) {
                throw new Error("Address is required");
            }

            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

            const res = await fetch(url, {
                headers: {
                    "Accept": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }

            const data = await res.json();

            if (!data.length) {
                throw new Error("Address not found");
            }

            return {
                lat: data[0].lat,
                lon: data[0].lon,
                display: data[0].display_name
            }
        } catch (err) {
            if (err.name === "AbortError") {
                throw new Error("requesttimed out");
            }

            throw new Error(err.message)
        }

    }


    //----driver opoerations FOR ADMIN------------------------
    //1. fetch all drivers
    useEffect(() => {
        // stop if user isn't an admin
        if (authLoading || !user || user.role !== "admin") return;

        async function loadDrivers() {
            try {
                setLoadingDrivers(true);
                setDriversError(null);


                const res = await authFetch(`${BASE_URL}/api/drivers`);
                if (!res.ok) throw new Error("Failed to fetch drivers");

                const data = await res.json();

                const normalized = data.map(d => ({
                    id: d.id,
                    username: d.username,
                    email: d.email,
                    phone: d.phone,
                    status: d.is_online ? "Online" : "Offline",
                }))

                setDrivers(normalized);
            } catch (err) {
                setDriversError(err.message);
            } finally {
                setLoadingDrivers(false);
            }
        }

        loadDrivers();
    }, [authLoading, user, refreshDrivers])



    //2. for pending drivers
    async function fetchPendingDrivers() {
        try {
            setLoadingPendingDrivers(true);
            setPendingDriversError(null);

            const res = await authFetch(`${BASE_URL}/api/admin/pending-drivers`);
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
        if (authLoading || !user || user.role !== "admin") return;
        fetchPendingDrivers();
    }, [authLoading, user, refreshPending]);


    //3.approve a pending on id
    async function approvePendingDriver(id) {
        try {
            const res = await authFetch(
                `${BASE_URL}/api/admin/approve-driver/${id}`,
                { method: "PATCH" }
            );

            if (!res.ok) throw new Error("Failed to approve");

            setRefreshPending(prev => prev + 1);
            setRefreshDrivers(prev => prev + 1);

        } catch (err) {
            alert(err.message);
        }
    }

    async function rejectPendingDriver(id) {
        try {
            const res = await authFetch(
                `${BASE_URL}/api/admin/reject-driver/${id}`,
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
            const res = await authFetch(
                `${BASE_URL}/api/drivers/${driverId}`,
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
            const res = await authFetch(
                `${BASE_URL}/api/drivers/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedData),
                }
            );

            if (!res.ok) {
                throw new Error("failed to update driver");
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
    //ride history per driver
    async function fetchRideHistory() {
        try {
            setLoadingHistory(true);
            const res = await authFetch(`${BASE_URL}/api/rides/my/history`);

            if (res.ok) {
                const data = await res.json();
                setRideHistory(data);
            }
        } catch (err) {
            console.error("Error fetching history:", err);
        } finally {
            setLoadingHistory(false);
        }
    }
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
        if (authLoading || !user) return;

        async function loadRides() {
            try {
                setLoadingRides(true);
                setRidesError(null);

                const res = await authFetch(`${BASE_URL}/api/rides`);
                if (!res.ok) throw new Error("Failed to fetch rides");

                const data = await res.json();

                const normalized = data.map(r => ({
                    id: r.id,
                    rideCode: r.ride_code,
                    pickup: r.pickup_location,
                    destination: r.destination,
                    driver: r.driver_name ?? null,
                    driverId: r.driver_id,
                    rawStatus: r.status,
                    status: normalizeRideStatus(r.status),
                    requestedAt: r.requested_at,
                }));

                setRides(normalized);
            } catch (err) {
                setRidesError(err.message);
            } finally {
                setLoadingRides(false);
            }
        }

        loadRides();
    }, [authLoading, user, refreshRides])


    //2. assign driver
    async function assignDriver(rideId, driverId) {
        try {
            const res = await authFetch(
                `${BASE_URL}/api/rides/${rideId}/assign`,
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
            const res = await authFetch(`${BASE_URL}/api/rides`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(rideData),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Failed");
            }
            setRefreshRides(prev => prev + 1);
        } catch (err) {
            alert(err.message);
        }
    }

    //---------driver operations---------------------------------------
    //1. start ride 
    async function startRide(rideId) {
        try {
            const res = await authFetch(
                `${BASE_URL}/api/rides/${rideId}/start`,
                { method: "PUT" }
            );

            if (!res.ok) throw new Error("Failed to start ride");

            setRefreshRides(prev => prev + 1);
        } catch (err) {
            alert(err.message);
        }
    }

    //2. complete ride
    async function completeRide(rideId) {
        try {
            const res = await authFetch(
                `${BASE_URL}/api/rides/${rideId}/complete`,
                { method: "PUT" }
            );

            if (!res.ok) throw new Error("Failed to complete ride");

            setRefreshRides(prev => prev + 1);
        } catch (err) {
            alert(err.message);
        }
    }
    // (DRIVERS ONLY) rides assigned to the logged-in driver
    const assignedRides = user?.role === "driver" ? rides : [];
    const stats = {
        totRidesDay: rides.length,
        activeDrivers: drivers.filter(d => d.status === "Online").length,
        pendingRequests: rides.filter(r => r.status === "Pending").length,
        completedToday: rides.filter(r => r.status === "Completed").length
    }

    //3. fetch driver profile
    useEffect(() => {
        if (authLoading || !user || user.role !== "driver") return;

        async function loadProfile() {
            try {
                setLoadingDriverProfile(true);

                const res = await authFetch(`${BASE_URL}/api/drivers/me`);
                if (!res.ok) throw new Error("Failed to load profile");

                const data = await res.json();
                setDriverProfile(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingDriverProfile(false);
            }
        }

        loadProfile();
    }, [authLoading, user])

    //4.isOnline?
    async function toggleAvailability(isOnline) {
        try {
            const res = await authFetch(
                `${BASE_URL}/api/drivers/me/availability`,
                {
                    method: "PUT",
                    body: JSON.stringify({ is_online: isOnline })
                }
            );

            if (!res.ok) throw new Error("Failed to update availability");

            const data = await res.json();

            setDriverProfile(prev => ({
                ...prev,
                is_online: data.is_online
            }));
        } catch (err) {
            alert(err.message);
        }
    }

    //----vehicle operations--------------------------------
    // 2. Fetch vehicle for the logged-in driver
    useEffect(() => {
        if (authLoading || !user || user.role !== "driver") return;

        async function loadDriverVehicle() {
            try {
                setLoadingVehicle(true);

                const res = await authFetch(`${BASE_URL}/api/vehicles/driver/${user.id}`);

                if (res.ok) {
                    const data = await res.json();
                    setVehicle(data);
                }
            } catch (err) {
                console.error("Vehicle fetch error:", err);
            } finally {
                setLoadingVehicle(false);
            }
        }

        loadDriverVehicle();
    }, [authLoading, user]);

    // 3. Update Vehicle Function
    async function updateVehicleInfo(vehicleId, vehicleData) {
        try {
            const res = await authFetch(`${BASE_URL}/api/vehicles/${vehicleId}`, {
                method: "PUT",
                body: JSON.stringify(vehicleData),
            });

            if (!res.ok) throw new Error("Failed to update vehicle");

            const updated = await res.json();
            setVehicle(updated);
            return { success: true };
        } catch (err) {
            alert(err.message);
            return { success: false };
        }
    }

    async function saveVehicle(vehicleData) {
        const isUpdate = !!vehicle?.id;
        const url = isUpdate
            ? `${BASE_URL}/api/vehicles/${vehicle.id}`
            : `${BASE_URL}/api/vehicles`;

        const method = isUpdate ? "PUT" : "POST";

        try {
            setLoadingVehicle(true);
            const res = await authFetch(url, {
                method: method,
                body: JSON.stringify({
                    ...vehicleData,
                    driver_id: user.id
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to save vehicle data");
            }

            const data = await res.json();

            setVehicle(data);
            return { success: true };
        } catch (err) {
            alert(err.message);
            return { success: false };
        } finally {
            setLoadingVehicle(false);
        }
    } async function saveVehicle(vehicleData) {
        const isUpdate = !!vehicle?.id;
        const url = isUpdate
            ? `${BASE_URL}/api/vehicles/${vehicle.id}`
            : `${BASE_URL}/api/vehicles`;

        const method = isUpdate ? "PUT" : "POST";

        try {
            setLoadingVehicle(true);
            const res = await authFetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...vehicleData,
                    driver_id: user.id
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to save");
            }

            const data = await res.json();
            setVehicle(data);
            alert("Vehicle saved successfully!");
            return { success: true };
        } catch (err) {
            alert(err.message);
            return { success: false };
        } finally {
            setLoadingVehicle(false);
        }
    }


    // 4. create vehicle
    async function registerVehicle(vehicleData) {
        try {
            const res = await authFetch(`${BASE_URL}/api/vehicles`, {
                method: "POST",
                body: JSON.stringify({ ...vehicleData, driver_id: user.id }),
            });

            if (!res.ok) throw new Error("Failed to register vehicle");

            const newVehicle = await res.json();
            setVehicle(newVehicle);
            return { success: true };
        } catch (err) {
            alert(err.message);
            return { success: false };
        }
    }

    //save 
    //-----------------------------------------------------------------------

    return (
        <viaeContext.Provider value={{
            user,
            login,
            logout,
            authLoading,
            // drivers
            drivers,
            loadingDrivers,
            driversError,
            updateDriver,
            deleteDriver,

            //driver profile
            driverProfile,
            loadingDriverProfile,
            toggleAvailability,

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

            // drivers rides
            assignedRides,
            startRide,
            completeRide,
            // stats
            stats,

            //XAPI
            geocodeAddress,

            vehicle,
            loadingVehicle,
            updateVehicleInfo,
            registerVehicle,

            saveVehicle,
            rideHistory,
            loadingHistory,
            fetchRideHistory

        }}>
            {children}
        </viaeContext.Provider>
    )


}