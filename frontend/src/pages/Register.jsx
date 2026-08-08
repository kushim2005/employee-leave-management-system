import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must contain at least 6 characters");
            return;
        }

        try {

            setLoading(true);

            await axios.post(
                "https://employee-leave-management-system-production-1648.up.railway.app/api/auth/register",
                {
                    username,
                    password
                }
            );

            toast.success(
                "Registration successful! Please login."
            );

            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (

        <div
            style={{
                maxWidth: "450px",
                margin: "80px auto",
                padding: "30px",
                border: "1px solid #ddd",
                borderRadius: "10px"
            }}
        >

            <h1>Employee Registration</h1>

            <p>
                Create your employee account.
            </p>

            <form onSubmit={handleRegister}>

                <div style={{ marginBottom: "15px" }}>

                    <label>
                        Username
                    </label>

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

                    <label>
                        Password
                    </label>

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


                <div style={{ marginBottom: "20px" }}>

                    <label>
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        placeholder="Confirm password"
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
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        cursor: "pointer"
                    }}
                >
                    {loading
                        ? "Creating Account..."
                        : "Register"}
                </button>

            </form>


            <div style={{ marginTop: "20px" }}>

                <button
                    onClick={() => navigate("/")}
                    style={{
                        width: "100%",
                        padding: "10px"
                    }}
                >
                    ← Back to Login
                </button>

            </div>

        </div>
    );
}

export default Register;