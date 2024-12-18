import { ContentTypes, HttpHeaders, HttpMethods } from "../enums";
import { api } from "../services";

interface FetchOptions {
  method?: HttpMethods;
  endpoint: string;
  data?: Record<string, unknown> | FormData;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export const fetchData = async <T>({
  method = HttpMethods.GET,
  endpoint,
  data,
  params,
  headers = { [HttpHeaders.CONTENT_TYPE]: ContentTypes.JSON },
}: FetchOptions): Promise<T> => {
  try {
    const response = await api.request({
      url: endpoint,
      method,
      params,
      data,
      headers,
    });
    return response.data as T;
  } catch (error: unknown) {
    console.error(`Error while fetching data from ${endpoint}:`, error);
    throw error;
  }
};
