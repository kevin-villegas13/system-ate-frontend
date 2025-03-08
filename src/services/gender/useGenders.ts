import { useGet } from "@/hooks/use-get";
import { ENDPOINTS } from "@/lib/api/endpoints";

interface Gender {
  id: string;
  genderName: string;
}

export const useGetGenders = () =>
  useGet<Gender[]>("genders", ENDPOINTS.genders.list);
