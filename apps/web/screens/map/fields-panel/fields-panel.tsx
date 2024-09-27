import {
  FieldsResponse,
  MeasurementType,
  useGetOrganizationFields,
} from "@fieldbee/api";
import { SelectableBox, Stack } from "@fieldbee/ui";
import { Button, Divider, Typography } from "@fieldbee/ui/components";
import { useRouter } from "next/router";
import * as React from "react";
import { pagePaths } from "../../../config/page-paths";
import { getMeasurementString } from "../../../helpers/format-area";
import useAppContext from "../../shared/providers/use-app-context";
import getFieldImageUri from "../utils/get-field-image-uri";
import useMapContext from "../utils/use-map-context";

interface Props {
  selectedGroup?: string;
  searchTerm?: string;
}

export default function FieldsPanel({ selectedGroup, searchTerm }: Props) {
  const term = searchTerm || "";
  const router = useRouter();

  const { selectedField, setSelectedField } = useAppContext();
  const { handleSetCenterByBbox } = useMapContext();

  const { data } = useGetOrganizationFields();

  const handleSelectField = React.useCallback(
    (field: null | FieldsResponse) => {
      if (field) {
        setSelectedField(field);
        handleSetCenterByBbox(field.bbox);
      }
    },
    [handleSetCenterByBbox, setSelectedField],
  );

  const filteredData =
    data &&
    data.filter(
      (x) => x.name && x.name.toLowerCase().includes(term.toLowerCase()),
    );

  const items = filteredData
    ? selectedGroup
      ? filteredData.filter((x) => {
          if (selectedGroup === "Other") {
            return !x.category;
          } else {
            return x.category && x.category.name === selectedGroup;
          }
        })
      : filteredData
    : [];

  return (
    <Stack overflow="scroll" spacing={1} padding={1} height={"100%"}>
      {items.length > 0 ? (
        items.map((field) => (
          <SelectableBox
            padding={0}
            key={field.uri}
            selected={(selectedField && selectedField.id === field.id) || false}
          >
            <Stack direction="column">
              <Stack
                direction="row"
                justifyContent="space-between"
                padding={1}
                onClick={() => handleSelectField(field)}
              >
                <Stack
                  direction="row"
                  sx={{
                    overflow: "hidden",
                  }}
                >
                  <img
                    alt={field.name}
                    src={getFieldImageUri(field.id, field.bbox, 72)}
                    height="72px"
                    width="72px"
                  />

                  <Stack spacing={0} minWidth={0}>
                    <Typography
                      sx={(theme) => ({
                        color:
                          selectedField && selectedField.id === field.id
                            ? theme.palette.primary.main
                            : "#ffffff",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      })}
                      variant="h6"
                    >
                      {field.name}
                    </Typography>
                    <Typography>
                      {getMeasurementString(field.areaSi, MeasurementType.AREA)}{" "}
                      {field.crop && `| ${field.crop.name}`}
                    </Typography>

                    <Stack spacing="0">
                      {/*{field.tasks?.map((task) => (*/}
                      {/*  <Typography key={task.uri}>{task.taskName}</Typography>*/}
                      {/*))}*/}
                      {field.tasks && field.tasks?.at(-1)?.taskName}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              {selectedField && selectedField.id === field.id && (
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
                  <Button
                    size="medium"
                    variant="text"
                    onClick={() => {
                      router.push(
                        pagePaths.authPages.editField(
                          field.id.toString(),
                          field.uri,
                        ),
                      );
                    }}
                    sx={{
                      width: "50%",
                    }}
                  >
                    Edit boundaries
                  </Button>

                  <Button
                    size="medium"
                    variant="text"
                    onClick={() => {
                      router.push(
                        pagePaths.authPages.field(
                          field.id.toString(),
                          field.uri,
                        ),
                      );
                    }}
                    sx={{
                      width: "50%",
                    }}
                  >
                    Field details
                  </Button>
                </Stack>
              )}
            </Stack>
          </SelectableBox>
        ))
      ) : (
        <Stack margin={"auto"} textAlign={"center"}>
          <Typography>
            There are no fields matching requested criteria.
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
