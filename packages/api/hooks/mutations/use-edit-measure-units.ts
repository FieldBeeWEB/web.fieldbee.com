import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";

type EditMeasureUnitsInput = {
  area: string;
  length: string;
  speed: string;
};

export const useEditMeasureUnits = () =>
  useMutation<null, ApiErrorResponse, EditMeasureUnitsInput>((input) => {
    return axiosInstance({
      method: "POST",
      url: "/RESTService/user/mu",
      headers: {
        "Content-Type": "application/json",
      },
      data: input,
    }).then((res) => res.data);
  });
