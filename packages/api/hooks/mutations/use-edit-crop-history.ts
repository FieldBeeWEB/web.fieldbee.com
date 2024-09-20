import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type EditCropHistoryInput = {
  crop: string;
  season: string;
  uri: string;
};

export const useEditCropHistory = () =>
  useMutation<null, ApiErrorResponse, EditCropHistoryInput>((input) => {
    const params = [
      {
        status: "modified",
        document: { ...input },
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
