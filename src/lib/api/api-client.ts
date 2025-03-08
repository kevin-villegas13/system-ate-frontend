import { API_URL } from "../api_global";

export const apiClient = async (
  endpoint: string,
  { method = "GET", body }: { method?: string; body?: object } = {}
) => {
  const options: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  };
  console.log(options);

  const response = await fetch(`${API_URL}${endpoint}`, options);
  if (!response.ok) throw new Error("Error en la petición");
  return response.json();
};
