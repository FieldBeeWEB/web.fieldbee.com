import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { LoginUserResponse } from "./use-login";

type LoginWithGoogleInput = {
  code: string;
};

export const useLoginWithGoogle = () => {
  const loginWithGoogle = useMutation({
    mutationFn: (input: LoginWithGoogleInput) => {
      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("client_id", "-1098880411@eFarmer_Web");
      params.append("redirect_uri", "http://efarmer.mobi:8080/efarmer");
      params.append("code_type", "google");
      params.append("code", input.code);

      return axiosInstance<LoginUserResponse>({
        method: "POST",
        url: "/oauth/token",
        data: params,
      });
    },
  });
  return loginWithGoogle;
};
