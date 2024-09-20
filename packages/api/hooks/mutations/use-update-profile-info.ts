import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type UpdateProfileInput = {
  firstName?: string;
  lastName?: string;
  gender?: string;
  countryCode?: string;
  phoneNumber?: string;
  uri?: string;
  birthday?: string;
  additionalInfo?: string;
  photoPath?: string;
};

export const useUpdateProfileInfo = () =>
  useMutation<any, ApiErrorResponse, UpdateProfileInput>((input) => {
    const params = [
      {
        status: "modified",
        document: {
          ...input,
        },
      },
    ];

    return axiosInstance({
      method: "POST",
      url: "/RESTService/document/apply-changes",
      headers: {
        "Content-Type": "application/json",
      },
      data: params,
    }).then((res) => res.data);
  });
