import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./router/approutes";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
