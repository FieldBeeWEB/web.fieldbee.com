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
import { ArrowDropDown } from "@fieldbee/ui/icons";
import { useState } from "react";
import WidgetWrapper from "./widget-wrapper";
import { t } from "i18next";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";
import WidgetLoader from "./widget-loader";
import {
  IWidgetTaskDetails,
  IWidgetTasksDetails,
} from "../utils/dashboard-helper";
import { getMeasurementString } from "../../../helpers/format-area";
import { MeasurementType } from "@fieldbee/api";
import WidgetEmptyData from "./widget-empty-data";

type TDropdownMenuItem = keyof typeof PhrasesTranslationKeys;

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
  const [selectedTaskType, setSelectedTaskType] = useState<
    keyof typeof PhrasesTranslationKeys
  >(dropdownMenu[0]);

  const menuItems = dropdownMenu.map((item: TDropdownMenuItem) => (
    <DropdownMenuItem
      key={item}
      selected={selectedTaskType === item}
      onClick={() => setSelectedTaskType(item)}
      sx={{
        textTransform: "capitalize",
      }}
    >
      <span>{t(PhrasesTranslationKeys[item]).toString()}</span>
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
    <WidgetWrapper gap={1.5} spacing={0} minHeight={348}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          sx={{
            color: theme.palette.white[700],
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "20px",
          }}
        >
          Task Type
        </Typography>
        <Dropdown
          type="dashboard"
          trigger={
            <Button
              sx={{
                color: theme.palette.white[900],
                gap: "8px",
                padding: "6px 8px 6px 12px",
                background: theme.palette.secondary_shades[300],
                "&:hover": {
                  background: theme.palette.secondary_shades[300],
                },
                textTransform: "capitalize",
                fontWeight: 500,
              }}
            >
              {t(PhrasesTranslationKeys[selectedTaskType]).toString()}
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
      ) : !tableData.tbody[selectedTaskType][0].type &&
        !tableData.tbody[selectedTaskType][0].areaSi ? (
        <WidgetEmptyData
          title={""}
          errorMsg={t(PhrasesTranslationKeys.NoTaskData).toString()}
          key={selectedTaskType}
        />
      ) : (
        <>
          <TableContainer>
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
                        borderBottom: "1px solid #3A3A3A",
                      }}
                    >
                      <Typography
                        sx={{
                          color: theme.palette.white[700],
                          fontSize: "12px",
                          fontWeight: 500,
                          lineHeight: "16px",
                        }}
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
                        ? "1px solid #3A3A3A"
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
                              sx={{
                                color: theme.palette.white[700],
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: "24px",
                              }}
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
                            sx={{
                              color: theme.palette.white[700],
                              fontSize: "16px",
                              fontWeight: 400,
                              lineHeight: "24px",
                            }}
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
                            sx={{
                              color: theme.palette.white[700],
                              fontSize: "16px",
                              fontWeight: 400,
                              lineHeight: "24px",
                            }}
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
                            sx={{
                              color: theme.palette.white[700],
                              fontSize: "16px",
                              fontWeight: 400,
                              lineHeight: "24px",
                            }}
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
