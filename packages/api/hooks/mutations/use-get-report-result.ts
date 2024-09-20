import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type GetReportResultInput = {
  id: string;
};

export const useGetReportResult = () =>
  useMutation<string, ApiErrorResponse, GetReportResultInput>((input) => {
    return axiosInstance({
      method: "GET",
      url: `/RESTService/report/result/${input.id}`,
    }).then((res) => res.data);
  });
