import { SelectableRow } from "@fieldbee/ui";
import { Divider, Stack, Typography } from "@fieldbee/ui/components";
import { ArrowRightSharp } from "@fieldbee/ui/icons";
import { t } from "i18next";
import { SingleWordsTranslationKeys } from "../../localization";
import { getMeasurementString } from "../../helpers/format-area";
import { MeasurementType, TasksResponse } from "@fieldbee/api";

interface Props {
  group: TasksResponse[];
  name: keyof typeof statusName;
  handleSelectGroup: (groupName: string) => void;
  selectedGroup: string;
}

export const statusName = {
  OPEN: "Open",
  IN_WORK_ON_FO: "In progress",
  EXECUTED: "Done",
};

export default function TaskGroup({
  group,
  name,
  handleSelectGroup,
  selectedGroup,
}: Props) {
  return (
    <SelectableRow
      selected={selectedGroup === name}
      onClick={() => handleSelectGroup(name)}
    >
      <Stack
        direction="row"
        alignItems="center"
        padding="16px"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Typography>{statusName[name]}</Typography>
        <Typography variant="caption">
          {group.length}{" "}
          {group.length > 1
            ? t(SingleWordsTranslationKeys.Tasks)
            : t(SingleWordsTranslationKeys.Task)}
        </Typography>

        <Typography variant="caption">
          {getMeasurementString(
            group
              .map((g) => g.fields.map((field) => field.areaSi))
              .flat()
              .reduce((a, b) => a + b, 0),
            MeasurementType.AREA,
          )}
        </Typography>
      </Stack>
      {selectedGroup === name && (
        <ArrowRightSharp
          sx={{
            padding: "8px",
          }}
          color="primary"
        />
      )}
    </SelectableRow>
  );
}
