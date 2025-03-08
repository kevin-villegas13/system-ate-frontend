import { apiClient } from "@/lib/api/api-client";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export const useGet = <T>(
  key: string,
  endpoint: string,
  params = {}
): UseQueryResult<T> => {
  return useQuery({
    queryKey: [key, params],
    queryFn: () => apiClient(endpoint) as Promise<T>,
  });
};
