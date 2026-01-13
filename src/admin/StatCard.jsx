export default function StatCard({ label, value, icon }) {
    return (
        <div className="stat-card">
            <div className="stat-header">
                <div className="stat-info">
                    <p className="stat-label">{label}</p>
                    <h2 className="stat-val">{value}</h2>
                </div>
                <div className="stat-icon-container">
                    <img src={icon} alt="" className="stat-card-icon" />
                </div>
            </div>
        </div>
    )
}