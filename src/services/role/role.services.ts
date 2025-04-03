import { useFetch } from "../../lib/hooks/useFetch";
import { Role } from "../../models/Role";

export const useFetchRoles = () => {
  return useFetch<Role[]>("/role");
};
