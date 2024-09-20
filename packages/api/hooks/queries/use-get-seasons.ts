import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { queryKeys } from "./query-keys";
import { Season } from "./use-get-organization-fields";

export const useGetSeasons = () =>
  useQuery(queryKeys.getSeasons, () =>
    axiosInstance<[Season]>({
      method: "GET",
      url: "/RESTService/document/list?type=SEASON",
    }).then((res) => res.data)
  );
