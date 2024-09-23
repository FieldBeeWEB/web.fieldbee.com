import { MeasurementType, TasksResponse } from "@fieldbee/api";
import { SelectableBox, Stack } from "@fieldbee/ui";
import { Button, Divider, Typography } from "@fieldbee/ui/components";
import * as React from "react";
import useAppContext from "../shared/providers/use-app-context";
import { useGetTasks } from "@fieldbee/api/hooks/queries/use-get-tasks";
import {
  FertilizingIcon,
  HarvestingIcon,
  HaymakingIcon,
  OtherIcon,
  PlantingIcon,
  SprayingIcon,
  TillingIcon,
} from "@fieldbee/ui/custom-icons/tasks";
import formatDate from "./utils/format-date";
import { getMeasurementString } from "../../helpers/format-area";

interface Props {
  selectedGroup?: string;
  searchTerm?: string;
}

enum OPERATION {
  FERTILIZING = "fertilizing",
  HARVESTING = "harvesting",
  HAYMAKING = "haymaking",
  PLANTING = "planting",
  SPRAYING = "spraying",
  TILLING = "tilling",
  OTHER = "other",
}

const operationIcons: Record<OPERATION, JSX.Element> = {
  [OPERATION.FERTILIZING]: (
    <FertilizingIcon sx={{ width: "80px", height: "80px" }} />
  ),
  [OPERATION.HARVESTING]: (
    <HarvestingIcon sx={{ width: "80px", height: "80px" }} />
  ),
  [OPERATION.HAYMAKING]: (
    <HaymakingIcon sx={{ width: "80px", height: "80px" }} />
  ),
  [OPERATION.PLANTING]: <PlantingIcon sx={{ width: "80px", height: "80px" }} />,
  [OPERATION.SPRAYING]: <SprayingIcon sx={{ width: "80px", height: "80px" }} />,
  [OPERATION.TILLING]: <TillingIcon sx={{ width: "80px", height: "80px" }} />,
  [OPERATION.OTHER]: <OtherIcon sx={{ width: "80px", height: "80px" }} />,
};

export default function TaskPanel({ selectedGroup, searchTerm }: Props) {
  const term = searchTerm || "";

  const { selectedTask, setSelectedTask } = useAppContext();
  // const { handleSetCenterByBbox } = useMapContext();

  const { data } = useGetTasks();

  const handleSelectTask = React.useCallback(
    (task: null | TasksResponse) => {
      if (task) {
        setSelectedTask(task);
        // handleSetCenterByBbox(task.fields[0].bbox);
      }
    },
    // [handleSetCenterByBbox, setSelectedTask],
    [setSelectedTask],
  );

  const filteredData =
    data &&
    data.filter(
      (x) =>
        x.taskName && x.taskName.toLowerCase().includes(term.toLowerCase()),
    );

  const items = filteredData
    ? selectedGroup
      ? filteredData.filter((x) => {
          if (selectedGroup === "Other") {
            return !x.taskStatus;
          } else {
            return x.taskStatus && x.taskStatus === selectedGroup;
          }
        })
      : filteredData
    : [];

  const operationIcon = (name: string): JSX.Element => {
    const operationKey =
      OPERATION[name.toUpperCase() as keyof typeof OPERATION];
    return operationIcons[operationKey] || <OtherIcon width={72} height={72} />;
  };

  return (
    <Stack overflow="scroll" spacing={1} padding={1} height={"100%"}>
      {items.length > 0 ? (
        items.map(
          (task) =>
            task.fields[0] && (
              <SelectableBox
                padding={0}
                key={task.uri}
                selected={!!(selectedTask && selectedTask.uri === task.uri)}
              >
                <Stack direction="column">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    padding={1}
                    onClick={() => handleSelectTask(task)}
                  >
                    <Stack
                      direction="row"
                      sx={{
                        overflow: "hidden",
                        width: "100%",
                      }}
                    >
                      {operationIcon(
                        task.operation.entityType.name.toLowerCase(),
                      )}

                      <Stack
                        spacing={0}
                        minWidth={0}
                        direction={"row"}
                        justifyContent={"space-between"}
                        alignItems={"top"}
                        width={"100%"}
                      >
                        <Stack spacing={0} minWidth={0}>
                          <Typography
                            sx={(theme) => ({
                              color:
                                selectedTask && selectedTask.uri === task.uri
                                  ? theme.palette.primary.main
                                  : "#ffffff",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            })}
                            variant="h6"
                          >
                            {task.taskName}
                          </Typography>
                          <Typography
                            sx={() => ({
                              color: "#ffffff",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            })}
                            variant="body1"
                          >
                            {task.operation.entityType.name}
                          </Typography>
                          {task.fields.map((field) => (
                            <Typography key={field.id}>
                              {field.name}
                              {" | "}
                              {getMeasurementString(
                                field.areaSi,
                                MeasurementType.AREA,
                              )}{" "}
                              {field.crop && `| ${field.crop.name}`}
                            </Typography>
                          ))}
                        </Stack>
                        <Stack spacing={0} minWidth={0} direction={"column"}>
                          <Typography
                            component={"span"}
                            sx={(theme) => ({
                              color:
                                selectedTask && selectedTask.uri === task.uri
                                  ? theme.palette.primary.main
                                  : "",
                              textAlign: "right",
                            })}
                          >
                            {formatDate(task.taskStartDate)}
                            {task.taskEndDate &&
                              task.taskEndDate !== task.taskStartDate && (
                                <>
                                  <hr />
                                  {formatDate(task.taskEndDate)}
                                </>
                              )}
                          </Typography>
                          <Typography
                            sx={() => ({
                              textAlign: "right",
                              marginTop: "auto",
                            })}
                          >
                            {task.orgName}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                  {selectedTask && selectedTask.uri === task.uri && (
                    <Stack
                      sx={(theme) => ({
                        borderTop: `1px solid ${theme.palette.primary_shades[200]}`,
                      })}
                      direction="row"
                      textTransform="uppercase"
                      fontSize="14px"
                      spacing={0}
                      divider={
                        <Divider
                          orientation="vertical"
                          flexItem
                          sx={(theme) => ({
                            borderColor: theme.palette.primary.main,
                          })}
                        />
                      }
                    >
                      {/* TODO: buttons click events */}
                      <Button
                        size="medium"
                        variant="text"
                        // onClick={() => {
                        //   router.push(
                        //       pagePaths.authPages.editField(
                        //           field.id.toString(),
                        //           field.uri,
                        //       ),
                        //   );
                        // }}
                        sx={{
                          width: "50%",
                        }}
                      >
                        Edit boundaries
                      </Button>

                      <Button
                        size="medium"
                        variant="text"
                        // onClick={() => {
                        //   router.push(
                        //       pagePaths.authPages.field(
                        //           field.id.toString(),
                        //           field.uri,
                        //       ),
                        //   );
                        // }}
                        sx={{
                          width: "50%",
                        }}
                      >
                        Task details
                      </Button>
                    </Stack>
                  )}
                </Stack>
              </SelectableBox>
            ),
        )
      ) : (
        <Stack margin={"auto"} textAlign={"center"}>
          <Typography>
            There are no tasks matching requested criteria.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
