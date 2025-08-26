import {
  FieldsResponse,
  MeasurementType,
  useGetOrganizationFields,
} from "@fieldbee/api";
import { DotDivider, SelectableBox, Stack, theme } from "@fieldbee/ui";
import { Button, Typography } from "@fieldbee/ui/components";
import { CheckCircle } from "@fieldbee/ui/icons";
import { t } from "i18next";
import { useRouter } from "next/router";
import * as React from "react";
import { pagePaths } from "../../../config/page-paths";
import { getMeasurementString } from "../../../helpers/format-area";
import {
  PhrasesTranslationKeys,
  SentencesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";
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
    <Stack sx={{ overflowY: "auto" }} spacing={1} paddingX={2} height={"100%"}>
      {items.length > 0 ? (
        items.map((field) => (
          <SelectableBox
            padding={1}
            key={field.uri}
            selected={(selectedField && selectedField.id === field.id) || false}
          >
            <Stack direction="column">
              <Stack
                direction="row"
                justifyContent="space-between"
                onClick={() => handleSelectField(field)}
              >
                <Stack
                  direction="row"
                  sx={{
                    overflow: "hidden",
                  }}
                  spacing={2}
                  width="100%"
                >
                  <img
                    alt={field.name}
                    src={getFieldImageUri(field.id, field.bbox, 72)}
                    height="72px"
                    width="72px"
                  />

                  <Stack
                    spacing={0}
                    minWidth={0}
                    width="100%"
                    direction="column"
                    justifyContent={
                      selectedField && selectedField.id === field.id
                        ? "start"
                        : "center"
                    }
                  >
                    <Stack direction="row" justifyContent="space-between">
                      <Typography
                        sx={(theme) => ({
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        })}
                        variant="subtitle1"
                        color={theme.palette.surface_emphasis.high}
                      >
                        {field.name}
                      </Typography>
                      {selectedField && selectedField.id === field.id && (
                        <CheckCircle
                          sx={{
                            width: "20px",
                            height: "20px",
                            color: theme.palette.primary.main,
                          }}
                        />
                      )}
                    </Stack>
                    <Stack direction={"row"} spacing={1} alignItems="center">
                      <Typography
                        variant="body2"
                        color={theme.palette.surface_emphasis.medium}
                      >
                        {getMeasurementString(
                          field.areaSi,
                          MeasurementType.AREA,
                        )}
                      </Typography>
                      <DotDivider />
                      <Typography
                        variant="body2"
                        color={theme.palette.surface_emphasis.medium}
                      >
                        {field.category
                          ? field.category.name
                          : t(PhrasesTranslationKeys.NoGroup).toString()}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
              {selectedField && selectedField.id === field.id && (
                <Stack
                  direction="row"
                  textTransform="uppercase"
                  fontSize="14px"
                  gap={0.5}
                  spacing={0}
                  justifyContent="end"
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
                  >
                    {t(SingleWordsTranslationKeys.Edit).toString()}
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
                  >
                    {t(PhrasesTranslationKeys.ShowDetails).toString()}
                  </Button>
                </Stack>
              )}
            </Stack>
          </SelectableBox>
        ))
      ) : (
        <Stack margin={"auto"} textAlign={"center"}>
          <Typography
            variant="body1"
            color={theme.palette.surface_emphasis.medium}
          >
            {t(
              SentencesTranslationKeys.ThereAreNoFieldsMatchingRequestedCriteria,
            ).toString()}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}
