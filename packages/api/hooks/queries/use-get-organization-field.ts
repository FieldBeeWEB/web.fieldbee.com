import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { queryKeys } from "./query-keys";
import { FieldsResponse } from "./use-get-organization-fields";

export const useGetOrganizationField = (uri: string) =>
  useQuery(queryKeys.getField(uri), () =>
    axiosInstance<FieldsResponse>({
      method: "GET",
      url: `/RESTService/document/content?uri=${uri}`,
    }).then((res) => res.data)
  );
