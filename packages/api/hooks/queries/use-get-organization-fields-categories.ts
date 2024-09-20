import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { queryKeys } from "./query-keys";

export interface OrganizationFieldCategory {
  categoryType: string;
  name: string;
  code?: string;
  uri: string;
}

export const useGetOrganizationFieldsCategories = () =>
  useQuery(queryKeys.getFieldsCategories, () =>
    axiosInstance<[OrganizationFieldCategory]>({
      method: "GET",
      url: "/RESTService/document/list?type=CATEGORY&q=ORG_FIELD",
    }).then((res) => res.data)
  );
