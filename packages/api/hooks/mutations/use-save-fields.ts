import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";
import { Field, FieldGeometryExtended, MappingAttrs } from "./use-get-session";

export interface SaveFieldsInput {
  data: SaveFieldsData;
  sesUri: string;
  importProcess: boolean;
}

export interface SaveFieldsData {
  fields: Field[];
  mapped: Mapped;
  allArea: number;
}

export interface ImportedField {
  startDate: Date;
  fieldGeometry: FieldGeometryExtended;
  mappingAttrs: MappingAttrs;
  organization: string;
  area: number;
  areaSi: number;
  isHandMeasured: boolean;
  description: string;
  name: string;
  UUID: string;
  endDate: Date;
  cadastral: number;
  category: string;
}

export interface Mapped {
  [mapAttribute: string]: string;
}

export enum SaveFieldsResult {
  OK = "ok",
  FAIL = "fail",
}

export interface FailedField {
  errorMsg: string;
  uuid: string;
}

export interface SaveFieldsResponse {
  result: SaveFieldsResult;
  saved: number;
  failedFields?: FailedField[];
}

export const useSaveFields = () =>
  useMutation<SaveFieldsResponse, ApiErrorResponse, SaveFieldsInput>(
    (input) => {
      return axiosInstance({
        method: "POST",
        url: "/RESTService/import/saveFields",
        headers: {
          "Content-Type": "application/json",
        },
        data: input,
      }).then((res) => res.data);
    }
  );
