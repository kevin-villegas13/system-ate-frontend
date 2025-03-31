import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { api } from "../api";

const useMutationWithCache = <TRequest, TResponse>(
  method: "post" | "put" | "patch" | "delete",
  endpoint: string
) => {
  const queryClient = useQueryClient();

  return useMutation<TResponse, unknown, TRequest>({
    mutationFn: async (body: any): Promise<TResponse> => {
      const url =
        method === "delete"
          ? `${endpoint}/${body}`
          : `${endpoint}/${body.id || ""}`;
      const response = await api[method]<TResponse>(url, body);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [endpoint] });
    },
  });
};

// Hooks específicos reutilizando el genérico
export const useFetch = <T>(endpoint: string) => {
  return useQuery<T>({
    queryKey: [endpoint],
    queryFn: async (): Promise<T> => {
      const { data } = await api.get<T>(endpoint, { withCredentials: true });
      return data;
    },
    enabled: Boolean(endpoint),
  });
};

export const usePost = <TRequest, TResponse>(endpoint: string) =>
  useMutationWithCache<TRequest, TResponse>("post", endpoint);

export const usePut = <TRequest, TResponse>(endpoint: string) =>
  useMutationWithCache<TRequest, TResponse>("put", endpoint);

export const usePatch = <TRequest, TResponse>(endpoint: string) =>
  useMutationWithCache<TRequest, TResponse>("patch", endpoint);

export const useDelete = (endpoint: string) =>
  useMutationWithCache<string, void>("delete", endpoint);
