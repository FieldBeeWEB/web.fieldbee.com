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
  // const { data } = useGetOrganizationFields();

  // const data = undefined;
  // const isLoading = false;
  // const isFetching = false;

  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [isFetching, setIsFetching] = useState<boolean>(true);
  // useEffect(() => {
  //   const handleTimeout = () => {
  //     setIsLoading(!isLoading);
  //     setIsFetching(!isFetching);
  //   };
  //   setTimeout(() => {
  //     handleTimeout();
  //   }, 3000);
  // }, [isLoading, isFetching]);

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
        <Stack overflow={"auto"} paddingBottom={6}>
          <DashboardHeader
            handleSelectedPeriod={setSelectedPeriod}
            selectedPeriod={selectedPeriod}
          />
          <DashboardContainer>
            <Stack spacing={1} direction={"row"}>
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
            <Stack spacing={1} direction={"row"}>
              <Stack spacing={1} direction={"column"} width={"50%"}>
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
                    sx={{
                      fontSize: "28px",
                      lineHeight: "36px",
                      fontWeight: 400,
                      textAlign: "center",
                      color: theme.palette.white[900],
                    }}
                  >
                    Advertise here
                  </Typography>
                </WidgetWrapper>
              </Stack>
              <Stack spacing={1} direction={"column"} width={"50%"}>
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
            {/* <div>Selected period: {selectedPeriod}</div> */}
          </DashboardContainer>
        </Stack>
      </Container>
    </AuthedLayout>
  );
};

export default Dashboard;
