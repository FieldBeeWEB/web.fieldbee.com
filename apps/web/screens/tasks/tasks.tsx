import AuthedLayout from "../authed-layout";
import { useGetTasks } from "@fieldbee/api";
import { Badge, Box, Grid, IconButton, Stack } from "@fieldbee/ui/components";
import { InputWithIcon, Loader } from "@fieldbee/ui";
import * as React from "react";
import { Search, TuneOutlined } from "@fieldbee/ui/icons";
import TaskList from "./task-list";
import TaskPanel from "./task-panel";
import { t } from "i18next";
import { SingleWordsTranslationKeys } from "../../localization";

const Tasks = () => {
  const [selectedGroup, setSelectedGroup] = React.useState<string>("");
  const [searchTaskTerm, setSearchTaskTerm] = React.useState<string>("");
  const { data, isLoading, isRefetching } = useGetTasks();

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
                value={searchTaskTerm}
                onChange={(e) => setSearchTaskTerm(e.target.value)}
              />

              <Box
                sx={{
                  marginX: "10px",
                }}
              >
                {/* TODO: Separate */}
                <Badge badgeContent={0} color="primary">
                  <IconButton
                    size="medium"
                    aria-label={t(SingleWordsTranslationKeys.Filter).toString()}
                  >
                    <TuneOutlined
                      sx={{
                        width: "32px",
                        height: "32px",
                      }}
                    />
                  </IconButton>
                </Badge>
              </Box>
            </Stack>
            {(isLoading || isRefetching) && (
              <Box
                height="calc(100vh - 73px)"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Loader />
              </Box>
            )}
            <Box
              height="calc(100vh - 73px)"
              sx={{
                overflowY: "scroll",
              }}
            >
              {!isLoading && !isRefetching && data && (
                <TaskList
                  tasks={data}
                  searchTerm={searchTaskTerm}
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
          <TaskPanel
            selectedGroup={selectedGroup}
            searchTerm={searchTaskTerm}
          />
        </Grid>
      </Grid>
    </AuthedLayout>
  );
};

export default Tasks;
