import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

export const useDeleteFieldFilters = () =>
  useMutation<any, ApiErrorResponse>(() => {
    return axiosInstance({
      method: "DELETE",
      url: "/RESTService/document-filter/list?document_type=ORGANIZATION_FIELD",
    }).then((res) => res.data);
  });
