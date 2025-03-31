import { useDelete, useFetch, usePost } from "../../lib/hooks/useFetch";

export const useLogin = () => usePost("/auth/login");
export const useRefreshToken = () => useFetch("/auth/refresh-token");
export const useVerefiyTokens = () => useFetch("auth/verify-tokens");
export const useLogoutToken = () => useDelete("auth/logout");
export const useProfile = <T>() => useFetch<T>("auth/profile");
