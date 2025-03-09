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

  const response = await fetch(`${API_URL}${endpoint}`, options);

  let data;
  try {
    data = await response.json();
  } catch {
    data = { error: "Error desconocido" };
  }

  if (!response.ok) {
    throw {
      status: response.status,
      data,
    };
  }

  return data;
};
