import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { ApiErrorResponse } from "../../types";
import { GetUserMeasureUnits } from "../queries/use-get-user-measure-units";

export const useGetUpdatedMeasurementUnits = () =>
  useMutation<GetUserMeasureUnits, ApiErrorResponse, null>(() => {
    return axiosInstance({
      method: "GET",
      url: "/RESTService/user/mu",
    }).then((res) => res.data);
  });
