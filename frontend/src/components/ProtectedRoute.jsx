import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    // Not logged in
    if (!token) {
        return <Navigate to="/" replace />;
    }

    // Logged in but wrong role
    if (allowedRole && role !== allowedRole) {

        if (role === "manager") {
            return <Navigate to="/manager" replace />;
        }

        return <Navigate to="/employee" replace />;
    }

    return children;
}

export default ProtectedRoute;