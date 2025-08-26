import { FieldsResponse } from "@fieldbee/api";
import { theme } from "@fieldbee/ui";
import {
  FertilizingIcon,
  HarvestingIcon,
  PlantingIcon,
  SprayingIcon,
  TillingIcon,
} from "@fieldbee/ui/custom-icons/tasks";
import OtherIcon from "@fieldbee/ui/custom-icons/tasks/OtherIcon";
import { t } from "i18next";
import { PhrasesTranslationKeys } from "../../../localization";

export interface IWidgetTasksProgressDataItem {
  label: string;
  value: number | string | null;
  max: number | string | null;
  color: string;
}

export interface IWidgetTasksProgressData {
  amount: IWidgetTasksProgressDataItem[] | undefined;
  area: IWidgetTasksProgressDataItem[] | undefined;
  percent: IWidgetTasksProgressDataItem[] | undefined;
}

export interface ICropItem {
  cropName: string;
  areaSi: number;
  color: string;
  percentage: number;
}

export interface IWidgetTaskDetails {
  icon: React.ElementType;
  type: string;
  fieldsAmount: number;
  areaSi: number;
  progress: number | string;
}

export interface IWidgetTasksDetails {
  data: { [key: string]: IWidgetTaskDetails[] } | undefined;
  isLoading: boolean;
  isFetching: boolean;
}

export const getWidgetTasksProgressData = (
  data: [FieldsResponse] | undefined,
): IWidgetTasksProgressData => {
  const createEmptyData = (statuses: (keyof typeof PhrasesTranslationKeys)[]) =>
    statuses.map((status) => ({
      label: t(PhrasesTranslationKeys[status]).toString(),
      value: 0,
      max: 100,
      color: "",
    }));

  if (!data) {
    return {
      amount: createEmptyData(["OPEN", "IN_WORK_ON_FO", "EXECUTED"]),
      area: createEmptyData(["OPEN", "IN_WORK_ON_FO", "EXECUTED"]),
      percent: createEmptyData(["OPEN", "IN_WORK_ON_FO", "EXECUTED"]),
    };
  }

  const TOTAL_AMOUNT = getTasksAmount(data);
  const TOTAL_AREA = getFieldsTotalArea(data);
  const TOTAL_PERCENT = 100;

  const getAmount = (key: string): number => {
    return data.reduce((total, field) => {
      field.tasks?.forEach((task) => {
        total += task.taskStatus === key ? 1 : 0;
      });
      return total;
    }, 0);
  };

  const getArea = (key: string): number => {
    return data.reduce((total, field) => {
      field.tasks?.forEach((task) => {
        total += task.taskStatus === key ? field.areaSi : 0;
      });
      return total;
    }, 0);
  };

  const VALUES = {
    AMOUNT: {
      OPEN: getAmount("OPEN"),
      EXECUTED: getAmount("EXECUTED"),
      IN_WORK_ON_FO: getAmount("IN_WORK_ON_FO"),
    },
    AREA: {
      OPEN: getArea("OPEN"),
      EXECUTED: getArea("EXECUTED"),
      IN_WORK_ON_FO: getArea("IN_WORK_ON_FO"),
    },
  };

  const createAmountData = (
    labelKey: keyof typeof PhrasesTranslationKeys,
    status: keyof typeof VALUES.AMOUNT,
    color: string,
  ) => ({
    label: t(PhrasesTranslationKeys[labelKey]).toString(),
    value: VALUES.AMOUNT[status],
    max: TOTAL_AMOUNT,
    color: color,
  });

  const createAreaData = (
    labelKey: keyof typeof PhrasesTranslationKeys,
    status: keyof typeof VALUES.AMOUNT,
    color: string,
  ) => ({
    label: t(PhrasesTranslationKeys[labelKey]).toString(),
    value: VALUES.AREA[status],
    max: TOTAL_AREA,
    color: color,
  });

  const createPercentData = (
    labelKey: keyof typeof PhrasesTranslationKeys,
    status: keyof typeof VALUES.AMOUNT,
    color: string,
  ) => ({
    label: t(PhrasesTranslationKeys[labelKey]).toString(),
    value: ((VALUES.AMOUNT[status] / TOTAL_AMOUNT) * 100).toFixed(2),
    max: TOTAL_PERCENT,
    color: color,
  });

  return {
    amount: [
      createAmountData("OPEN", "OPEN", theme.palette.additional.blue),
      createAmountData(
        "IN_WORK_ON_FO",
        "IN_WORK_ON_FO",
        theme.palette.additional.honey,
      ),
      createAmountData("EXECUTED", "EXECUTED", theme.palette.additional.green),
    ],
    area: [
      createAreaData("OPEN", "OPEN", theme.palette.additional.blue),
      createAreaData(
        "IN_WORK_ON_FO",
        "IN_WORK_ON_FO",
        theme.palette.additional.honey,
      ),
      createAreaData("EXECUTED", "EXECUTED", theme.palette.additional.green),
    ],
    percent: [
      createPercentData("OPEN", "OPEN", theme.palette.additional.blue),
      createPercentData(
        "IN_WORK_ON_FO",
        "IN_WORK_ON_FO",
        theme.palette.additional.honey,
      ),
      createPercentData("EXECUTED", "EXECUTED", theme.palette.additional.green),
    ],
  };
};

export const getFieldsAmount = (data: [FieldsResponse] | undefined) => {
  if (!data) return 0;

  return data.length;
};

export const getFieldsTotalArea = (data: [FieldsResponse] | undefined) => {
  if (!data) return 0;

  return data.reduce((total, { areaSi }) => total + areaSi, 0);
};

export const getTasksAmount = (data: [FieldsResponse] | undefined) => {
  if (!data) return 0;

  return data.reduce(
    (total, { tasks }) => total + (tasks ? tasks.length : 0),
    0,
  );
};

export const getWidgetCropsOverviewData = (
  data: [FieldsResponse] | undefined,
) => {
  if (!data) return [];

  let cropsArray: ICropItem[] = [];

  data.map(
    (field) =>
      field.crop?.name &&
      cropsArray.push({
        cropName: field.crop?.name.trim(),
        areaSi: field.areaSi,
        color: field.crop?.colorHex || "",
        percentage: 0,
      }),
  );

  let result = cropsArray.reduce((acc: ICropItem[], item: ICropItem) => {
    const existingItem = acc.find((i) => i.cropName === item.cropName);

    if (existingItem) {
      existingItem.areaSi += item.areaSi;
    } else {
      acc.push({
        cropName: item.cropName.trim(),
        areaSi: item.areaSi,
        color: item.color,
        percentage: 0,
      });
    }

    return acc;
  }, []);

  const totalValue = result.reduce(
    (total: number, item: ICropItem) => total + item.areaSi,
    0,
  );

  result.forEach((item: ICropItem) => {
    item.percentage = parseFloat(((item.areaSi / totalValue) * 100).toFixed(2));
  });

  result = result.sort((a, b) => b.percentage - a.percentage);

  const limit = 8;
  if (result.length > limit) {
    const others = result.slice(limit - 1);
    const otherGroup = {
      cropName: "Other",
      areaSi: others.reduce((total, item) => total + item.areaSi, 0),
      color: "#D2D4D6",
      percentage: parseFloat(
        (
          (others.reduce((total, item) => total + item.areaSi, 0) /
            totalValue) *
          100
        ).toFixed(2),
      ),
    };

    result = result.slice(0, limit - 1);
    result.push(otherGroup);
  }

  return result;
};

export const getWidgetTasksDetailsData = (
  data: [FieldsResponse] | undefined,
) => {
  if (!data) return;

  const TASKS = [
    "Fertilizing",
    "Harvesting",
    "Planting",
    "Spraying",
    "Tilling",
    "Other",
  ];

  const ICONS: { [key: string]: React.ElementType } = {
    Fertilizing: FertilizingIcon,
    Harvesting: HarvestingIcon,
    Planting: PlantingIcon,
    Spraying: SprayingIcon,
    Tilling: TillingIcon,
    Other: OtherIcon,
  };

  const result: any = {};

  data.forEach((field: FieldsResponse) => {
    const fieldCountedForStatus: { [key: string]: { [key: string]: boolean } } =
      {};

    field.tasks?.forEach((task: any) => {
      const taskStatus = task.taskStatus;
      const taskName = TASKS.includes(task.operation.name)
        ? task.operation.name
        : "Other";

      if (!result[taskStatus]) {
        result[taskStatus] = {
          data: {},
          totalAmount: 0,
          totalArea: 0,
        };
      }

      if (!result[taskStatus]?.data[taskName]) {
        result[taskStatus]!.data[taskName] = {
          fieldsAmount: 0,
          areaSi: 0,
        };
      }

      if (!fieldCountedForStatus[taskStatus]) {
        fieldCountedForStatus[taskStatus] = {};
      }

      if (!fieldCountedForStatus[taskStatus]![taskName]) {
        result[taskStatus]!.data[taskName].fieldsAmount += 1;
        result[taskStatus]!.data[taskName].areaSi += field.areaSi;

        result[taskStatus]!.totalAmount += 1;
        result[taskStatus]!.totalArea += field.areaSi;

        fieldCountedForStatus[taskStatus]![taskName] = true;
      }
    });
  });

  const formattedResult: { [key: string]: IWidgetTaskDetails[] } = {};

  Object.keys(result).forEach((status) => {
    const statusKey = status;
    const formattedData: any[] = [];

    Object.keys(result[statusKey]!.data).forEach((taskType) => {
      const taskData = result[statusKey]!.data[taskType];

      let progress: string | number;
      if (statusKey === "EXECUTED") {
        progress = 100;
      } else if (statusKey === "OPEN") {
        progress = 0;
      } else {
        progress = (
          (taskData.areaSi / result[statusKey]!.totalArea) *
          100
        ).toFixed(2);
      }

      formattedData.push({
        icon: ICONS[taskType],
        type: taskType,
        fieldsAmount: taskData.fieldsAmount,
        areaSi: taskData.areaSi,
        progress: Number(progress),
      });
    });

    formattedData.push({
      icon: "",
      type: "Total",
      fieldsAmount: result[statusKey]!.totalAmount,
      areaSi: result[statusKey]!.totalArea,
      progress: statusKey === "OPEN" ? 0 : 100,
    });

    formattedResult[statusKey] = formattedData.sort((a, b) => {
      if (a.type === "Total") return 1;
      if (b.type === "Total") return -1;

      if (a.type === "Other") return 1;
      if (b.type === "Other") return -1;

      return b.progress - a.progress;
    });
  });

  return formattedResult;
};
