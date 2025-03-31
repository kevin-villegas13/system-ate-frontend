import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/templates/DashboardLayout";
import UserPage from "../pages/dashboard/users/UserPage";
import AffiliatePage from "../pages/dashboard/affiliate/AffiliatePage";
import AffiliateChildrenPage from "../pages/dashboard/affiliate/children/AffiliateChildrenPage";
import ChildrenPage from "../pages/dashboard/children/ChildrenPage";
import DashboardHomePage from "../pages/dashboard/home/DashboardHomePage";
import EventPage from "../pages/dashboard/events/EventPage";
import SectorPage from "../pages/dashboard/sectors/SectorsPage";
import BenefitsPage from "../pages/dashboard/benefits/BenefitsPage";
import DelegatesPage from "../pages/dashboard/delegates/DelegatesPage";
import ManageBenefitsPage from "../pages/dashboard/delegates/manageBenefits/ManageBenefitsPage";
import DistributionPage from "../pages/dashboard/distribution/DistributionPage";
import ReportsPage from "../pages/dashboard/reports/ReportsPage";
import LoginPage from "../pages/login/LoginPage";
import { useAuth } from "../lib/hooks/useAuth";
import { Loader } from "../components/atoms/Loader";

export default function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />

      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        }
      />

      <Route
        path="/dashboard"
        element={
          isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />
        }
      >
        <Route index element={<DashboardHomePage />} />
        <Route path="usuarios" element={<UserPage />} />
        <Route path="afiliados" element={<AffiliatePage />} />
        <Route path="afiliados/:id/hijos" element={<AffiliateChildrenPage />} />
        <Route path="hijos" element={<ChildrenPage />} />
        <Route path="eventos" element={<EventPage />} />
        <Route path="sectores" element={<SectorPage />} />
        <Route path="delegados" element={<DelegatesPage />} />
        <Route
          path="delegados/gestionar-beneficio"
          element={<ManageBenefitsPage />}
        />
        <Route path="beneficios" element={<BenefitsPage />} />
        <Route path="beneficios/distribucion" element={<DistributionPage />} />
        <Route path="reportes" element={<ReportsPage />} />
      </Route>
    </Routes>
  );
}
