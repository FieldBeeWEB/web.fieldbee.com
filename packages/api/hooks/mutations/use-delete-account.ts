import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

export const useDeleteAccount = () =>
  useMutation<any, ApiErrorResponse>(() => {
    return axiosInstance({
      method: "DELETE",
      url: "/RESTService/user",
    }).then((res) => res.data);
  });
