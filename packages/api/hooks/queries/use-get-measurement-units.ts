import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { queryKeys } from "./query-keys";

export interface MeasurementUnit {
  description: string;
  name: string;
  umType: UmType;
  code: string;
  uri: string;
}

export interface UmType {
  systemUmCode: string;
  type: string;
  uri: string;
}

export enum MeasurementType {
  AREA = "AREA",
  LENGTH = "LENGTH",
  SPEED = "SPEED",
}

export const useGetMeasurementUnits = (type: MeasurementType) =>
  useQuery(queryKeys.getMeasurementUnits(type), () =>
    axiosInstance<[MeasurementUnit]>({
      method: "GET",
      url: `/RESTService/document/list?type=MEASURE_UNIT&q=${type}`,
    }).then((res) => res.data)
  );
