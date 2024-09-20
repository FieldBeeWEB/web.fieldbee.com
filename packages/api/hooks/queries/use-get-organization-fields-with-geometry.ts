import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { queryKeys } from "./query-keys";

export interface FieldWithGeometryResponse {
  startDate: Date;
  perimeter: number;
  endDate: Date;
  geometryJson: string;
  uri: string;
  cadastral: number;
  organization: string;
  area: number;
  areaSi: number;
  isHandMeasured: boolean;
  source: string;
  description: string;
  bbox: string;
  name: string;
}
export const useGetOrganizationFieldsWithGeometry = (
  fieldUris: string[] | null
) =>
  useQuery(
    queryKeys.getFieldsWithGeometry(fieldUris || []),
    () =>
      axiosInstance<[FieldWithGeometryResponse]>({
        method: "POST",
        url: "/RESTService/document/list",
        headers: {
          "Content-Type": "application/json",
        },
        data: fieldUris,
      }).then((res) => res.data),
    { enabled: fieldUris && fieldUris.length > 0 ? true : false }
  );
