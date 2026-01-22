import "../styles/Dashboard.css"
export default function StatCard({ label, value, icon: Icon, colorClass }) {
    return (
        <div className={`stat-card ${colorClass}`}>
            <div className="stat-header">
                <div className="stat-info">
                    <p className="stat-label">{label}</p>
                    <h2 className="stat-val">{value}</h2>
                </div>
                <div className="stat-icon-wrapper">
                    {/* Render the Lucide icon directly */}
                    <Icon size={24} strokeWidth={2.5} />
                </div>
            </div>
        </div>
    );
}