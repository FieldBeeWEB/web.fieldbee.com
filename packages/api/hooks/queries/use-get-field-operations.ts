import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { queryKeys } from "./query-keys";

export interface FieldOperation {
  color: string;
  name: string;
  orderNum: number;
  group: string;
  uri: string;
}

export const useGetOrganizationFieldsOperations = () =>
  useQuery(queryKeys.getFieldsOperations, () =>
    axiosInstance<[FieldOperation]>({
      method: "GET",
      url: "/RESTService/document/list?type=ENTITY_TYPE&q=FIELD_OPERATION",
    }).then((res) => res.data)
  );
