import { useNavigate } from "react-router-dom";

function ManagerDashboard() {

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
                        Manager Portal
                    </h2>

                    <small>
                        Employee Leave Management System
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
                        Welcome, {username || "Manager"} 👋
                    </h1>

                    <p>
                        Manage employees and review their leave requests.
                    </p>

                </div>


                {/* Manager Cards */}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "25px"
                    }}
                >

                    {/* Employees */}

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
                            👥
                        </div>

                        <h2>
                            Employees
                        </h2>

                        <p>
                            View all registered employees and
                            their account information.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/manager/employees")
                            }
                            style={{
                                padding: "12px 20px",
                                marginTop: "10px"
                            }}
                        >
                            View Employees →
                        </button>

                    </div>


                    {/* Leave Requests */}

                    <div
                        style={{
                            background: "white",
                            padding: "30px",
                            borderRadius: "16px",
                            boxShadow:
                                "0 8px 25px rgba(15, 23, 42, 0.08)",
                            borderTop: "5px solid #f59e0b"
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
                            Leave Requests
                        </h2>

                        <p>
                            Review employee leave requests,
                            documents and approval status.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/manager/leaves")
                            }
                            style={{
                                padding: "12px 20px",
                                marginTop: "10px"
                            }}
                        >
                            Review Requests →
                        </button>

                    </div>

                </div>


                {/* Manager Information */}

                <div
                    style={{
                        marginTop: "30px",
                        background: "#fff8e7",
                        padding: "25px",
                        borderRadius: "14px",
                        border: "1px solid #fde68a"
                    }}
                >

                    <h3>
                        🛡️ Manager Controls
                    </h3>

                    <p style={{ marginBottom: 0 }}>
                        Review submitted leave requests carefully.
                        You can inspect supporting documents and
                        approve or reject requests with appropriate
                        remarks.
                    </p>

                </div>

            </main>

        </div>
    );
}

export default ManagerDashboard;