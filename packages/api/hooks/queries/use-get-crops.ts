import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { queryKeys } from "./query-keys";
import { Crop } from "./use-get-organization-fields";

export const useGetCrops = () =>
  useQuery(queryKeys.getCrops, () =>
    axiosInstance<[Crop]>({
      method: "GET",
      url: "/RESTService/document/list?type=CROP",
    }).then((res) => res.data)
  );
