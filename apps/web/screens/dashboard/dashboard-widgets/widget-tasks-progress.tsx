import { Stack, theme } from "@fieldbee/ui";
import { Gauge, gaugeClasses } from "@fieldbee/ui/charts";
import { Button, Typography } from "@fieldbee/ui/components";
import { Check } from "@fieldbee/ui/icons";
import { useState } from "react";
import WidgetWrapper from "./widget-wrapper";
import {
  IWidgetTasksProgressData,
  IWidgetTasksProgressDataItem,
} from "../utils/dashboard-helper";
import WidgetLoader from "./widget-loader";
import { getMeasurementString } from "../../../helpers/format-area";
import { MeasurementType } from "@fieldbee/api";
import { t } from "i18next";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";

interface IWidgetTasksProgress {
  data: IWidgetTasksProgressData | undefined;
  isLoading: boolean;
  isFetching: boolean;
}

const WidgetTasksProgress = ({
  data,
  isLoading,
  isFetching,
}: IWidgetTasksProgress) => {
  const [taskFilter, setTaskFilter] = useState<"amount" | "area" | "percent">(
    "amount",
  );

  const taskFilters: ["amount", "area", "percent"] = [
    "amount",
    "area",
    "percent",
  ];

  const taskFiltersTranslation = {
    amount: t(SingleWordsTranslationKeys.Amount).toString(),
    area: t(SingleWordsTranslationKeys.Area).toString(),
    percent: t(SingleWordsTranslationKeys.Percent).toString(),
  };

  return (
    <WidgetWrapper gap={1.5} spacing={0} height={"100%"} minHeight={262}>
      <Typography
        sx={{
          color: theme.palette.white[700],
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "20px",
        }}
      >
        {t(PhrasesTranslationKeys.AllTasks).toString()}
      </Typography>
      {isLoading || isFetching ? (
        <WidgetLoader
          text={t(PhrasesTranslationKeys.DownloadingData).toString()}
          size={112}
        />
      ) : (
        <>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            gap={3}
            spacing={0}
          >
            {data?.[taskFilter]?.map((task: IWidgetTasksProgressDataItem) => (
              <Stack
                spacing={0.25}
                key={task.label}
                sx={{
                  width: "100%",
                  height: 160,
                  margin: 0,
                  padding: "10px 0",
                }}
              >
                <Gauge
                  value={parseFloat(task.value as string) || 0}
                  valueMax={parseFloat(task.max as string) || 100}
                  text={({ value }) => {
                    if (taskFilter === "amount") {
                      return value ? value.toString() : "0";
                    }
                    if (taskFilter === "area") {
                      return getMeasurementString(
                        value ? value : 0,
                        MeasurementType.AREA,
                      );
                    }
                    if (taskFilter === "percent") {
                      return `${value}%`;
                    }
                    return "0";
                  }}
                  startAngle={-145}
                  endAngle={145}
                  innerRadius="80%"
                  sx={() => ({
                    [`& .${gaugeClasses.valueArc}`]: {
                      fill: task.color,
                    },
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: "22px",
                      lineHeight: "28px",
                    },
                  })}
                />
                <Typography
                  sx={{
                    color: theme.palette.white[700],
                    fontSize: "16px",
                    lineHeight: "24px",
                    textAlign: "center",
                  }}
                >
                  {task.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
          <Stack spacing={0.5} direction={"row"} alignItems={"center"}>
            {taskFilters.map((taskFilterName) => (
              <Button
                key={taskFilterName}
                startIcon={taskFilter === taskFilterName && <Check />}
                fullWidth
                onClick={() => setTaskFilter(taskFilterName)}
                sx={{
                  background:
                    taskFilter === taskFilterName
                      ? theme.palette.secondary_shades[300]
                      : "",
                  color:
                    taskFilter === taskFilterName
                      ? theme.palette.white[900]
                      : theme.palette.white[600],
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "20px",
                  textTransform: "capitalize",
                  border: `1px solid ${taskFilter === taskFilterName ? theme.palette.secondary_shades[300] : theme.palette.secondary_shades[400]}`,
                  ":hover": {
                    background: theme.palette.secondary_shades[300],
                  },
                }}
              >
                {taskFiltersTranslation[taskFilterName]}
              </Button>
            ))}
          </Stack>
        </>
      )}
    </WidgetWrapper>
  );
};

export default WidgetTasksProgress;
