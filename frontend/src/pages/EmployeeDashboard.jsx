import { useNavigate } from "react-router-dom";

function EmployeeDashboard() {

    const navigate = useNavigate();

    const username = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");

        navigate("/");
    };

    return (
        <div style={{ minHeight: "100vh" }}>

            {/* Header */}

            <header
                style={{
                    background: "#173f73",
                    color: "white",
                    padding: "18px 40px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 3px 12px rgba(0,0,0,0.12)"
                }}
            >

                <div>
                    <h2
                        style={{
                            color: "white",
                            margin: 0
                        }}
                    >
                        Employee Portal
                    </h2>

                    <small>
                        Leave Management System
                    </small>
                </div>


                <button
                    onClick={handleLogout}
                    style={{
                        background: "#ef4444",
                        padding: "10px 18px"
                    }}
                >
                    Logout
                </button>

            </header>


            {/* Main Content */}

            <main
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                    padding: "45px 25px"
                }}
            >

                <div style={{ marginBottom: "35px" }}>

                    <h1>
                        Welcome, {username || "Employee"} 👋
                    </h1>

                    <p>
                        Manage your leave requests and view your leave history.
                    </p>

                </div>


                {/* Dashboard Cards */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "25px"
                    }}
                >

                    {/* Apply Leave */}

                    <div
                        style={{
                            background: "white",
                            padding: "30px",
                            borderRadius: "16px",
                            boxShadow:
                                "0 8px 25px rgba(15, 23, 42, 0.08)",
                            borderTop: "5px solid #2563eb"
                        }}
                    >

                        <div
                            style={{
                                fontSize: "40px",
                                marginBottom: "15px"
                            }}
                        >
                            📝
                        </div>

                        <h2>
                            Apply for Leave
                        </h2>

                        <p>
                            Submit a new leave request with dates,
                            reason and supporting documents.
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
                            Apply Leave →
                        </button>

                    </div>


                    {/* Leave History */}

                    <div
                        style={{
                            background: "white",
                            padding: "30px",
                            borderRadius: "16px",
                            boxShadow:
                                "0 8px 25px rgba(15, 23, 42, 0.08)",
                            borderTop: "5px solid #16a34a"
                        }}
                    >

                        <div
                            style={{
                                fontSize: "40px",
                                marginBottom: "15px"
                            }}
                        >
                            📋
                        </div>

                        <h2>
                            Leave History
                        </h2>

                        <p>
                            View your previous leave requests,
                            approval status and manager remarks.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/employee/leave-history")
                            }
                            style={{
                                padding: "12px 20px",
                                marginTop: "10px"
                            }}
                        >
                            View History →
                        </button>

                    </div>

                </div>


                {/* Information Card */}

                <div
                    style={{
                        marginTop: "30px",
                        background: "#eaf2ff",
                        padding: "25px",
                        borderRadius: "14px",
                        border: "1px solid #bfdbfe"
                    }}
                >

                    <h3>
                        💡 Leave Management
                    </h3>

                    <p style={{ marginBottom: 0 }}>
                        Submit your leave request in advance and
                        attach supporting documents when required.
                        You can track the approval status from
                        your Leave History.
                    </p>

                </div>

            </main>

        </div>
    );
}

export default EmployeeDashboard;