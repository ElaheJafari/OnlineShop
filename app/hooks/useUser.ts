import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import useSwr from "swr";
import appAxios from "../middelwares/appAxios";
import { User } from "../models/user";

const useUser = () => {
  const [cookies, setCookies] = useCookies(["username"]);
  const Fetcher = (args: { api: string; res: string }) => {
    return appAxios.get(args.api, {
      headers: {
        authorization: "Bearer " + args.res,
      },
    });
  };
  const { data, error } = useSwr<{ data: { user: User } }>(
    { api: "user/profile", res: cookies.username },
    Fetcher,
    {
      refreshInterval: 20000,
    }
  );

  return { data: data?.data, error };
};

export default useUser;
