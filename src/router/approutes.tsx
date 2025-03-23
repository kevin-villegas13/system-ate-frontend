import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import UserPage from "../app/dashboard/users/UserPage";
import AffiliatePage from "../app/dashboard/affiliate/AffiliatePage";
import AffiliateChildrenPage from "../app/dashboard/affiliate/children/AffiliateChildrenPage";
import ChildrenPage from "../app/dashboard/children/ChildrenPage";
import DashboardHomePage from "../app/dashboard/home/DashboardHomePage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHomePage />} />
          <Route path="usuarios" element={<UserPage />} />
          <Route path="afiliados" element={<AffiliatePage />} />
          <Route
            path="afiliados/:id/hijos"
            element={<AffiliateChildrenPage />}
          />
          <Route path="hijos" element={<ChildrenPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
