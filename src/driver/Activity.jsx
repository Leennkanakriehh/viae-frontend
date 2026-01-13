export default function Activity({ active, onToggle }) {
    return (
        <div className="activity-container">
            <div className="activity-text">
                <h3>Availability Status</h3>
                <p>You are currently: <span className={active ? "status-on" : "status-off"}>
                    {active ? "Online" : "Offline"}
                </span></p>
            </div>
            {/* Using a checkbox for a real toggle look */}
            <div className="toggle-wrapper">
                <span>{active ? "Online" : "Offline"}</span>
                <button className={`toggle-btn ${active ? "on" : "off"}`} onClick={onToggle}>
                    <div className="slider"></div>
                </button>
            </div>
        </div>
    )
}