import { api } from "../services";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetchOptions {
  method?: HttpMethod;
  endpoint: string;
  data?: Record<string, unknown>;
  params?: Record<string, unknown>;
}

export const fetchData = async <T>({
  method = "GET",
  endpoint,
  data,
  params,
}: FetchOptions): Promise<T> => {
  try {
    const response = await api.request({
      url: endpoint,
      method,
      params,
      data,
    });
    return response.data as T;
  } catch (error: unknown) {
    console.error(`Error while fetching data from ${endpoint}:`, error);
    throw error;
  }
};
