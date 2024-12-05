import { endpoints } from "../constants/endpoints";
import { fetchData } from "../utils";

export const loginByTgInitData = async (initData: string) => {
  try {
    const response = await fetchData<{ token: string; status: string }>({
      method: "POST",
      endpoint: endpoints.login,
      data: { initData },
    });
    if (!response) {
      throw new Error("Response data is missing");
    }
    return response;
  } catch (error: unknown) {
    console.error("Error in loginByTgInitData", error);
    throw error;
  }
};
