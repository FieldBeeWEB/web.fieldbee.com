import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type GetSessionInput = {
  uri: string;
};

export interface GetSessionResponse {
  data: FieldsData;
  sesUri: string;
}

export interface FieldsData {
  fields: Field[];
}

export interface Field {
  startDate: Date;
  fieldGeometry: FieldGeometryExtended;
  mappingAttrs: MappingAttrs;
  organization: string;
  area: number;
  areaSi: number;
  isHandMeasured: boolean;
  name: string;
  UUID: string;
  endDate: Date;
  cadastral: number;
}

export interface FieldGeometryExtended {
  startDate: Date;
  source: string;
  geom: string;
  endDate: Date;
}

export interface MappingAttrs {
  [mapAttribute: string]: string;
}

export const useGetSession = () =>
  useMutation<GetSessionResponse, ApiErrorResponse, GetSessionInput>(
    ({ uri }) => {
      return axiosInstance({
        method: "GET",
        url: `/RESTService/import/session?sesUri=${uri}`,
      }).then((res) => res.data);
    }
  );
