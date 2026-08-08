import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ApplyLeave() {

    const navigate = useNavigate();

    const [reason, setReason] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!document) {
            toast.error("Please upload a supporting document");
            return;
        }

        const formData = new FormData();

        formData.append("reason", reason);
        formData.append("start_date", startDate);
        formData.append("end_date", endDate);
        formData.append("document", document);

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "https://employee-leave-management-system-production-1648.up.railway.app/api/leave/apply",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success(
                "Leave request submitted successfully!"
            );

            console.log(response.data);

            setReason("");
            setStartDate("");
            setEndDate("");
            setDocument(null);

            setTimeout(() => {
                navigate("/employee");
            }, 1000);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to submit leave request"
            );

        } finally {
            setLoading(false);
        }
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
                    maxWidth: "700px",
                    margin: "0 auto",
                    background: "white",
                    padding: "40px",
                    borderRadius: "18px",
                    boxShadow:
                        "0 10px 30px rgba(15, 23, 42, 0.10)"
                }}
            >

                {/* Back button */}

                <button
                    type="button"
                    onClick={() => navigate("/employee")}
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

                    <h1 style={{ marginBottom: "8px" }}>
                        Apply for Leave
                    </h1>

                    <p>
                        Fill in the details below to submit your
                        leave request.
                    </p>

                </div>


                <form onSubmit={handleSubmit}>

                    {/* Reason */}

                    <div style={{ marginBottom: "25px" }}>

                        <label>
                            Leave Reason
                        </label>

                        <textarea
                            value={reason}
                            onChange={(e) =>
                                setReason(e.target.value)
                            }
                            placeholder="Enter the reason for your leave"
                            required
                            rows="5"
                            style={{
                                width: "100%",
                                padding: "13px",
                                marginTop: "7px"
                            }}
                        />

                    </div>


                    {/* Dates */}

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: "20px",
                            marginBottom: "25px"
                        }}
                    >

                        {/* Start Date */}

                        <div>

                            <label>
                                Start Date
                            </label>

                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) =>
                                    setStartDate(e.target.value)
                                }
                                required
                                style={{
                                    width: "100%",
                                    padding: "13px",
                                    marginTop: "7px"
                                }}
                            />

                        </div>


                        {/* End Date */}

                        <div>

                            <label>
                                End Date
                            </label>

                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) =>
                                    setEndDate(e.target.value)
                                }
                                required
                                style={{
                                    width: "100%",
                                    padding: "13px",
                                    marginTop: "7px"
                                }}
                            />

                        </div>

                    </div>


                    {/* Document */}

                    <div
                        style={{
                            marginBottom: "30px",
                            padding: "22px",
                            background: "#f8fafc",
                            border: "1px dashed #94a3b8",
                            borderRadius: "12px"
                        }}
                    >

                        <label>
                            Supporting Document
                        </label>

                        <p style={{ fontSize: "14px" }}>
                            Upload a supporting document such as
                            a medical certificate or other relevant file.
                        </p>

                        <input
                            type="file"
                            onChange={(e) =>
                                setDocument(e.target.files[0])
                            }
                            required
                            style={{
                                width: "100%",
                                padding: "10px",
                                background: "white"
                            }}
                        />

                        {document && (

                            <p
                                style={{
                                    color: "#16a34a",
                                    fontWeight: "600",
                                    marginTop: "12px"
                                }}
                            >
                                ✓ Selected: {document.name}
                            </p>

                        )}

                    </div>


                    {/* Submit */}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "14px",
                            fontSize: "16px"
                        }}
                    >
                        {loading
                            ? "Submitting..."
                            : "Submit Leave Request"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default ApplyLeave;