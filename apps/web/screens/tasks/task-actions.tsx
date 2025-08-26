import { Stack, theme } from "@fieldbee/ui";
import { Badge, Box, IconButton } from "@fieldbee/ui/components";
import ExportIcon from "@fieldbee/ui/custom-icons/ExportIcon";
import {
  ListAlt,
  TableViewOutlined,
  TuneOutlined,
  ViewKanbanOutlined,
} from "@fieldbee/ui/icons";
import { t } from "i18next";
import { Dispatch, SetStateAction } from "react";
import { SingleWordsTranslationKeys } from "../../localization";

interface ITaskActions {
  viewMode: "list" | "kanban" | "table";
  setViewMode: Dispatch<SetStateAction<"list" | "kanban" | "table">>;
}

const TaskActions = ({ viewMode, setViewMode }: ITaskActions) => {
  const viewModes: Array<"list" | "kanban" | "table"> = [
    "list",
    "kanban",
    "table",
  ];
  const iconMap: { [key: string]: React.ReactNode } = {
    list: (
      <ViewKanbanOutlined
        sx={{
          width: "32px",
          height: "32px",
          color: theme.palette.background.default,
        }}
      />
    ),
    kanban: (
      <TableViewOutlined
        sx={{
          width: "32px",
          height: "32px",
          color: theme.palette.background.default,
        }}
      />
    ),
    table: (
      <ListAlt
        sx={{
          width: "32px",
          height: "32px",
          color: theme.palette.background.default,
        }}
      />
    ),
  };
  const handleToggleViewMode = () => {
    const nextIndex = (viewModes.indexOf(viewMode) + 1) % viewModes.length;
    setViewMode(viewModes[nextIndex]);
  };

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={0.5} gap={0.5}>
      <Box>
        <Badge badgeContent={0} color="primary">
          <IconButton
            size="medium"
            aria-label={t(SingleWordsTranslationKeys.Filter).toString()}
          >
            <TuneOutlined
              sx={{
                width: "32px",
                height: "32px",
                color: theme.palette.background.default,
              }}
            />
          </IconButton>
        </Badge>
      </Box>
      <Box>
        <Badge badgeContent={0} color="primary">
          <IconButton
            size="medium"
            aria-label={t(SingleWordsTranslationKeys.ViewMode).toString()}
            onClick={handleToggleViewMode}
          >
            {iconMap[viewMode]}
          </IconButton>
        </Badge>
      </Box>
      <Box>
        <Badge badgeContent={0} color="primary">
          <IconButton
            size="medium"
            aria-label={t(SingleWordsTranslationKeys.Export).toString()}
          >
            <ExportIcon
              sx={{
                width: "32px",
                height: "32px",
                color: theme.palette.background.default,
              }}
            />
          </IconButton>
        </Badge>
      </Box>
    </Stack>
  );
};

export default TaskActions;
