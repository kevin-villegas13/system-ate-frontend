import { useEffect, useState, useCallback, useRef } from "react";
import {
  useRefreshToken,
  useVerefiyTokens,
} from "../../services/auth/authService";

interface TokenResponse {
  hasAccessToken?: boolean;
  hasRefreshToken?: boolean;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado para controlar la carga
  const checkingAuth = useRef(false);

  const { refetch: refreshToken } = useRefreshToken();
  const { refetch: verifyTokens } = useVerefiyTokens();

  const checkAuth = useCallback(async () => {
    if (checkingAuth.current) return;
    checkingAuth.current = true;
    setIsLoading(true); // Inicia el loading mientras verificamos la autenticación

    try {
      const { data } = await verifyTokens();
      const { hasAccessToken, hasRefreshToken } = (data || {}) as TokenResponse;

      if (hasAccessToken || (hasRefreshToken && (await refreshToken())?.data)) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      checkingAuth.current = false;
      setIsLoading(false); // Fin del proceso de carga
    }
  }, [verifyTokens, refreshToken]);

  useEffect(() => {
    checkAuth();

    const interval = setInterval(() => {
      if (isAuthenticated === true) checkAuth(); // Refresca la autenticación solo si el usuario está autenticado
    }, 240000); // Revisa cada 4 minutos
    console.log(isAuthenticated);
    return () => clearInterval(interval);
  }, [checkAuth, isAuthenticated]);


  return { isAuthenticated, isLoading }; // Retor na el estado de carga y autenticación
}
