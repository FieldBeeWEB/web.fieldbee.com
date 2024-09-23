import { Stack } from "@fieldbee/ui/components";
import { t } from "i18next";
import { SingleWordsTranslationKeys } from "../../localization";
import TaskGroup, { statusName } from "./task-group";
import { TasksResponse } from "@fieldbee/api";

interface Props {
  tasks: TasksResponse[];
  searchTerm: string;
  handleSelectGroup: (groupName: string) => void;
  selectedGroup: string;
}

type GroupedTasks = {
  [key: string]: TasksResponse[];
};

export default function TaskList({
  tasks,
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
    <Stack spacing={0} direction="column">
      {taskGroupNames.map((taskName) => (
        <TaskGroup
          key={taskName}
          name={taskName as keyof typeof statusName}
          group={groupedTasks[taskName]}
          handleSelectGroup={handleSelectGroup}
          selectedGroup={selectedGroup}
        />
      ))}
    </Stack>
  );
}
