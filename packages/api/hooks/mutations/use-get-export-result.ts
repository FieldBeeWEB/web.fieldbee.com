import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type GetExportResultInput = {
  id: string;
};

export const useGetExportResult = () =>
  useMutation<string, ApiErrorResponse, GetExportResultInput>((input) => {
    return axiosInstance({
      method: "GET",
      url: `/RESTService/export/result/${input.id}`,
    }).then((res) => res.data);
  });
