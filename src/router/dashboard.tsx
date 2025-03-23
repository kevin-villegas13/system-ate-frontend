import { lazy } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const UserPage = lazy(() => import("../app/dashboard/users/UserPage"));

const AffiliatePage = lazy(
  () => import("../app/dashboard/affiliate/AffiliatePage")
);

const AffiliateChildrenPage = lazy(
  () => import("../app/dashboard/affiliate/children/AffiliateChildrenPage")
);

const dashboardRoutes = {
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    { path: "users", element: <UserPage /> },
    { path: "affiliate", element: <AffiliatePage /> },
    { path: "affiliate/:id/children", element: <AffiliateChildrenPage /> },
  ],
};

export default dashboardRoutes;
