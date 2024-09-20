import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type WKTGeometry = {
  wkt: string;
};
type UpdateFieldBoundariesInput = {
  geometry: WKTGeometry;
  description: string | undefined;
  name: string;
  uri: string;
};
export const useUpdateFieldBoundaries = () =>
  useMutation<null, ApiErrorResponse, UpdateFieldBoundariesInput>((input) => {
    return axiosInstance({
      method: "POST",
      url: "/RESTService/FieldsController/updFld",
      headers: {
        "Content-Type": "application/json",
      },
      data: input,
    }).then((res) => res.data);
  });
