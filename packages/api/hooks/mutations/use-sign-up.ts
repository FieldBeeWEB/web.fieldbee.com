import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type SignUpInput = {
  password: string;
  name: string;
  email: string;
  organization: string;
};

export const useSignUp = () =>
  useMutation<any, ApiErrorResponse, SignUpInput>((input) => {
    const params = {
      client: "efarmer_web",
      user: {
        IMEI: "0294204bad0c390",
        LanguageLocale: "en",
        Login: input.email,
        Organisation: input.organization,
        Password: input.password,
        eMailUser: input.email,
        firstName: input.name,
        uid: "51e1e9f8-b8df-846c-e82d-8a8431aac24f",
      },
    };
    return axiosInstance({
      method: "POST",
      url: "/RESTService/RegistrationService/registration",
      headers: {
        "Content-Type": "application/json",
      },
      data: params,
    }).then((res) => res.data);
  });
