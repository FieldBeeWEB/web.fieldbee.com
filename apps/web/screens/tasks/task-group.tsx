import { TasksResponse } from "@fieldbee/api";
import { Stack } from "@fieldbee/ui/components";
import { t } from "i18next";
import { SingleWordsTranslationKeys } from "../../localization";
import TaskKanban from "./task-kanban";
import TaskList, { statusName } from "./task-list";

interface Props {
  tasks: TasksResponse[];
  viewMode?: "list" | "kanban";
  searchTerm: string;
  handleSelectGroup: (groupName: string) => void;
  selectedGroup: string;
}

type GroupedTasks = {
  [key: string]: TasksResponse[];
};

export default function TaskGroup({
  tasks,
  viewMode = "list",
  searchTerm,
  selectedGroup,
  handleSelectGroup,
}: Props) {
  const groupedTasks =
    tasks &&
    tasks
      .filter((x) =>
        x.taskName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .reduce<GroupedTasks>(
        (groups, item) => ({
          ...groups,
          [item.taskStatus
            ? item.taskStatus
            : t(SingleWordsTranslationKeys.Other)]: [
            ...(groups[
              item.taskStatus
                ? item.taskStatus
                : t(SingleWordsTranslationKeys.Other)
            ] || []),
            item,
          ],
        }),
        {},
      );

  const taskGroupNames = Object.keys(groupedTasks);
  return (
    <Stack
      spacing={0}
      sx={
        viewMode === "list"
          ? {
              flexDirection: "column",
            }
          : {
              flexDirection: "row",
              justifyContent: "space-between",
              marginX: 3,
              marginY: 2,
              gap: 5,
            }
      }
    >
      {taskGroupNames
        .reverse()
        .map((taskName) =>
          viewMode === "list" ? (
            <TaskList
              key={taskName}
              name={taskName as keyof typeof statusName}
              group={groupedTasks[taskName]}
              handleSelectGroup={handleSelectGroup}
              selectedGroup={selectedGroup}
            />
          ) : (
            <TaskKanban
              key={taskName}
              name={taskName as keyof typeof statusName}
              group={groupedTasks[taskName]}
              handleSelectGroup={handleSelectGroup}
              selectedGroup={selectedGroup}
            />
          ),
        )}
    </Stack>
  );
}
