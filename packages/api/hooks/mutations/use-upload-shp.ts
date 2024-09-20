import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type UploadShpInput = {
  file: Blob;
};

export interface UploadShpResponse {
  status: string;
  sesUri: string;
}

export const useUploadShp = () =>
  useMutation<UploadShpResponse, ApiErrorResponse, UploadShpInput>((input) => {
    const formData = new FormData();
    formData.append("file", input.file);

    return axiosInstance({
      method: "POST",
      url: "/RESTService/import/uploadSHP",
      data: formData,
    }).then((res) => res.data);
  });
