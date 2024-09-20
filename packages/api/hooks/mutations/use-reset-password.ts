import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type ResetPasswordInput = {
  email: string;
};

export const useResetPassword = () =>
  useMutation<any, ApiErrorResponse, ResetPasswordInput>(
    (input: ResetPasswordInput) => {
      return axiosInstance({
        method: "GET",
        url: `/RESTService/RegistrationService/resetPasswordByEmail/${input.email}`,
      }).then((res) => res.data);
    }
  );
