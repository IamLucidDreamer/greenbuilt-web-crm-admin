import React, {useEffect} from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Importing Components
import { Login } from "../auth/logIn/Index";
import { Dashboard } from "../dashboard/Index";
import { DashboardStats } from "../dashboardStats/Index";
import { Users } from "../users/Index";
import { Approvals } from "../approvals/Index";
import { PointsManager } from "../pointsManager/Index";
import { Assets } from "../assetMaster/Index";
import {
  getIndustryType,
  getPackagingType,
  getSourceType,
  getUom,
} from "../../store/actions/statics";
import { ActualConsumptionManager } from "../actualConsumptionManager/Index";
import { StaticsManager } from "../staticsManager/Index";
import { DefaultedPoints } from "../defaultedPoints/Index";

export const Navigation = () => {

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.user.auth);
  const token = JSON.parse(localStorage.getItem("jwt"));

  const navigate = useNavigate();
  const handleUnAuth = () => navigate("/login");

  
  useEffect(() => {
    dispatch(getIndustryType());
    dispatch(getSourceType());
    dispatch(getUom());
    dispatch(getPackagingType());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Handling the Admin User Routes */}

      {user.role === 3 && token && auth ? (
        <>
          <Route path="/admin" element={<Dashboard />}>
            <Route path="dashboard" element={<DashboardStats />} />
            <Route path="users" element={<Users />} />
            <Route path="approvals" element={<Approvals />} />
            <Route path="pointsmanager" element={<PointsManager />} />
            <Route path="actualconsumptionmanager" element={<ActualConsumptionManager />} />
            <Route path="staticsmanager" element={<StaticsManager />} />
            <Route path="defaultedpoint" element={<DefaultedPoints/>}/>
            <Route path="assetmaster" element={<Assets />} />
          </Route>
        </>
      ) : (
        () => handleUnAuth()
      )}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};
