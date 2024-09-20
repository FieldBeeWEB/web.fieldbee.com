import { MeasurementType } from "@fieldbee/api";
import {
  GetUserMeasureUnits,
  Measurement,
} from "@fieldbee/api/hooks/queries/use-get-user-measure-units";
import { localStorageKeys } from "./local-storage-keys";

export default function formatFixedArea(area: number) {
  return `${(area * 100).toFixed(2)} ha`;
}

export const setMeasurementUnits = (mu: GetUserMeasureUnits) => {
  localStorage.setItem(localStorageKeys.MU, JSON.stringify(mu));
};

export function getMeasurementString(
  measurementSi: number,
  type: MeasurementType
) {
  const units: GetUserMeasureUnits | null = JSON.parse(
    localStorage.getItem(localStorageKeys.MU) ?? "null"
  );
  if (units === null) {
    return null;
  }
  let unit: Measurement = units.area;
  switch (type) {
    case MeasurementType.AREA:
    default:
      unit = units.area;
      break;
    case MeasurementType.LENGTH:
      unit = units.length;
      break;
    case MeasurementType.SPEED:
      unit = units.speed;
      break;
  }
  return `${(measurementSi * unit.factor).toFixed(2)} ${unit.targetMU.code}`;
}

export function getMeasurementInCurrentUnit(
  measurementSi: number,
  type: MeasurementType
) {
  const units: GetUserMeasureUnits | null = JSON.parse(
    localStorage.getItem(localStorageKeys.MU) ?? "null"
  );
  if (units === null) {
    return null;
  }
  let unit: Measurement = units.area;
  switch (type) {
    case MeasurementType.AREA:
    default:
      unit = units.area;
      break;
    case MeasurementType.LENGTH:
      unit = units.length;
      break;
    case MeasurementType.SPEED:
      unit = units.speed;
      break;
  }
  return Number((measurementSi * unit.factor).toFixed(2));
}
export function getMeasurementInSi(measurement: number, type: MeasurementType) {
  const units: GetUserMeasureUnits | null = JSON.parse(
    localStorage.getItem(localStorageKeys.MU) ?? "null"
  );
  if (units === null) {
    return 0;
  }
  let unit: Measurement = units.area;
  switch (type) {
    case MeasurementType.AREA:
    default:
      unit = units.area;
      break;
    case MeasurementType.LENGTH:
      unit = units.length;
      break;
    case MeasurementType.SPEED:
      unit = units.speed;
      break;
  }
  return Number((measurement / unit.factor).toFixed(2));
}
