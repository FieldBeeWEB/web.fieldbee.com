import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { queryKeys } from "./query-keys";

export interface Chemical {
  propertyValueType: string;
  propertyName: string;
  propertyTypeName: string;
  orderNum: number;
  propertyValueFloat: number;
  objectUri: string;
  property: string;
  uri: string;
}

export const useGetFieldChemicals = (uri: string) =>
  useQuery(queryKeys.getFieldChemicals(uri), () =>
    axiosInstance<[Chemical]>({
      method: "GET",
      url: `/RESTService/document/list?type=PROPERTY_VALUES&q=${uri}`,
    }).then((res) => res.data)
  );
