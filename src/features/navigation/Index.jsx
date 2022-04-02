import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Importing Components
import { Login } from "../auth/logIn/Index";
import { Dashboard } from "../dashboard/Index";
import { DashboardStats } from "../dashboardStats/Index";
import { Users } from "../users/Index";
import { Approvals } from "../approvals/Index";
import { PointsManager } from "../pointsManager/Index";

export const Navigation = () => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.user.auth);
  const token = JSON.parse(localStorage.getItem("jwt"));

  const navigate = useNavigate();
  const handleUnAuth = () => navigate("/login");
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Handling the Business User Routes */}

      {user.role === 3 && token && auth ? (
        <>
          <Route path="/admin" element={<Dashboard />}>
            <Route path="dashboard" element={<DashboardStats />} />
            <Route path="users" element={<Users />} />
            <Route path="approvals" element={<Approvals />} />
            <Route path="pointsmanager" element={<PointsManager />} />
          </Route>
        </>
      ) : (
        () => handleUnAuth()
      )}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};
