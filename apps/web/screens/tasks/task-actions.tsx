import { Stack, theme } from "@fieldbee/ui";
import { Badge, Box, IconButton } from "@fieldbee/ui/components";
import ExportIcon from "@fieldbee/ui/custom-icons/ExportIcon";
import { ListAlt, TuneOutlined, ViewKanbanOutlined } from "@fieldbee/ui/icons";
import { t } from "i18next";
import { Dispatch, SetStateAction } from "react";
import { SingleWordsTranslationKeys } from "../../localization";

interface ITaskActions {
  viewMode: "list" | "kanban";
  setViewMode: Dispatch<SetStateAction<"list" | "kanban">>;
}

const TaskActions = ({ viewMode, setViewMode }: ITaskActions) => {
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
                color: theme.palette.white[600],
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
            onClick={() =>
              viewMode === "list" ? setViewMode("kanban") : setViewMode("list")
            }
          >
            {viewMode === "list" ? (
              <ViewKanbanOutlined
                sx={{
                  width: "32px",
                  height: "32px",
                  color: theme.palette.white[600],
                }}
              />
            ) : (
              <ListAlt
                sx={{
                  width: "32px",
                  height: "32px",
                  color: theme.palette.white[600],
                }}
              />
            )}
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
                color: theme.palette.white[600],
              }}
            />
          </IconButton>
        </Badge>
      </Box>
    </Stack>
  );
};

export default TaskActions;
