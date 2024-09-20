import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type EditFieldInput = {
  areaSi: number;
  category: string | null;
  description: string;
  name: string;
  uri: string;
};

export const useEditField = () =>
  useMutation<null, ApiErrorResponse, EditFieldInput>((input) => {
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
