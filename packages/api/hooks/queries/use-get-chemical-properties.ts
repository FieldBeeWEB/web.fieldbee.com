import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { queryKeys } from "./query-keys";

export interface ChemicalProperty {
  propertyName: string;
  propertyInputType: string;
  propertyTypeUri: string;
  orderNum: number;
  uri: string;
}

export const useGetChemicalProperties = () =>
  useQuery(queryKeys.getChemicalProperties, () =>
    axiosInstance<[ChemicalProperty]>({
      method: "GET",
      url: `/RESTService/document/list?type=PROPERTY&q=Chemical`,
    }).then((res) => res.data)
  );
