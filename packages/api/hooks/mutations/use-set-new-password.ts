import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type SetNewPasswordInput = {
  password: string;
  user: string;
  key: string;
};

export const useSetNewPassword = () =>
  useMutation<any, ApiErrorResponse, SetNewPasswordInput>((input) => {
    const params = new URLSearchParams(input);
    return axiosInstance({
      method: "POST",
      url: "/RESTService/RegistrationService/changeForgottenPassword",
      data: params,
    }).then((res) => res.data);
  });
