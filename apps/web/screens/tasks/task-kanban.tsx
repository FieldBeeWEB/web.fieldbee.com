import { TasksResponse } from "@fieldbee/api";
import { Stack, theme } from "@fieldbee/ui";
import { Box, Typography } from "@fieldbee/ui/components";
import { TaskKanbanItem } from "./task-kanban-item";
import { statusColor, statusName } from "./task-list";

interface Props {
  group: TasksResponse[];
  name: keyof typeof statusName;
  handleSelectGroup: (groupName: string) => void;
  selectedGroup: string;
}

const TaskKanban = ({
  group,
  name,
  handleSelectGroup,
  selectedGroup,
}: Props) => {
  return (
    <Stack direction={"column"} spacing={0} gap={2} width={"30%"}>
      <Box
        sx={{
          bgcolor: theme.palette.background.default,
          borderRadius: 0.5,
          borderTop: `2px solid ${statusColor[name]}`,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            paddingY: 1.75,
            textAlign: "center",
            color: "#FFF",
          }}
        >
          {statusName[name]}
        </Typography>
      </Box>
      {group.map((task, index) => (
        <TaskKanbanItem task={task} key={index} />
      ))}
    </Stack>
  );
};

export default TaskKanban;
