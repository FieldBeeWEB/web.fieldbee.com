import { useGetProfile, useGetSeasons } from "@fieldbee/api";
import { Dropdown, DropdownMenuItem, Stack, theme } from "@fieldbee/ui";
import { Button, Skeleton, Typography } from "@fieldbee/ui/components";
import { ArrowDropDown, Today } from "@fieldbee/ui/icons";
import { t } from "i18next";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";

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
        <Typography variant={"h4"} color={theme.palette.surface_emphasis.high}>
          {t(SingleWordsTranslationKeys.Dashboard).toString()}
        </Typography>
        {isLoading ? (
          <Skeleton height={24} width={350} />
        ) : (
          <Typography
            sx={{
              color: theme.palette.surface_emphasis.medium,
            }}
            variant={"body1"}
          >
            {`${t(SingleWordsTranslationKeys.Hello).toString()}, ${data?.firstName}! ${t(PhrasesTranslationKeys.YouHaveDoneAGreatWork).toString()}.`}
          </Typography>
        )}
      </Stack>
      <Stack>
        <Dropdown
          trigger={
            <Button
              sx={{
                color: theme.palette.surface_emphasis.high,
                gap: "8px",
                padding: "8px 8px 8px 12px",
                background: theme.palette.elevation_overlay["08dp"],
                textTransform: "uppercase",
                "& > svg": {
                  width: "18px",
                  height: "18px",
                },
                ":hover": {
                  background: theme.palette.surface_states.hover,
                },
              }}
            >
              <Today />
              <Typography variant="body2">
                {selectedPeriod === "all"
                  ? t(PhrasesTranslationKeys.AllData).toString()
                  : selectedPeriod}
              </Typography>
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
