import { useGetOrganizationFields } from "@fieldbee/api";
import { InputWithIcon, Loader } from "@fieldbee/ui";
import { Box, Grid, Stack } from "@fieldbee/ui/components";
import { Search, TabUnselected, Upload } from "@fieldbee/ui/icons";
import { useRouter } from "next/router";
import * as React from "react";
import AuthedLayout from "../authed-layout";
import GenerateFieldsReport from "../fields/generate-fields-report/generate-field-report";
import FieldsPanel from "../map/fields-panel/fields-panel";
import AddFieldWidget from "../map/widgets/add-field-widget";
import FieldsList from "./fields-list";
import FiltersModal from "./filters-modal/filters-modal";

enum PlusButtonActionKeys {
  IMPORT_FIELDS = "import-fields",
  DRAW_FIELD = "draw-field",
}

const actions = [
  {
    icon: <Upload />,
    name: "Import fields",
    key: PlusButtonActionKeys.IMPORT_FIELDS,
  },
  {
    icon: <TabUnselected />,
    name: "Draw field",
    key: PlusButtonActionKeys.DRAW_FIELD,
  },
];

const FieldsNew = () => {
  const router = useRouter();
  const [selectedGroup, setSelectedGroup] = React.useState<string>("");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const { data, isLoading, isRefetching } = useGetOrganizationFields();

  const handleSelectGroup = (groupName: string) => {
    setSelectedGroup(groupName);
  };
  return (
    <AuthedLayout>
      <Grid container spacing={0} height="100vh">
        <Grid
          item
          xs={6}
          sx={(theme) => ({
            borderRight: `1px solid ${theme.palette.secondary_shades[400]}`,
          })}
        >
          <Stack direction="column">
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              padding={1}
              sx={(theme) => ({
                borderBottom: `1px solid ${theme.palette.secondary_shades[400]}`,
                backgroundColor: theme.palette.secondary_shades[300],
              })}
            >
              <InputWithIcon
                fullWidth={true}
                placeholder="Search"
                startAdornment={<Search />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <Box
                sx={{
                  marginX: "12px",
                }}
              >
                <FiltersModal />
              </Box>
              {data && <GenerateFieldsReport uris={data.map((x) => x.uri)} />}
            </Stack>
            {(isLoading || isRefetching) && <Loader />}
            <Box
              height="calc(100vh - 73px)"
              sx={{
                overflowY: "scroll",
              }}
            >
              {!isLoading && !isRefetching && data && (
                <FieldsList
                  fields={data}
                  searchTerm={searchTerm}
                  selectedGroup={selectedGroup}
                  handleSelectGroup={handleSelectGroup}
                />
              )}
            </Box>
          </Stack>
        </Grid>
        <Grid
          item
          xs={6}
          sx={(theme) => ({
            backgroundColor: theme.palette.secondary.main,
            height: "100vh",
            overflowY: "scroll",
          })}
          padding={0}
        >
          <FieldsPanel selectedGroup={selectedGroup} />

          <AddFieldWidget />
        </Grid>
      </Grid>
    </AuthedLayout>
  );
};

export default FieldsNew;
