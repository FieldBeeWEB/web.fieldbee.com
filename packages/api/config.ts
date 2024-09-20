/* eslint-disable turbo/no-undeclared-env-vars */
import axios from "axios";
import { addMinutes, differenceInMinutes } from "date-fns";
import {
  deleteUserToken,
  getUserToken,
  setUserToken,
} from "./helpers/user-token";
import { LoginUserResponse } from "./hooks";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/RESTService`;
axiosInstance.defaults.headers.get["Cache-Control"] = "no-cache";
axiosInstance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded; charset=UTF-8";

axiosInstance.interceptors.request.use((request) => {
  const userToken = getUserToken();
  request.headers.Authorization = `Bearer ${userToken?.access_token}`;
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.request && error.request.status === 401) {
      const userToken = getUserToken();
      if (userToken) {
        const diff = differenceInMinutes(
          new Date(userToken?.expires_at),
          new Date()
        );
        const params = new URLSearchParams();
        params.append("grant_type", "refresh_token");
        params.append("client_id", "-1098880411@eFarmer_Web");
        params.append("redirect_uri", "http://efarmer.mobi:8080/efarmer");
        params.append("refresh_token", userToken.refresh_token);
        if (diff > 0) {
          return axiosInstance<LoginUserResponse>({
            method: "POST",
            url: "/oauth/token",
            data: params,
          }).then((res) => {
            if (res.status === 200) {
              setUserToken({
                ...res.data,
                expires_at: addMinutes(new Date(), res.data.expires_in),
              });
              axiosInstance.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${res.data.access_token}`;
              return axiosInstance(originalRequest);
            } else {
              deleteUserToken();
            }
          });
        } else {
          deleteUserToken();
        }
      } else {
        deleteUserToken();
        // throw error;
      }
    }
  }
);

export default axiosInstance;
