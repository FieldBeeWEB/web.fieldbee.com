import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

export type FilterItem = {
  name: string;
  property: string;
  type: string;
  values: Array<string>;
};

export type SetFiltersInput = {
  items: Array<FilterItem>;
};

export const useSetFilters = () =>
  useMutation<any, ApiErrorResponse, SetFiltersInput>((input) => {
    const params = {
      documentType: "ORGANIZATION_FIELD",
      items: [...input.items],
    };
    return axiosInstance({
      method: "POST",
      url: "/RESTService/document-filter/",
      headers: {
        "Content-Type": "application/json",
      },
      data: params,
    }).then((res) => res.data);
  });
