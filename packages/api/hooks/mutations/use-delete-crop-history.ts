import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type DeleteCropHistoryInput = {
  uri: string;
};
export const useDeleteCropHistory = () =>
  useMutation<null, ApiErrorResponse, DeleteCropHistoryInput>((input) => {
    const params = [
      {
        status: "deleted",
        document: {
          uri: input.uri,
        },
      },
    ];

    return axiosInstance({
      method: "POST",
      url: "/RESTService/document/apply-changes",
      data: params,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.data);
  });
