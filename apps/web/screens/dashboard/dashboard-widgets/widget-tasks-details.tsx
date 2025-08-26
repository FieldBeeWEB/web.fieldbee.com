import { MeasurementType } from "@fieldbee/api";
import { Dropdown, DropdownMenuItem, Stack, theme } from "@fieldbee/ui";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@fieldbee/ui/components";
import TaskProgressIcons from "@fieldbee/ui/custom-icons/TaskProgressIcons";
import { ArrowDropDown } from "@fieldbee/ui/icons";
import { t } from "i18next";
import { useState } from "react";
import { getMeasurementString } from "../../../helpers/format-area";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";
import {
  IWidgetTaskDetails,
  IWidgetTasksDetails,
} from "../utils/dashboard-helper";
import WidgetEmptyData from "./widget-empty-data";
import WidgetLoader from "./widget-loader";
import WidgetWrapper from "./widget-wrapper";

type TDropdownMenuItem = "OPEN" | "IN_WORK_ON_FO" | "EXECUTED";

const WidgetTasksDetails = ({
  data,
  isLoading,
  isFetching,
}: IWidgetTasksDetails) => {
  const dropdownMenu: TDropdownMenuItem[] = [
    "OPEN",
    "IN_WORK_ON_FO",
    "EXECUTED",
  ];
  const [selectedTaskType, setSelectedTaskType] = useState<TDropdownMenuItem>(
    dropdownMenu[0],
  );

  const menuItems = dropdownMenu.map((item: TDropdownMenuItem) => (
    <DropdownMenuItem
      key={item}
      selected={selectedTaskType === item}
      onClick={() => setSelectedTaskType(item)}
      sx={{
        textTransform: "capitalize",
      }}
    >
      <TaskProgressIcons name={item} />
      <Typography variant="body1">
        {t(PhrasesTranslationKeys[item]).toString()}
      </Typography>
    </DropdownMenuItem>
  ));

  const tableData: any = {
    thead: [
      t(SingleWordsTranslationKeys.Type).toString(),
      t(SingleWordsTranslationKeys.FieldsAmount).toString(),
      t(SingleWordsTranslationKeys.Area).toString(),
      t(SingleWordsTranslationKeys.Progress).toString(),
    ],
    tbody: data,
  };

  return (
    <WidgetWrapper gap={0} spacing={0} minHeight={366}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          variant="subtitle2"
          color={theme.palette.surface_emphasis.medium}
        >
          {t(PhrasesTranslationKeys.TasksType).toString()}
        </Typography>
        <Dropdown
          trigger={
            <Button
              sx={{
                color: theme.palette.surface_emphasis.high,
                gap: "8px",
                padding: "8px 8px 8px 12px",
                background: theme.palette.elevation_overlay["08dp"],
                textTransform: "uppercase",
                "& > svg": {
                  width: "18px",
                  height: "18px",
                },
                ":hover": {
                  background: theme.palette.surface_states.hover,
                },
              }}
            >
              <TaskProgressIcons name={selectedTaskType} />
              <Typography variant="body2">
                {t(PhrasesTranslationKeys[selectedTaskType]).toString()}
              </Typography>
              <ArrowDropDown />
            </Button>
          }
          minWidth="200px"
          menu={[...menuItems]}
        />
      </Stack>
      {isLoading || isFetching ? (
        <WidgetLoader
          text={t(PhrasesTranslationKeys.DownloadingData).toString()}
        />
      ) : !data ? (
        <WidgetEmptyData
          title={""}
          errorMsg={t(PhrasesTranslationKeys.NoTaskData).toString()}
        />
      ) : !tableData.tbody[selectedTaskType]?.[0].type &&
        !tableData.tbody[selectedTaskType]?.[0].areaSi ? (
        <WidgetEmptyData
          title={""}
          errorMsg={t(PhrasesTranslationKeys.NoTaskData).toString()}
          key={selectedTaskType}
        />
      ) : (
        <>
          <TableContainer
            style={{
              minHeight: "290px",
              marginTop: 0,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {tableData.thead.map((cell: string, index: number) => (
                    <TableCell
                      key={index}
                      sx={{
                        padding: "9px 0",
                        textTransform: "capitalize",
                        textAlign: index !== 0 ? "center" : "left",
                        borderBottom: `1px solid ${theme.palette.outline.main}`,
                      }}
                    >
                      <Typography
                        variant="caption"
                        color={theme.palette.surface_emphasis.medium}
                      >
                        {cell}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.tbody[selectedTaskType].map(
                  (
                    {
                      icon: IconComponent,
                      type,
                      fieldsAmount,
                      areaSi,
                      progress,
                    }: IWidgetTaskDetails,
                    index: number,
                  ) => {
                    const tableCellPadding =
                      index === 0
                        ? "12px 0 6px 0"
                        : index === tableData.tbody[selectedTaskType].length - 2
                          ? "6px 0 12px 0"
                          : index ===
                              tableData.tbody[selectedTaskType].length - 1
                            ? "8px 0 0 0"
                            : "6px 0";
                    const tableCellBorderTop =
                      index === tableData.tbody[selectedTaskType].length - 1
                        ? `1px solid ${theme.palette.outline.main}`
                        : 0;

                    return (
                      <TableRow key={index}>
                        <TableCell
                          sx={{
                            padding: tableCellPadding,
                            border: 0,
                            borderTop: tableCellBorderTop,
                          }}
                        >
                          <Stack
                            borderRadius={"100%"}
                            padding={0}
                            direction={"row"}
                            alignItems={"center"}
                            spacing={2}
                          >
                            {IconComponent ? (
                              <IconComponent />
                            ) : (
                              <Stack width={24} height={24}></Stack>
                            )}
                            <Typography
                              variant="body1"
                              color={theme.palette.surface_emphasis.high}
                            >
                              {type}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell
                          sx={{
                            padding: tableCellPadding,
                            border: 0,
                            borderTop: tableCellBorderTop,
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            variant="body1"
                            color={theme.palette.surface_emphasis.high}
                          >
                            {fieldsAmount}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: tableCellPadding,
                            border: 0,
                            borderTop: tableCellBorderTop,
                            textAlign: "center",
                          }}
                        >
                          <Typography
                            variant="body1"
                            color={theme.palette.surface_emphasis.high}
                          >
                            {getMeasurementString(areaSi, MeasurementType.AREA)}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            padding: tableCellPadding,
                            border: 0,
                            borderTop: tableCellBorderTop,
                            textAlign: "center",
                            marginTop: "auto",
                            width: "100px",
                          }}
                        >
                          <Typography
                            variant="body1"
                            color={theme.palette.surface_emphasis.high}
                          >
                            {progress}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  },
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </WidgetWrapper>
  );
};

export default WidgetTasksDetails;
