import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Employees() {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/manager/employees",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setEmployees(response.data.employees || []);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Failed to load employees"
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
                    maxWidth: "1000px",
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
                        Employees
                    </h1>

                    <p>
                        View all registered employees in the
                        leave management system.
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
                            Loading employees...
                        </p>

                    </div>

                ) : employees.length === 0 ? (

                    /* No Employees */

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
                            👥
                        </div>

                        <h2>
                            No Employees
                        </h2>

                        <p>
                            No employee accounts have been
                            registered yet.
                        </p>

                    </div>

                ) : (

                    /* Employee Table */

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

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "20px"
                            }}
                        >

                            <h2 style={{ margin: 0 }}>
                                Registered Employees
                            </h2>

                            <span
                                style={{
                                    background: "#eaf2ff",
                                    color: "#173f73",
                                    padding: "7px 14px",
                                    borderRadius: "20px",
                                    fontWeight: "600"
                                }}
                            >
                                {employees.length} Employee
                                {employees.length !== 1 ? "s" : ""}
                            </span>

                        </div>


                        <table
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                minWidth: "650px"
                            }}
                        >

                            <thead>

                                <tr>

                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Date Joined</th>

                                </tr>

                            </thead>


                            <tbody>

                                {employees.map((employee) => (

                                    <tr key={employee.id}>

                                        <td>
                                            #{employee.id}
                                        </td>

                                        <td>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px"
                                                }}
                                            >

                                                <div
                                                    style={{
                                                        width: "38px",
                                                        height: "38px",
                                                        borderRadius: "50%",
                                                        background: "#eaf2ff",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontSize: "18px"
                                                    }}
                                                >
                                                    👤
                                                </div>

                                                <strong>
                                                    {employee.username}
                                                </strong>

                                            </div>

                                        </td>

                                        <td>
                                            {employee.created_at
                                                ? new Date(
                                                    employee.created_at
                                                ).toLocaleDateString()
                                                : "—"}
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

export default Employees;