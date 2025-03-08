import { apiClient } from "@/lib/api/api-client";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

type PostRequest = object | undefined;
type ApiMutation<TResponse, TRequest extends PostRequest> = UseMutationResult<
  TResponse,
  Error,
  TRequest
>;

export const usePost = <TRequest extends PostRequest, TResponse>(
  endpoint: string
): ApiMutation<TResponse, TRequest> => {
  return useMutation<TResponse, Error, TRequest>({
    mutationFn: (data: TRequest) =>
      apiClient(endpoint, { method: "POST", body: data }),
  });
};
