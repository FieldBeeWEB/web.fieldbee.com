import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { FilterItem } from "../mutations";
import { queryKeys } from "./query-keys";

export interface FieldFiltersResponse {
  documentType: string;
  items: FilterItem[];
}

export const useGetFieldFilters = () =>
  useQuery(queryKeys.getFieldsFilters, () =>
    axiosInstance<FieldFiltersResponse>({
      method: "GET",
      url: "/RESTService/document-filter/?document_type=ORGANIZATION_FIELD",
    }).then((res) => res.data)
  );
