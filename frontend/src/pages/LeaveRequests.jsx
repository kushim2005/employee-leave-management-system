import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LeaveRequests() {

    const navigate = useNavigate();

    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [remarks, setRemarks] = useState({});

    useEffect(() => {
        fetchLeaveRequests();
    }, []);

    const fetchLeaveRequests = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/manager/leaves",
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
                "Failed to load leave requests"
            );

        } finally {

            setLoading(false);

        }
    };


    const handleRemarkChange = (id, value) => {

        setRemarks({
            ...remarks,
            [id]: value
        });

    };


    const updateLeaveStatus = async (id, status) => {

        const remark = remarks[id] || "";

        if (!remark.trim()) {

            toast.error(
                "Please enter remarks before approving or rejecting."
            );

            return;
        }

        try {

            const token = localStorage.getItem("token");

            await axios.put(
                `http://localhost:5000/api/manager/leaves/${id}/status`,
                {
                    status: status,
                    remarks: remark
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(
                `Leave request ${status.toLowerCase()} successfully`
            );

            fetchLeaveRequests();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to update leave status"
            );

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
                    maxWidth: "1250px",
                    margin: "0 auto"
                }}
            >

                {/* Back Button */}

                <button
                    onClick={() => navigate("/manager")}
                    style={{
                        background: "#64748b",
                        padding: "10px 18px",
                        marginBottom: "25px"
                    }}
                >
                    ← Back to Dashboard
                </button>


                {/* Heading */}

                <div style={{ marginBottom: "30px" }}>

                    <h1>
                        Leave Requests
                    </h1>

                    <p>
                        Review employee leave requests,
                        supporting documents and approval status.
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
                            There are currently no leave requests
                            waiting for review.
                        </p>

                    </div>

                ) : (

                    /* Requests Table */

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
                                minWidth: "1100px"
                            }}
                        >

                            <thead>

                                <tr>

                                    <th>ID</th>
                                    <th>Employee</th>
                                    <th>Reason</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Document</th>
                                    <th>Status</th>
                                    <th>Remarks</th>
                                    <th>Action</th>

                                </tr>

                            </thead>


                            <tbody>

                                {leaves.map((leave) => (

                                    <tr key={leave.id}>

                                        <td>
                                            #{leave.id}
                                        </td>


                                        <td>
                                            <strong>
                                                {leave.username}
                                            </strong>
                                        </td>


                                        <td
                                            style={{
                                                maxWidth: "200px"
                                            }}
                                        >
                                            {leave.reason}
                                        </td>


                                        <td>
                                            {leave.start_date}
                                        </td>


                                        <td>
                                            {leave.end_date}
                                        </td>


                                        <td>

                                            {leave.document ? (

                                                <a
                                                    href={`http://localhost:5000/uploads/${leave.document}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    📄 View
                                                </a>

                                            ) : (

                                                <span>
                                                    No document
                                                </span>

                                            )}

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

                                            {leave.status === "Pending" ? (

                                                <textarea
                                                    value={
                                                        remarks[leave.id] || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleRemarkChange(
                                                            leave.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Enter remarks..."
                                                    rows="3"
                                                    style={{
                                                        width: "180px",
                                                        padding: "10px",
                                                        resize: "vertical"
                                                    }}
                                                />

                                            ) : (

                                                <span>
                                                    {leave.remarks || "—"}
                                                </span>

                                            )}

                                        </td>


                                        <td>

                                            {leave.status === "Pending" ? (

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "8px",
                                                        minWidth: "120px"
                                                    }}
                                                >

                                                    <button
                                                        onClick={() =>
                                                            updateLeaveStatus(
                                                                leave.id,
                                                                "Approved"
                                                            )
                                                        }
                                                        style={{
                                                            background:
                                                                "#16a34a"
                                                        }}
                                                    >
                                                        ✅ Approve
                                                    </button>


                                                    <button
                                                        onClick={() =>
                                                            updateLeaveStatus(
                                                                leave.id,
                                                                "Rejected"
                                                            )
                                                        }
                                                        style={{
                                                            background:
                                                                "#dc2626"
                                                        }}
                                                    >
                                                        ❌ Reject
                                                    </button>

                                                </div>

                                            ) : (

                                                <span
                                                    style={{
                                                        color: "#64748b",
                                                        fontWeight: "600"
                                                    }}
                                                >
                                                    ✓ Processed
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

export default LeaveRequests;