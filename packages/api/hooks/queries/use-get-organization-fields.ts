import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../config";
import { queryKeys } from "./query-keys";

export interface FieldsResponse {
  id: number;
  cropHistory: CropHistory[];
  areaSi: number;
  area: number;
  bbox: string;
  description: string;
  name: string;
  uri: string;
  crop?: Crop;
  tasks?: Task[];
  category?: Category;
}

export interface Category {
  categoryType: string;
  name: string;
  code?: string;
  uri: string;
}

export interface Crop {
  durationCycle: number;
  name: string;
  startMonth: number;
  uri: string;
  colorHex?: string;
}

export interface CropHistory {
  field: string;
  startDate: number;
  season: Season;
  endDate: number;
  uri: string;
  crop: Crop;
}

export interface Season {
  startSeason: number;
  name: string;
  endSeason: number;
  type: SeasonType;
  uri: string;
}

export enum SeasonType {
  Actual = "ACTUAL",
  Archived = "ARCHIVED",
  Planned = "PLANNED",
}
export interface Task {
  progress: Progress;
  operation: Operation;
  taskEndDate: Date;
  materials: any[];
  taskStatus: string;
  description: string;
  owner: string;
  taskStartDate: Date;
  orgName: string;
  uri: string;
  taskName: string;
}

export interface Operation {
  measureUnit: string;
  description?: string;
  name: string;
  subtype: string;
  entityType: EntityType;
  type: string;
  uri: string;
  colorHex: string;
}

export interface EntityType {
  color: string;
  name: string;
  orderNum: number;
  group: string;
  uri: string;
}

export interface Progress {
  plan: number;
  actual: number;
  uri: string;
}

export const useGetOrganizationFields = () =>
  useQuery(queryKeys.getFields, () =>
    axiosInstance<[FieldsResponse]>({
      method: "GET",
      url: "/RESTService/document/list?type=ORGANIZATION_FIELD",
    }).then((res) => res.data)
  );
