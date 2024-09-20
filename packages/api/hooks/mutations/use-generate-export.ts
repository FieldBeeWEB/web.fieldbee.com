import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

export enum MultipleExportFormat {
  SHP = "shp",
  KML = "kml",
  ABSHP = "abshp",
}

interface GenerateExportInput {
  exportFormat: MultipleExportFormat;
  uri: string[];
}

export const useGenerateExport = () =>
  useMutation<string, ApiErrorResponse, GenerateExportInput>((input) => {
    return axiosInstance({
      method: "POST",
      url: "/RESTService/export/generate",
      headers: {
        "Content-Type": "application/json",
      },
      data: input,
    }).then((res) => res.data);
  });
