import { useGetProfile, useGetSeasons } from "@fieldbee/api";
import {
  DashboardDropdown,
  DropdownMenuItem,
  Stack,
  theme,
} from "@fieldbee/ui";
import { Button, Skeleton, Typography } from "@fieldbee/ui/components";
import { ArrowDropDown, Today } from "@fieldbee/ui/icons";
import { t } from "i18next";
import { PhrasesTranslationKeys } from "../../../localization";

interface IDashboardHeader {
  selectedPeriod: string;
  handleSelectedPeriod: (period: string) => void;
}

const DashboardHeader = ({
  selectedPeriod,
  handleSelectedPeriod,
}: IDashboardHeader) => {
  const { data, isLoading } = useGetProfile();
  const dropdownMenu: [string] = [t(PhrasesTranslationKeys.AllData).toString()];

  const seasons = useGetSeasons();

  if (!seasons.isLoading)
    seasons.data?.map((season) => dropdownMenu.push(season.name.toString()));

  const menuItems = dropdownMenu.map((item: string) => (
    <DropdownMenuItem
      key={
        item === t(PhrasesTranslationKeys.AllData).toString()
          ? "all"
          : item.toString()
      }
      selected={
        selectedPeriod ===
        (item === t(PhrasesTranslationKeys.AllData).toString()
          ? "all"
          : item.toString())
      }
      onClick={() =>
        handleSelectedPeriod(
          item === t(PhrasesTranslationKeys.AllData).toString()
            ? "all"
            : item.toString(),
        )
      }
    >
      <span>{item}</span>
    </DropdownMenuItem>
  ));

  return (
    <Stack direction="row" justifyContent="space-between" marginTop={6}>
      <Stack spacing={0.5}>
        <Typography variant={"h4"} color={theme.palette.white[900]}>
          Dashboard
        </Typography>
        {isLoading ? (
          <Skeleton height={24} width={300} />
        ) : (
          <Typography
            sx={{
              color: theme.palette.white[700],
            }}
            variant={"body1"}
          >
            Hello, {data?.firstName}! You have done a great work.
          </Typography>
        )}
      </Stack>
      <Stack>
        <DashboardDropdown
          trigger={
            <Button
              sx={{
                color: theme.palette.white[900],
                gap: "8px",
                padding: "7px 8px 7px 12px",
                background: theme.palette.secondary_shades[300],
                "&:hover": {
                  background: theme.palette.secondary_shades[300],
                },
                textTransform: "capitalize",
              }}
            >
              <Today />
              {selectedPeriod === "all"
                ? t(PhrasesTranslationKeys.AllData).toString()
                : selectedPeriod}
              <ArrowDropDown />
            </Button>
          }
          minWidth="200px"
          menu={[...menuItems]}
        />
      </Stack>
    </Stack>
  );
};

export default DashboardHeader;
