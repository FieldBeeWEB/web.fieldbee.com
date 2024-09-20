import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type AddFieldInput = {
  category: string;
  crop: string;
  description: string;
  geometry: string;
  name: string;
};

type AddFieldResponse = {
  success: boolean;
  error?: string;
  uri?: string;
  fldID?: string;
};

export const useAddField = () =>
  useMutation<AddFieldResponse, ApiErrorResponse, AddFieldInput>(
    (input: AddFieldInput) => {
      return axiosInstance({
        method: "POST",
        url: "/RESTService/FieldsController/crtFld",
        headers: {
          "Content-Type": "application/json",
        },
        data: input,
      }).then((res) => res.data);
    }
  );
