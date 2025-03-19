import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../app/dashboard/layout";
import PageUser from "../app/dashboard/users/page";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="users" element={<PageUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
