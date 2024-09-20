import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type AddCropHistoryInput = {
  crop: string;
  field: string;
  season: string;
  uri: string;
};

export const useAddCropHistory = () =>
  useMutation<null, ApiErrorResponse, AddCropHistoryInput>((input) => {
    const params = [
      {
        status: "new",
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

