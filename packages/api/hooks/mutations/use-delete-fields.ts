import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type DeleteFieldsInput = {
  uris: string[];
};

export const useDeleteFields = () =>
  useMutation<null, ApiErrorResponse, DeleteFieldsInput>(({ uris }) => {
    const params = uris.map((uri) => {
      return {
        status: "deleted",
        document: {
          uri: uri,
        },
      };
    });
    return axiosInstance({
      method: "POST",
      url: "/RESTService/document/apply-changes",
      headers: {
        "Content-Type": "application/json",
      },
      data: params,
    }).then((res) => res.data);
  });
