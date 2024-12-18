import { ContentTypes, Endpoints, HttpHeaders, HttpMethods } from "../enums";
import { fetchData } from "../utils";

export const loginByTgInitData = async (initData: string) => {
  try {
    const response = await fetchData<{ token: string; status: string }>({
      method: HttpMethods.POST,
      endpoint: Endpoints.LOGIN,
      data: { initData },
      headers: {
        [HttpHeaders.CONTENT_TYPE]: ContentTypes.JSON,
      },
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
