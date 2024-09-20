import {
  FieldFiltersResponse,
  queryKeys,
  SetFiltersInput,
  useDeleteFieldFilters,
  useGetCrops,
  useGetOrganizationFieldsCategories,
  useGetOrganizationFieldsOperations,
  useQueryClient,
  useSetFilters,
} from "@fieldbee/api";
import { BorderedCheckbox, Button, ModalFooter } from "@fieldbee/ui";
import {
  Box,
  FormControlLabel,
  FormGroup,
  Stack,
  Tabs,
} from "@fieldbee/ui/components";
import { Check } from "@fieldbee/ui/icons";
import Tab from "@fieldbee/ui/Tab";
import TabPanel from "@fieldbee/ui/TabPanel";
import { t } from "i18next";
import * as React from "react";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";

interface Props {
  handleClose: () => void;
  filters: FieldFiltersResponse | undefined;
}
export default function FieldsFilters({ handleClose, filters }: Props) {
  const [value, setValue] = React.useState(0);
  const [filterSet, setFilterSet] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [groupsFilters, setGroupsFilters] = React.useState<string[]>(
    filters && filters.items.find((x) => x.name === "group")
      ? filters.items.find((x) => x.name === "group")?.values || []
      : []
  );
  const queryClient = useQueryClient();
  const [worksFilters, setWorksFilters] = React.useState<string[]>(
    filters && filters.items.find((x) => x.name === "Works")
      ? filters.items.find((x) => x.name === "Works")?.values || []
      : []
  );

  const [cropFilters, setCropFilters] = React.useState<string[]>(
    filters && filters.items.find((x) => x.name === "crop")
      ? filters.items.find((x) => x.name === "crop")?.values || []
      : []
  );

  const { data: categoriesData } = useGetOrganizationFieldsCategories();
  const { data: fieldOperationsData } = useGetOrganizationFieldsOperations();
  const { data: cropsData } = useGetCrops();
  const { mutateAsync: setFilters } = useSetFilters();

  const { mutateAsync: deleteFieldFilters } = useDeleteFieldFilters();

  const handleChangeGroupFilters = (value: string, checked: boolean) => {
    if (checked) {
      setGroupsFilters((p) => [...p, value]);
    } else {
      setGroupsFilters((p) => [...p.filter((x) => x !== value)]);
    }
  };
  const handleChangeWorkFilters = (value: string, checked: boolean) => {
    if (checked) {
      setWorksFilters((p) => [...p, value]);
    } else {
      setWorksFilters((p) => [...p.filter((x) => x !== value)]);
    }
  };
  const handleChangeCropFilters = (value: string, checked: boolean) => {
    if (checked) {
      setCropFilters((p) => [...p, value]);
    } else {
      setCropFilters((p) => [...p.filter((x) => x !== value)]);
    }
  };

  const handleClearAllFilters = async () => {
    setGroupsFilters([]);
    setWorksFilters([]);
    setCropFilters([]);
    await deleteFieldFilters(undefined, {
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: queryKeys.getFieldsFilters,
        });
        await queryClient.refetchQueries({ queryKey: queryKeys.getFields });
      },
      onError: async () => {
        await queryClient.refetchQueries({
          queryKey: queryKeys.getFieldsFilters,
        });
        await queryClient.refetchQueries({ queryKey: queryKeys.getFields });
      },
    });
  };

  React.useEffect(() => {
    if (filters && !filterSet) {
      const group = filters.items.find((x) => x.name === "group");
      if (group) {
        setGroupsFilters(group.values);
      } else {
        setGroupsFilters([]);
      }
      const work = filters.items.find((x) => x.name === "Works");
      if (work) {
        setWorksFilters(work.values);
      } else {
        setWorksFilters([]);
      }
      const crop = filters.items.find((x) => x.name === "crop");
      if (crop) {
        setCropFilters(crop.values);
      } else {
        setCropFilters([]);
      }
      setFilterSet(true);
    }
  }, [filters, filterSet]);

  const applyFilters = async () => {
    const input: SetFiltersInput = {
      items: [
        {
          name: "group",
          property: "category&name",
          type: "IN",
          values: [...groupsFilters],
        },
        {
          name: "Works",
          property: "taskFields&task&operation&entityType&name",
          type: "IN",
          values: [...worksFilters],
        },
        {
          name: "crop",
          property: "crop&name",
          type: "IN",
          values: [...cropFilters],
        },
      ],
    };
    await setFilters(input, {
      onSuccess: async () => {
        await queryClient.refetchQueries({ queryKey: queryKeys.getFields });
        await queryClient.refetchQueries({
          queryKey: queryKeys.getFieldsFilters,
        });
        handleClose();
      },
    });
  };

  const filtersSet = React.useMemo(() => {
    if (
      (groupsFilters.length > 0 ||
        worksFilters.length > 0 ||
        cropFilters.length > 0) &&
      filterSet
    ) {
      return true;
    } else {
      return false;
    }
  }, [
    groupsFilters.length,
    worksFilters.length,
    cropFilters.length,
    filterSet,
  ]);

  return (
    <>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab
          label={t(SingleWordsTranslationKeys.Group)}
          icon={
            groupsFilters.length > 0 ? (
              <Box
                height="16px"
                width="16px"
                sx={(theme) => ({
                  backgroundColor:
                    value === 0
                      ? theme.palette.primary.main
                      : theme.palette.secondary_shades[600],
                  color: theme.palette.secondary_shades[200],
                  fontSize: "10px",
                  borderRadius: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                })}
              >
                {groupsFilters.length}
              </Box>
            ) : (
              <></>
            )
          }
          iconPosition="end"
        />
        <Tab
          label={t(SingleWordsTranslationKeys.Work)}
          icon={
            worksFilters.length > 0 ? (
              <Box
                height="16px"
                width="16px"
                sx={(theme) => ({
                  backgroundColor:
                    value === 1
                      ? theme.palette.primary.main
                      : theme.palette.secondary_shades[600],
                  color: theme.palette.secondary_shades[200],
                  fontSize: "10px",
                  borderRadius: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                })}
              >
                {worksFilters.length}
              </Box>
            ) : (
              <></>
            )
          }
          iconPosition="end"
        />
        <Tab
          label={t(SingleWordsTranslationKeys.Crop)}
          icon={
            cropFilters.length > 0 ? (
              <Box
                height="16px"
                width="16px"
                sx={(theme) => ({
                  backgroundColor:
                    value === 2
                      ? theme.palette.primary.main
                      : theme.palette.secondary_shades[600],
                  color: theme.palette.secondary_shades[200],
                  fontSize: "10px",
                  borderRadius: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                })}
              >
                {cropFilters.length}
              </Box>
            ) : (
              <></>
            )
          }
          iconPosition="end"
        />
      </Tabs>
      <Box
        padding="16px"
        sx={{
          overflowY: "auto",
          flex: 1,
          display: "flex",
        }}
      >
        <TabPanel value={value} index={0}>
          <FormGroup row={true}>
            {categoriesData?.map((group, index) => (
              <FormControlLabel
                sx={{
                  marginLeft: "0",
                  marginRight: "8px",
                  marginBottom: "8px",
                }}
                key={group.name + index}
                control={<BorderedCheckbox />}
                label={
                  <Stack spacing={1} direction="row" alignItems="center">
                    {groupsFilters.includes(group.name) && (
                      <Check sx={{ width: "18px", height: "18px" }} />
                    )}
                    {group.name}
                  </Stack>
                }
                checked={groupsFilters.includes(group.name)}
                onChange={(event) => {
                  return handleChangeGroupFilters(
                    group.name,
                    (event.target as any).checked
                  );
                }}
              />
            ))}
          </FormGroup>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FormGroup row={true}>
            {fieldOperationsData?.map((operation, index) => (
              <FormControlLabel
                sx={{
                  marginLeft: "0",
                  marginRight: "8px",
                  marginBottom: "8px",
                }}
                key={operation.name + index}
                control={<BorderedCheckbox />}
                label={
                  <Stack spacing={1} direction="row" alignItems="center">
                    {worksFilters.includes(operation.name) && (
                      <Check sx={{ width: "18px", height: "18px" }} />
                    )}
                    {operation.name}
                  </Stack>
                }
                checked={worksFilters.includes(operation.name)}
                onChange={(event) => {
                  return handleChangeWorkFilters(
                    operation.name,
                    (event.target as any).checked
                  );
                }}
              />
            ))}
          </FormGroup>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <FormGroup row={true}>
            {cropsData?.map((crop, index) => (
              <FormControlLabel
                sx={{
                  marginLeft: "0",
                  marginRight: "8px",
                  marginBottom: "8px",
                }}
                key={crop.name + index}
                control={<BorderedCheckbox />}
                onChange={(event) => {
                  return handleChangeCropFilters(
                    crop.name,
                    (event.target as any).checked
                  );
                }}
                checked={cropFilters.includes(crop.name)}
                label={
                  <Stack spacing={1} direction="row" alignItems="center">
                    {cropFilters.includes(crop.name) && (
                      <Check sx={{ width: "18px", height: "18px" }} />
                    )}
                    <span>{crop.name}</span>
                  </Stack>
                }
              />
            ))}
          </FormGroup>
        </TabPanel>
      </Box>
      <ModalFooter>
        {filtersSet && (
          <Button variant="outlined" onClick={handleClearAllFilters}>
            {t(PhrasesTranslationKeys.ResetAllFilters)}
          </Button>
        )}
        <Button sx={{ marginLeft: "auto" }} onClick={applyFilters}>
          Apply
        </Button>
      </ModalFooter>
    </>
  );
}
