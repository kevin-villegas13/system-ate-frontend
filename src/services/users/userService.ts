import {
  useDelete,
  useFetch,
  usePatch,
  usePost,
} from "../../lib/hooks/useFetch";
import { User } from "../../models/User";

interface UserResponse {
  data: User[];
  totalPages: number;
}

export const useCreateUser = () => usePost("/user");

export const usePaginationUser = (params?: {
  roleId?: string;
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}) => {
  const queryParams = new URLSearchParams({
    ...(params?.roleId && { roleId: params.roleId }),
    ...(params?.page !== undefined ? { page: String(params.page) } : {}),
    ...(params?.limit !== undefined ? { limit: String(params.limit) } : {}),
    ...(params?.search && { search: params.search }),
    ...(params?.status && { status: params.status }),
  }).toString();

  const result = useFetch<UserResponse>(`/user?${queryParams}`);

  return {
    users: result?.data?.data ?? [],
    totalPages: result?.data?.totalPages ?? 1,
  };
};

export const useFetchUserById = (id: string) => {
  return useFetch(`/user/${id}`);
};

export const useUpdateUser = () =>
  usePatch<{ id: string; data: User }, User>("/user");

export const useToggleUserStatus = () =>
  usePatch<{ id: string }, User>("/user");

export const useDeleteUser = () => useDelete("/user");
