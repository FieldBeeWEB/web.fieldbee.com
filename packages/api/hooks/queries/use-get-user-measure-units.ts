import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { queryKeys } from "./query-keys";
import { MeasurementUnit } from './use-get-measurement-units';

export interface GetUserMeasureUnits {
  area:   Measurement;
  speed:  Measurement;
  length: Measurement;
}

export interface Measurement {
  sourceMU:              MeasurementUnit;
  measureUnitSystemType: string;
  targetMU:              MeasurementUnit;
  factor:                number;
  uri:                   string;
}

export const useGetUserMeasureUnits = () =>
  useQuery(queryKeys.getUserMeasureUnits, () =>
    axiosInstance<GetUserMeasureUnits>({
      method: "GET",
      url: "/RESTService/user/mu",
    }).then((res) => res.data)
  );
