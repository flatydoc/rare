import { endpoints } from "../constants/endpoints";
import { IUser } from "../types";
import { fetchData } from "../utils/fetchData";

interface IUserRes {
  data: IUser;
}

export const getUser = async () => {
  try {
    const response = await fetchData<IUserRes>({
      endpoint: endpoints.me,
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
