import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ApplyLeave from "./pages/ApplyLeave";
import LeaveHistory from "./pages/LeaveHistory";
import ManagerDashboard from "./pages/ManagerDashboard";
import Employees from "./pages/Employees";
import LeaveRequests from "./pages/LeaveRequests";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
function App() {
    return (
        <BrowserRouter>

            <Toaster position="top-right" />

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />
                <Route
                  path="/register"
                  element={<Register />}
                />

                <Route
                  path="/employee"
                  element={
                  <ProtectedRoute allowedRole="employee">
                    <EmployeeDashboard />
                  </ProtectedRoute>
                  }
                />
                <Route
                  path="/employee/apply-leave"
                  element={
                  <ProtectedRoute allowedRole="employee">
                    <ApplyLeave />
                  </ProtectedRoute>
                  }
                />
                <Route
                  path="/employee/leave-history"
                  element={
                  <ProtectedRoute allowedRole="employee">
                    <LeaveHistory />

                  </ProtectedRoute>
                  }
                />
                <Route
                  path="/manager"
                  element={
                  <ProtectedRoute allowedRole="manager">
                    <ManagerDashboard />
                  </ProtectedRoute>
                  }
                />
                <Route
                  path="/manager/employees"
                  element={
                  <ProtectedRoute allowedRole="manager">
                    <Employees />
                  </ProtectedRoute>
                  }
                />
                <Route
                  path="/manager/leaves"
                  element={
                  <ProtectedRoute allowedRole="manager">
                    <LeaveRequests />
                  </ProtectedRoute>
                  }
                />
            </Routes>

        </BrowserRouter>
    );
}

export default App;