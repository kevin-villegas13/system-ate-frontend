import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import dashboardRoutes from "./dashboard";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/dashboard" replace /> },
  dashboardRoutes,
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
