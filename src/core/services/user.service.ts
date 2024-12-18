import { Endpoints } from "../enums";
import { IUser } from "../types";
import { fetchData } from "../utils/fetchData";

interface IUserRes {
  data: IUser;
}

export const getUser = async () => {
  try {
    const response = await fetchData<IUserRes>({
      endpoint: Endpoints.ME,
    });

    if (!response) {
      throw new Error("Response data is missing");
    }
    return response;
  } catch (error: unknown) {
    console.error("Error in getUser", error);
    throw error;
  }
};
