export default function History({ rides }) {
    return (
        <div>
            <h1>Ride History</h1>
            <h7>View your completed and ongoing rides</h7>
            {/* {rides.map((ride) => (
                <div key={ride.id} style={cardStyle}>
                    <div style={headerStyle}>
                        <strong>{ride.id}</strong>
                        <span style={statusStyle}>{ride.status}</span>
                    </div>

                    <p><b>Pickup:</b> {ride.pickup}</p>
                    <p><b>Destination:</b> {ride.destination}</p>

                    <p>
                        {ride.startTime} → {ride.endTime}
                    </p>
                </div>
            ))} */}
        </div>
    )
    const cardStyle = {
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "16px",
        backgroundColor: "#fff"
    };

    const headerStyle = {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "12px"
    };

    const statusStyle = {
        backgroundColor: "#dcfce7",
        color: "#166534",
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "14px"
    };

}
