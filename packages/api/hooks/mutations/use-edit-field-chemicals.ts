import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

export enum Status {
  NEW = "new",
  MODIFIED = "modified",
}

export interface FieldChemical {
  status: Status;
  document: FieldChemicalDocument;
}

export interface FieldChemicalDocument {
  objectUri: string;
  propertyValueFloat: string;
  property: string;
  uri: string;
}

export const useEditFieldChemicals = () =>
  useMutation<null, ApiErrorResponse, FieldChemical[]>((input) => {
    return axiosInstance({
      method: "POST",
      url: "/RESTService/document/apply-changes",
      headers: {
        "Content-Type": "application/json",
      },
      data: input,
    }).then((res) => res.data);
  });
