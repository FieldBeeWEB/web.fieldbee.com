import { FieldsResponse } from "@fieldbee/api";
import { Stack } from "@fieldbee/ui/components";
import { t } from "i18next";
import { SingleWordsTranslationKeys } from "../../localization";
import FieldGroup from "./field-group";

interface Props {
  fields: FieldsResponse[];
  searchTerm: string;
  handleSelectGroup: (groupName: string) => void;
  selectedGroup: string;
}

type GroupedFields = {
  [key: string]: FieldsResponse[];
};

export default function FieldsList({
  fields,
  searchTerm,
  selectedGroup,
  handleSelectGroup,
}: Props) {
  const groupedFields =
    fields &&
    fields
      .filter((x) => x.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .reduce<GroupedFields>(
        (groups, item) => ({
          ...groups,
          [item.category
            ? item.category.name
            : t(SingleWordsTranslationKeys.Other)]: [
            ...(groups[
              item.category
                ? item.category.name
                : t(SingleWordsTranslationKeys.Other)
            ] || []),
            item,
          ],
        }),
        {}
      );

  const fieldGroupNames = Object.keys(groupedFields);
  return (
    <Stack spacing={0} direction="column">
      {fieldGroupNames.map((groupName) => (
        <FieldGroup
          key={groupName}
          name={groupName}
          group={groupedFields[groupName]}
          handleSelectGroup={handleSelectGroup}
          selectedGroup={selectedGroup}
        />
      ))}
    </Stack>
  );
}
