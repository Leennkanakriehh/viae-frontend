import { useState } from "react"
import { viaeContext } from "./ViaeContext"

const initialRides = [
    {
        id: "R008",
        pickup: "100 Station Way, Transit",
        destination: "200 Airport Rd, Terminal",
        driver: null,
        status: "Pending",
        requestedAt: "2026-01-04"
    },
    {
        id: "R009",
        pickup: "10 Transit",
        destination: "200 Airport Rd, Terminal",
        driver: "Driver A",
        status: "Assigned",
        requestedAt: "2026-01-04"
    },
    {
        id: "R010",
        pickup: "Main Bus Stop, Downtown",
        destination: "City Mall",
        driver: "Driver B",
        status: "Completed",
        requestedAt: "2026-01-04"
    },
    {
        id: "R011",
        pickup: "University Gate",
        destination: "Tech Park",
        driver: null,
        status: "Completed",
        requestedAt: "2026-01-04"
    },
    {
        id: "R012",
        pickup: "Central Hospital",
        destination: "North Residential Area",
        driver: "Driver C",
        status: "Assigned",
        requestedAt: "2026-01-04"
    }
]
const initialDrivers = [
    {
        id: "D001",
        username: "John Smith",
        email: "john.smith@example.com",
        phone: "+1 (555) 123-4567",
        car: "Toyota Camry",
        plate: "ABC 1234",
        completedRides: 145,
        status: "Online"
    },
    {
        id: "D002",
        username: "Ted Moss",
        email: "john.smith@example.com",
        phone: "+1 (555) 123-4567",
        car: "Toyota Camry",
        plate: "ABC 1234",
        completedRides: 145,
        status: "Online"
    },
    {
        id: "D003",
        username: "Barney Hamelton",
        email: "john.smith@example.com",
        phone: "+1 (555) 123-4567",
        car: "Toyota Camry",
        plate: "ABC 1234",
        completedRides: 145,
        status: "Online"
    }
]

export function ViaeProvider({ children }) {
    const [rides, setRides] = useState(initialRides)
    const [drivers, setDrivers] = useState(initialDrivers);

    const stats = {
        totRidesDay: rides.length,
        activeDrivers: drivers.filter(d => d.status === "Online").length,
        pendingRequests: rides.filter(r => r.status === "Pending").length,
        completedToday: rides.filter(r => r.status === "Completed").length
    }
    const addRide = (ride) => {
        setRides(prev => [...prev, ride]);
    }

    const addDriver = (driver) => {
        setDrivers(prev => [...prev, driver])
    }
    const updateDriver = (updatedDriver) => {
        setDrivers(prev => prev.map(d => d.id === updatedDriver.id ? updatedDriver : d));
    }

    function deleteDriver(driverId) {
        setDrivers(prev => prev.filter(d => d.id !== driverId))
    }

    const assignDriver = (rideID, driverID) => {
        setRides(prev =>
            prev.map(ride =>
                ride.id === rideID
                    ? { ...ride, driver: driverID, status: "Assigned" }
                    : ride
            )
        )
    }

    return (
        <viaeContext.Provider value={{ rides, addRide, drivers, addDriver, assignDriver, stats, updateDriver, deleteDriver }}>
            {children}
        </viaeContext.Provider>
    )


}