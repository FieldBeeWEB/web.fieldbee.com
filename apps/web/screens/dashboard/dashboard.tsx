import { MeasurementType, useGetOrganizationFields } from "@fieldbee/api";
import { Stack, theme } from "@fieldbee/ui";
import { Container, Typography } from "@fieldbee/ui/components";
import { t } from "i18next";
import Image from "next/image";
import { useState } from "react";
import formatFixedArea, {
  getMeasurementString,
} from "../../helpers/format-area";
import { PhrasesTranslationKeys } from "../../localization";
import AuthedLayout from "../authed-layout";
import DashboardContainer from "./dashboard-container/dashboard-container";
import DashboardHeader from "./dashboard-header";
import WidgetCropsOverview from "./dashboard-widgets/widget-crops-overview";
import WidgetSummary from "./dashboard-widgets/widget-summary";
import WidgetTasksDetails from "./dashboard-widgets/widget-tasks-details";
import WidgetTasksProgress from "./dashboard-widgets/widget-tasks-progress";
import WidgetWrapper from "./dashboard-widgets/widget-wrapper";
import {
  getFieldsAmount,
  getFieldsTotalArea,
  getTasksAmount,
  getWidgetCropsOverviewData,
  getWidgetTasksDetailsData,
  getWidgetTasksProgressData,
} from "./utils/dashboard-helper";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");
  const { data, isLoading, isFetching } = useGetOrganizationFields();
  const widgetTasksProgressData = getWidgetTasksProgressData(data);
  const widgetCropsOverviewData = getWidgetCropsOverviewData(data);
  const widgetTasksDetailsData = getWidgetTasksDetailsData(data);
  const fieldsAmount = getFieldsAmount(data);
  const fieldsTotalAreaSi = getFieldsTotalArea(data);
  const fieldsTotalArea = fieldsTotalAreaSi
    ? getMeasurementString(fieldsTotalAreaSi, MeasurementType.AREA)
    : formatFixedArea(fieldsTotalAreaSi);
  const tasksAmount = getTasksAmount(data);

  return (
    <AuthedLayout>
      <Container>
        <Stack overflow={"auto"} paddingY={2}>
          <DashboardHeader
            handleSelectedPeriod={setSelectedPeriod}
            selectedPeriod={selectedPeriod}
          />
          <DashboardContainer>
            <Stack spacing={2} direction={"row"}>
              <WidgetSummary
                title={fieldsAmount}
                subtitle={t(PhrasesTranslationKeys.FieldsAmount).toString()}
                width={"100%"}
                isLoading={isLoading}
                isFetching={isFetching}
              />
              <WidgetSummary
                title={fieldsTotalArea}
                subtitle={t(PhrasesTranslationKeys.TotalArea).toString()}
                width={"100%"}
                isLoading={isLoading}
                isFetching={isFetching}
              />
              <WidgetSummary
                title={tasksAmount}
                subtitle={t(PhrasesTranslationKeys.TasksAmount).toString()}
                width={"100%"}
                isLoading={isLoading}
                isFetching={isFetching}
              />
            </Stack>
            <Stack spacing={2} direction={"row"}>
              <Stack spacing={2} direction={"column"} width={"50%"}>
                <WidgetCropsOverview
                  data={widgetCropsOverviewData}
                  isLoading={isLoading}
                  isFetching={isFetching}
                />
                <WidgetWrapper
                  height={"100%"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Image
                    src={"/advertise.gif"}
                    alt="Placeholder gif"
                    height={162}
                    width={300}
                    style={{
                      margin: "0 auto",
                    }}
                  />
                  <Typography
                    variant="h6"
                    color={theme.palette.surface_emphasis.high}
                  >
                    Advertise here
                  </Typography>
                </WidgetWrapper>
              </Stack>
              <Stack spacing={2} direction={"column"} width={"50%"}>
                <WidgetTasksProgress
                  data={widgetTasksProgressData}
                  isLoading={isLoading}
                  isFetching={isFetching}
                />
                <WidgetTasksDetails
                  data={widgetTasksDetailsData}
                  isLoading={isLoading}
                  isFetching={isFetching}
                />
              </Stack>
            </Stack>
          </DashboardContainer>
        </Stack>
      </Container>
    </AuthedLayout>
  );
};

export default Dashboard;
