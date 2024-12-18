import axios from "axios";
import { loginByTgInitData } from "./login.service";
import { config } from "../configs";

export const api = axios.create({
  baseURL: `${config.baseURL}/api/v1/`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    const data = JSON.parse(token);
    config.headers.Authorization = `Bearer ${data}`;
  }
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const initDataRaw = localStorage.getItem("initDataRaw");
        if (!initDataRaw) return;
        const { token } = await loginByTgInitData(JSON.parse(initDataRaw));
        localStorage.setItem("token", JSON.stringify(token));
        return api.request(originalRequest);
      } catch (e) {
        console.log(e, "UnauthorizedError");
      }
    }
    throw error;
  }
);
