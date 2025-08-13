import React, { useEffect, useState } from "react";
import axios from "axios";

interface RegistrationData {
    id: number;
    ownerName: string;
    pan: string;
    aadhaar: string;
    mobile?: string;
    city?: string;
    state?: string;
    createdAt: string;
}

const DataList: React.FC = () => {
    const [data, setData] = useState<RegistrationData[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get("https://auto-udyam-registration-backend-railway-production.up.railway.app/api/registration/all");
            if (res.data.ok) {
                setData(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div style={{ marginTop: "20px", padding: "20px", background: "#f8f9fa", borderRadius: "8px" }}>
            <h2 style={{ marginBottom: "20px", color: "#333" }}>📋 All Registrations</h2>

            {loading ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <div className="loader"></div>
                    <p>Loading data...</p>
                </div>
            ) : data.length === 0 ? (
                <p style={{ textAlign: "center", color: "#888" }}>No records found.</p>
            ) : (
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        background: "#fff",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}
                >
                    <thead style={{ background: "#1976d2", color: "#fff" }}>
                        <tr>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Owner Name</th>
                            <th style={thStyle}>PAN</th>
                            <th style={thStyle}>Aadhaar</th>
                            <th style={thStyle}>City</th>
                            <th style={thStyle}>State</th>
                            <th style={thStyle}>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr
                                key={item.id}
                                style={{
                                    background: idx % 2 === 0 ? "#f9f9f9" : "#fff",
                                    transition: "background 0.3s",
                                    cursor: "pointer",
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.background = "#e3f2fd")}
                                onMouseOut={(e) => (e.currentTarget.style.background = idx % 2 === 0 ? "#f9f9f9" : "#fff")}
                            >
                                <td style={tdStyle}>{item.id}</td>
                                <td style={tdStyle}>{item.ownerName}</td>
                                <td style={tdStyle}>{item.pan}</td>
                                <td style={tdStyle}>{item.aadhaar}</td>
                                <td style={tdStyle}>{item.city || "-"}</td>
                                <td style={tdStyle}>{item.state || "-"}</td>
                                <td style={tdStyle}>{new Date(item.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Loader CSS */}
            <style>{`
        .loader {
          border: 5px solid #f3f3f3;
          border-top: 5px solid #1976d2;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          animation: spin 1s linear infinite;
          margin: auto;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
};

// Table styles
const thStyle: React.CSSProperties = {
    padding: "12px 15px",
    textAlign: "left",
    fontWeight: 600,
    fontSize: "14px",
};

const tdStyle: React.CSSProperties = {
    padding: "12px 15px",
    fontSize: "14px",
    color: "#333",
};

export default DataList;