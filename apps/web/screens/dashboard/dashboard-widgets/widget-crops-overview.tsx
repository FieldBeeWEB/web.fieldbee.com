import { Stack, theme } from "@fieldbee/ui";
import ChartBar from "@fieldbee/ui/ChartBar";
import { Typography } from "@fieldbee/ui/components";
import WidgetWrapper from "./widget-wrapper";
import { ICropItem } from "../utils/dashboard-helper";
import { getMeasurementString } from "../../../helpers/format-area";
import { MeasurementType } from "@fieldbee/api";
import WidgetLoader from "./widget-loader";
import WidgetEmptyData from "./widget-empty-data";
import { t } from "i18next";
import {
  PhrasesTranslationKeys,
  SentencesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";

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
        sx={{
          color: theme.palette.white[700],
          fontSize: "14px",
          fontWeight: 500,
          lineHeight: "20px",
        }}
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
                  sx={{
                    color: theme.palette.white[700],
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
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
                  sx={{
                    color: theme.palette.white[700],
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
                >
                  {getMeasurementString(crop.areaSi, MeasurementType.AREA)}
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.white[700],
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "24px",
                  }}
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
