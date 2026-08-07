import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LeaveHistory() {

    const navigate = useNavigate();

    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/leave/my-leaves",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setLeaves(response.data.leaves || []);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to load leave history"
            );

        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {

        if (status === "Approved") {
            return {
                background: "#dcfce7",
                color: "#166534",
                padding: "6px 12px",
                borderRadius: "20px",
                fontWeight: "600",
                display: "inline-block"
            };
        }

        if (status === "Rejected") {
            return {
                background: "#fee2e2",
                color: "#991b1b",
                padding: "6px 12px",
                borderRadius: "20px",
                fontWeight: "600",
                display: "inline-block"
            };
        }

        return {
            background: "#fef3c7",
            color: "#92400e",
            padding: "6px 12px",
            borderRadius: "20px",
            fontWeight: "600",
            display: "inline-block"
        };
    };

    return (

        <div
            style={{
                minHeight: "100vh",
                padding: "40px 20px"
            }}
        >

            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto"
                }}
            >

                {/* Back Button */}

                <button
                    onClick={() => navigate("/employee")}
                    style={{
                        background: "#64748b",
                        padding: "10px 18px",
                        marginBottom: "25px"
                    }}
                >
                    ← Back to Dashboard
                </button>


                {/* Page Heading */}

                <div style={{ marginBottom: "30px" }}>

                    <h1>
                        Leave History
                    </h1>

                    <p>
                        View all your submitted leave requests
                        and their current approval status.
                    </p>

                </div>


                {/* Loading */}

                {loading ? (

                    <div
                        style={{
                            background: "white",
                            padding: "40px",
                            borderRadius: "16px",
                            textAlign: "center",
                            boxShadow:
                                "0 8px 25px rgba(15, 23, 42, 0.08)"
                        }}
                    >
                        <p>
                            Loading leave requests...
                        </p>
                    </div>

                ) : leaves.length === 0 ? (

                    /* No Requests */

                    <div
                        style={{
                            background: "white",
                            padding: "50px 30px",
                            borderRadius: "16px",
                            textAlign: "center",
                            boxShadow:
                                "0 8px 25px rgba(15, 23, 42, 0.08)"
                        }}
                    >

                        <div
                            style={{
                                fontSize: "50px",
                                marginBottom: "15px"
                            }}
                        >
                            📋
                        </div>

                        <h2>
                            No Leave Requests
                        </h2>

                        <p>
                            You have not submitted any leave
                            requests yet.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/employee/apply-leave")
                            }
                            style={{
                                padding: "12px 20px",
                                marginTop: "10px"
                            }}
                        >
                            Apply for Leave
                        </button>

                    </div>

                ) : (

                    /* Leave Table */

                    <div
                        style={{
                            background: "white",
                            padding: "25px",
                            borderRadius: "16px",
                            boxShadow:
                                "0 8px 25px rgba(15, 23, 42, 0.08)",
                            overflowX: "auto"
                        }}
                    >

                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                minWidth: "850px"
                            }}
                        >

                            <thead>

                                <tr>

                                    <th>Reason</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Status</th>
                                    <th>Manager Remarks</th>
                                    <th>Document</th>

                                </tr>

                            </thead>


                            <tbody>

                                {leaves.map((leave) => (

                                    <tr key={leave.id}>

                                        <td>
                                            {leave.reason}
                                        </td>

                                        <td>
                                            {leave.start_date}
                                        </td>

                                        <td>
                                            {leave.end_date}
                                        </td>

                                        <td>

                                            <span
                                                style={getStatusStyle(
                                                    leave.status
                                                )}
                                            >
                                                {leave.status}
                                            </span>

                                        </td>

                                        <td>
                                            {leave.remarks || "—"}
                                        </td>

                                        <td>

                                            {leave.document ? (

                                                <a
                                                    href={`http://localhost:5000/uploads/${leave.document}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    📄 View Document
                                                </a>

                                            ) : (

                                                <span>
                                                    No document
                                                </span>

                                            )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
}

export default LeaveHistory;