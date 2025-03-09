"use client";

import { useGet } from "@/hooks/use-get";
import { ENDPOINTS } from "@/lib/api/endpoints";
import { Gender } from "@/lib/interface/genders.interfaces";

export const useGetGenders = () =>
  useGet<Gender[]>("genders", ENDPOINTS.genders.list);
