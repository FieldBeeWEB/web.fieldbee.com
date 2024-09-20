import { CropHistory } from "@fieldbee/api";
import { ListContainer, RoundedListItem, Stack } from "@fieldbee/ui";
import { Box, Divider, Typography } from "@fieldbee/ui/components";
import { t } from "i18next";
import { PhrasesTranslationKeys } from "../../../localization";
import AddCropHistory from "./add-crop-history/add-crop-history";
import DeleteCropHistory from "./delete-crop-history/delete-crop-history";
import EditCropHistory from "./edit-crop-history/edit-crop-history";

interface Props {
  cropHistory: CropHistory[];
  fieldUri: string;
}

export default function FieldCrops({ cropHistory, fieldUri }: Props) {
  if (!cropHistory)
    return (
      <Stack spacing={1}>
        <Typography>{t(PhrasesTranslationKeys.WithoutCrop)}</Typography>;
        <AddCropHistory fieldUri={fieldUri} />
      </Stack>
    );
  return (
    <Stack spacing={1}>
      <ListContainer>
        {cropHistory.map((item) => (
          <RoundedListItem key={item.uri}>
            <Stack
              direction="row"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Stack direction="row">
                <Box
                  flexShrink="0"
                  width="24px"
                  height="24px"
                  borderRadius="50%"
                  bgcolor={item.crop.colorHex || "#ffffff"}
                />
                <Stack
                  direction="row"
                  spacing={1}
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <Typography>{item.crop.name}</Typography>
                  <Typography>{item.season.name}</Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2}>
                <EditCropHistory
                  uri={item.uri}
                  season={item.season.uri}
                  crop={item.crop.uri}
                  fieldUri={fieldUri}
                />
                <DeleteCropHistory uri={item.uri} fieldUri={fieldUri} />
              </Stack>
            </Stack>
          </RoundedListItem>
        ))}
      </ListContainer>
      <AddCropHistory fieldUri={fieldUri} />
    </Stack>
  );
}
