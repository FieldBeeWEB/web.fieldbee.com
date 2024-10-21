import { TasksResponse } from "@fieldbee/api";
import { Dropdown, DropdownMenuItem, Stack, theme } from "@fieldbee/ui";
import {
  Box,
  Checkbox,
  IconButton,
  ListItemIcon,
  Typography,
} from "@fieldbee/ui/components";

import ExportIcon from "@fieldbee/ui/custom-icons/ExportIcon";
import * as TaskIcon from "@fieldbee/ui/custom-icons/tasks";
import WrapLineIcon from "@fieldbee/ui/custom-icons/WrapLineIcon";
import DropdownNestedMenuItem from "@fieldbee/ui/dropdown-new/NestedMenuItem";

import { ArchiveOutlined, Delete, Edit, MoreVert } from "@fieldbee/ui/icons";
import { useState } from "react";

interface ITaskItem {
  task: TasksResponse;
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
    <TaskIcon.FertilizingIcon sx={{ width: "24px", height: "24px" }} />
  ),
  [OPERATION.HARVESTING]: (
    <TaskIcon.HarvestingIcon sx={{ width: "24px", height: "24px" }} />
  ),
  [OPERATION.HAYMAKING]: (
    <TaskIcon.HaymakingIcon sx={{ width: "24px", height: "24px" }} />
  ),
  [OPERATION.PLANTING]: (
    <TaskIcon.PlantingIcon sx={{ width: "24px", height: "24px" }} />
  ),
  [OPERATION.SPRAYING]: (
    <TaskIcon.SprayingIcon sx={{ width: "24px", height: "24px" }} />
  ),
  [OPERATION.TILLING]: (
    <TaskIcon.TillingIcon sx={{ width: "24px", height: "24px" }} />
  ),
  [OPERATION.OTHER]: (
    <TaskIcon.OtherIcon sx={{ width: "24px", height: "24px" }} />
  ),
};

const TaskListItem = ({ task }: ITaskItem) => {
  const [selected, setSelected] = useState<string>("");

  const operationIcon = (name: string): JSX.Element => {
    const operationKey =
      OPERATION[name.toUpperCase() as keyof typeof OPERATION];
    return (
      operationIcons[operationKey] || (
        <TaskIcon.OtherIcon width={24} height={24} />
      )
    );
  };

  return (
    <Stack
      paddingX={1}
      paddingY={1.5}
      bgcolor={
        selected === task.uri
          ? theme.palette.mix_shades[200]
          : theme.palette.secondary_shades[200]
      }
      border={
        selected === task.uri
          ? `1px solid ${theme.palette.primary_shades[500]}`
          : `1px solid ${theme.palette.secondary_shades[300]}`
      }
      borderRadius={0.5}
      direction={"row"}
      alignItems={"center"}
      gap={1}
      spacing={0}
      sx={{
        ":hover": {
          cursor: "pointer",
          borderColor: theme.palette.primary_shades[500],
          bgcolor: theme.palette.mix_shades[200],
        },
      }}
      onClick={() =>
        selected === task.uri ? setSelected("") : setSelected(task.uri)
      }
    >
      <Stack width={"250px"} direction={"row"} alignItems={"center"}>
        <Checkbox
          sx={{
            ".MuiCheckbox-root": {
              display: "inline-flex",
            },
          }}
          checked={selected === task.uri}
        />
        {operationIcon(task.operation.entityType.name.toLowerCase())}
        <Typography variant="body1">{task.taskName}</Typography>
      </Stack>
      <Box
        sx={{
          background: theme.palette.white[300],
          width: "2px",
          height: "24px",
        }}
      />

      <Typography variant={"body2"} paddingX={1}>
        {new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date(task.taskStartDate))}
      </Typography>
      <Box
        sx={{
          background: theme.palette.white[300],
          width: "2px",
          height: "24px",
        }}
      />
      <Typography variant={"body2"} paddingX={1} width={200}>
        {task.fields[0]?.name}
        {task.fields.length > 1 && ` +${task.fields.length - 1}`}
      </Typography>
      {task.fields[0]?.crop && (
        <>
          <Box
            sx={{
              background: theme.palette.white[300],
              width: "2px",
              height: "24px",
            }}
          />
          <Stack
            direction={"row"}
            alignItems={"center"}
            gap={1}
            spacing={0}
            paddingX={1}
          >
            <Box
              sx={{
                width: "24px",
                height: "24px",
                borderRadius: "100%",
                background: task.fields[0]?.crop?.colorHex,
              }}
            />
            <Typography variant={"body2"}>
              {task.fields[0]?.crop?.name}
            </Typography>
          </Stack>
        </>
      )}
      <Box marginLeft={"auto"}>
        <Dropdown
          trigger={
            <IconButton size="large" aria-label="more">
              <MoreVert />
            </IconButton>
          }
          menu={[
            <DropdownMenuItem key="rename">
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              <span>Rename</span>
            </DropdownMenuItem>,
            <DropdownNestedMenuItem
              label="Change status"
              key="change"
              leftIcon={
                <ListItemIcon>
                  <WrapLineIcon />
                </ListItemIcon>
              }
              menu={[
                <DropdownMenuItem key="report-pdf">Open</DropdownMenuItem>,
                <DropdownMenuItem key="excel">In process</DropdownMenuItem>,
                <DropdownMenuItem key="csv">Completed</DropdownMenuItem>,
              ]}
            />,
            <DropdownMenuItem key="export">
              <ListItemIcon>
                <ExportIcon />
              </ListItemIcon>
              <span>Export</span>
            </DropdownMenuItem>,
            <DropdownMenuItem key="archive">
              <ListItemIcon>
                <ArchiveOutlined />
              </ListItemIcon>
              <span>Archive</span>
            </DropdownMenuItem>,
            <DropdownMenuItem key="delete">
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              <span>Delete</span>
            </DropdownMenuItem>,
          ]}
        />
      </Box>
    </Stack>
  );
};

export default TaskListItem;
