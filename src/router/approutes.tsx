import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../components/templates/DashboardLayout";
import UserPage from "../app/dashboard/users/UserPage";
import AffiliatePage from "../app/dashboard/affiliate/AffiliatePage";
import AffiliateChildrenPage from "../app/dashboard/affiliate/children/AffiliateChildrenPage";
import ChildrenPage from "../app/dashboard/children/ChildrenPage";
import DashboardHomePage from "../app/dashboard/home/DashboardHomePage";
import EventPage from "../app/dashboard/events/EventPage";
import SectorPage from "../app/dashboard/sectors/SectorsPage";
import DelegatesPage from "../app/dashboard/delegates/DelegatesPage";
import ManageBenefitsPage from "../app/dashboard/delegates/manageBenefits/ManageBenefitsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
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
      </Route>
    </Routes>
  );
}
