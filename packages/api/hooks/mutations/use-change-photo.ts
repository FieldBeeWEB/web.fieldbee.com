import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type ChangePhotoInput = {
  file: Blob;
};

export const useChangePhoto = () =>
  useMutation<[string], ApiErrorResponse, ChangePhotoInput>((input) => {
    const formData = new FormData();
    formData.append("file", input.file);

    return axiosInstance({
      method: "POST",
      url: "/RESTService/image/upload",
      data: formData,
    }).then((res) => res.data);
  });
