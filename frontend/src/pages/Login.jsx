import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://employee-leave-management-system-production-1648.up.railway.app/api/auth/login",
                {
                    username,
                    password
                }
            );

            const { token, user } = response.data;

            // Save login information
            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role);
            localStorage.setItem("username", user.username);

            toast.success("Login successful!");

            // Redirect based on role
            if (user.role === "manager") {
                navigate("/manager");
            } else {
                navigate("/employee");
            }

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <div
            style={{
                maxWidth: "450px",
                margin: "70px auto",
                padding: "40px",
                border: "1px solid #ddd",
                borderRadius: "16px",
                background: "white",
                boxShadow: "0 10px 30px rgba(15, 23, 42, 0.10)"
            }}
        >

            <h1 style={{
                    textAlign: "center",
                    fontSize: "30px",
                    lineHeight: "1.3",
                    marginBottom: "25px"}}
            >
                Employee Leave Management

            </h1>

            <h2 style={{
                    textAlign: "center",
                    marginBottom: "25px"
                }}
            >
                Login
            </h2>

            <form onSubmit={handleLogin}>

                <div style={{ marginBottom: "15px" }}>
                    <label>Username</label>

                    <input
                        type="text"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        placeholder="Enter username"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    />
                </div>


                <div style={{ marginBottom: "15px" }}>
                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="Enter password"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    />
                </div>


                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "12px",
                        cursor: "pointer"
                    }}
                >
                    Login
                </button>

            </form>


            {/* Employee Registration */}

            <div
                style={{
                    marginTop: "20px",
                    textAlign: "center"
                }}
            >

                <p>
                    Don't have an employee account?
                </p>

                <button
                    type="button"
                    onClick={() => navigate("/register")}
                    style={{
                        width: "100%",
                        padding: "10px",
                        cursor: "pointer"
                    }}
                >
                    Register as Employee
                </button>

            </div>

        </div>
    );
}

export default Login;