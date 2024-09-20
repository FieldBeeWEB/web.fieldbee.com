import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

interface LoginInput {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export const useLogin = () =>
  useMutation<LoginUserResponse, ApiErrorResponse, LoginInput>((loginInput) => {
    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("client_id", "-1098880411@eFarmer_Web");
    params.append("redirect_uri", "http://efarmer.mobi:8080/efarmer");
    params.append("username", loginInput.email);
    params.append("password", loginInput.password);

    return axiosInstance({
      method: "POST",
      url: "/oauth/token",
      data: params,
    }).then((res) => res.data);
  });
