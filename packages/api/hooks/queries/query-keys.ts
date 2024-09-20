import { MeasurementType } from "./use-get-measurement-units";

export const queryKeys = {
  getCrops: ["get-crops"],
  getFieldChemicals: (uri: string) => ["get-field-chemicals", uri],
  getFieldsFilters: ["get-fields-filters"],
  getFieldsOperations: ["get-organization-field-operations"],
  getField: (uri: string) => ["get-organization-field", uri],
  getFieldsCategories: ["get-organization-fields-categories"],
  getFields: ["get-organization-fields"],
  getProfile: ["get-profile"],
  getSeasons: ["get-seasons"],
  getChemicalProperties: ["get-chemical-properties"],
  getFieldGeometry: (uri: string) => ["get-field-geometry", uri],
  getFieldsWithGeometry: (uris: string[]) => [
    "get-organization-fields-with-geometry",
    uris,
  ],
  getMeasurementUnits: (type: MeasurementType) => [
    "get-measurement-units",
    type,
  ],
  getUserMeasureUnits: ["get-user-measure-units"],
};
