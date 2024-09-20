import { FieldsResponse, MeasurementType } from "@fieldbee/api";
import { SelectableRow } from "@fieldbee/ui";
import { Divider, Stack, Typography } from "@fieldbee/ui/components";
import { ArrowRightSharp } from "@fieldbee/ui/icons";
import { t } from "i18next";
import { getMeasurementString } from "../../helpers/format-area";
import { SingleWordsTranslationKeys } from "../../localization";

interface Props {
  group: FieldsResponse[];
  name: string;
  handleSelectGroup: (groupName: string) => void;
  selectedGroup: string;
}
export default function FieldGroup({
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
        padding="16px"
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Typography>{name}</Typography>
        <Typography variant="caption">
          {group.length}{" "}
          {group.length > 1
            ? t(SingleWordsTranslationKeys.Fields)
            : t(SingleWordsTranslationKeys.Field)}
        </Typography>

        <Typography variant="caption">
          {getMeasurementString(
            group.map((x) => x.areaSi).reduce((a, b) => a + b, 0),
            MeasurementType.AREA
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
