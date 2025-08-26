import { MeasurementType } from "@fieldbee/api";
import { Stack, theme } from "@fieldbee/ui";
import ChartBar from "@fieldbee/ui/ChartBar";
import { Typography } from "@fieldbee/ui/components";
import { t } from "i18next";
import { getMeasurementString } from "../../../helpers/format-area";
import {
  PhrasesTranslationKeys,
  SentencesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";
import { ICropItem } from "../utils/dashboard-helper";
import WidgetEmptyData from "./widget-empty-data";
import WidgetLoader from "./widget-loader";
import WidgetWrapper from "./widget-wrapper";

interface IWidgetCropsOverview {
  data: ICropItem[];
  isLoading: boolean;
  isFetching: boolean;
}

const WidgetCropsOverview = ({
  data,
  isLoading,
  isFetching,
}: IWidgetCropsOverview) => {
  if ((!isLoading || !isFetching) && (!data || data.length < 1))
    return (
      <WidgetWrapper gap={1.5} spacing={0} minHeight={360}>
        <WidgetEmptyData
          title={t(SingleWordsTranslationKeys.Crops).toString()}
          errorMsg={t(PhrasesTranslationKeys.NoCropData).toString()}
        />
      </WidgetWrapper>
    );

  return (
    <WidgetWrapper gap={1.5} spacing={0} minHeight={360}>
      <Typography
        variant="subtitle2"
        color={theme.palette.surface_emphasis.medium}
      >
        {t(SingleWordsTranslationKeys.Crops).toString()}
      </Typography>
      {isLoading || isFetching ? (
        <WidgetLoader
          text={t(
            SentencesTranslationKeys.WeReDoingOurBestToDownloadAllYourDataForYou,
          ).toString()}
        />
      ) : (
        <>
          <ChartBar items={data} />
          {data.map((crop: ICropItem) => (
            <Stack
              key={crop.cropName}
              direction="row"
              alignItems="center"
              gap={2}
            >
              <Stack direction={"row"} width={"30%"} alignItems={"center"}>
                <Typography
                  sx={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: crop.color,
                  }}
                ></Typography>
                <Typography
                  variant="body1"
                  color={theme.palette.surface_emphasis.medium}
                >
                  {crop.cropName}
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                width={"70%"}
                justifyContent={"space-around"}
              >
                <Typography
                  variant="body1"
                  color={theme.palette.surface_emphasis.medium}
                >
                  {getMeasurementString(crop.areaSi, MeasurementType.AREA)}
                </Typography>
                <Typography
                  variant="body1"
                  color={theme.palette.surface_emphasis.medium}
                >
                  {crop.percentage}%
                </Typography>
              </Stack>
            </Stack>
          ))}
        </>
      )}
    </WidgetWrapper>
  );
};

export default WidgetCropsOverview;
