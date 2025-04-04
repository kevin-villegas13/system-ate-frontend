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

  const { data, refetch } = useFetch<UserResponse>(`/user?${queryParams}`);

  return {
    users: data?.data ?? [],
    totalPages: data?.totalPages ?? 1,
    refetch,
  };
};
export const useUpdateUser = (id: string) => usePatch(`/user/${id}`);

export const useToggleUserStatus = () =>
  usePatch<{ id: string }, User>("/user");

export const useDeleteUser = () => useDelete("/user");
