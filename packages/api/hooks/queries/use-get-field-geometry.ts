import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { queryKeys } from "./query-keys";

export interface FieldGeometry {
  type: string;
  geometry: Geometry;
}

export interface Geometry {
  type: string;
  coordinates: Array<Array<Array<number[]>>>;
}

export const useGetFieldGeometry = (uri: string) =>
  useQuery(queryKeys.getFieldGeometry(uri), () =>
    axiosInstance<FieldGeometry>({
      method: "GET",
      url: `/RESTService/FieldsController/getGeom?uri=${uri}`,
    }).then((res) => res.data)
  );
