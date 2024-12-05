import { useState, useEffect, useCallback } from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { loginByTgInitData } from "../services/login.service";
import { IUser } from "../types";
import { getUser } from "../services/user.service";

interface IUseAuthReturn {
  isLoading: boolean;
  user?: IUser;
  isNewUser: boolean;
  token: string | null;
  setUser: (v: IUser) => void;
}

export const useAuth = (): IUseAuthReturn => {
  //const initDataRaw = useLaunchParams().initDataRaw;
  const initDataRaw =
    "query_id=AAHa1-IqAAAAANrX4ioOt7nv&user=%7B%22id%22%3A719509466%2C%22first_name%22%3A%22%D0%92%D0%BB%D0%B0%D0%B4%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22vlad_bedlam%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1725392492&hash=7ac0c673bc0477aaf098966ce2613367bc9092be300b0db3a8f9c2d73f778b71";
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [token, setToken] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const fetchUser = async () => {
    try {
      const user = await getUser();
      setUser(user.data);
    } catch (error: unknown) {
      console.error("Failed to fetch user", error);
    }
  };

  const login = useCallback((newToken: string) => {
    localStorage.setItem("token", JSON.stringify(newToken));
    setToken(newToken);
    fetchUser();
    setIsLogin(true);
  }, []);

  const getToken = async () => {
    if (!initDataRaw) return;
    try {
      localStorage.setItem("initDataRaw", JSON.stringify(initDataRaw));
      const { token, status } = await loginByTgInitData(initDataRaw);
      login(token);
      if (status === "new") {
        setIsNewUser(true);
      }
      setIsLoading(false);
    } catch (error: unknown) {
      console.log("Failed to get token", error);
      return;
    }
  };

  useEffect(() => {
    if (!isLogin) {
      getToken();
    }
  }, [isLogin]);

  return {
    token,
    isLoading,
    user,
    setUser,
    isNewUser,
  };
};
