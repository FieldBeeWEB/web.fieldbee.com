import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

export enum ReportExportFormat {
  PDF = "PDF",
  XLS = "XLS",
  CSV = "CSV",
}

interface GenerateReportInput {
  format: ReportExportFormat;
  uri: string;
}

export const useGenerateReport = () =>
  useMutation<string, ApiErrorResponse, GenerateReportInput>((input) => {
    return axiosInstance({
      method: "POST",
      url: "/RESTService/report/generate",
      headers: {
        "Content-Type": "application/json",
      },
      data: { ...input, type: "FIELD_CARD" },
    }).then((res) => res.data);
  });
