import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import GuardDashboard from "../pages/admin/GuardDashboard";
import CreateGatePass from "../pages/admin/CreateGatePass";
import VisitorRecords from "../pages/admin/VisitorRecords";
import GatePassPreview from "../pages/admin/GatePassPreview";
import Reports from "../pages/admin/Reports";

import LandingPage from "../pages/landing/LandingPage";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/login"
        element={<Login />}
      />


      {/* ================= PROTECTED ROUTES ================= */}

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >

        <Route
          path="/dashboard"
          element={<GuardDashboard />}
        />

        <Route
          path="/create-pass"
          element={<CreateGatePass />}
        />

        <Route
          path="/visitor-records"
          element={<VisitorRecords />}
        />

        <Route
          path="/gate-pass/:id"
          element={<GatePassPreview />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

      </Route>



      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
};

export default AppRoutes;