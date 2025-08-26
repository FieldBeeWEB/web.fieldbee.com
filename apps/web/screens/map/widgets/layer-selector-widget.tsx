import { ImageButton, MapButton, MapMenu, Stack, theme } from "@fieldbee/ui";
import { Typography } from "@fieldbee/ui/components";
import { CloseOutlined, LayersOutlined } from "@fieldbee/ui/icons";
import { t } from "i18next";
import * as React from "react";
import {
  PhrasesTranslationKeys,
  SingleWordsTranslationKeys,
} from "../../../localization";
import useAppContext from "../../shared/providers/use-app-context";

const LayerSelectorWidget = () => {
  const { layer, handleChangeLayer } = useAppContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <MapButton id="map-menu-button" active={!!anchorEl} onClick={handleClick}>
        <LayersOutlined />
      </MapButton>
      <MapMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "map-menu-button",
        }}
      >
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              color={theme.palette.surface_emphasis.high}
            >
              {t(PhrasesTranslationKeys.MapType).toString()}
            </Typography>

            <Stack onClick={handleClose}>
              <CloseOutlined
                sx={{
                  cursor: "pointer",
                  color: theme.palette.surface_emphasis.medium,
                }}
              />
            </Stack>
          </Stack>
          <Stack direction="row" spacing={3}>
            <Stack spacing={1} direction="column" alignItems="center">
              <ImageButton
                active={layer === "normal"}
                src="/normal.png"
                alt="Normal view"
                onClick={() => handleChangeLayer("normal")}
              />
              <Typography
                variant="subtitle2"
                color={
                  layer === "normal"
                    ? theme.palette.surface_emphasis.high
                    : theme.palette.surface_emphasis.disabled
                }
              >
                {t(SingleWordsTranslationKeys.Normal).toString()}
              </Typography>
            </Stack>
            <Stack spacing={1} direction="column" alignItems="center">
              <ImageButton
                active={layer === "satellite"}
                src="/satellite.png"
                alt="Satellite view"
                onClick={() => handleChangeLayer("satellite")}
              />
              <Typography
                variant="subtitle2"
                color={
                  layer === "satellite"
                    ? theme.palette.surface_emphasis.high
                    : theme.palette.surface_emphasis.disabled
                }
              >
                {t(SingleWordsTranslationKeys.Satellite).toString()}
              </Typography>
            </Stack>
            <Stack spacing={1} direction="column" alignItems="center">
              <ImageButton
                active={layer === "dark"}
                src="/dark.png"
                alt="Dark view"
                onClick={() => handleChangeLayer("dark")}
              />
              <Typography
                variant="subtitle2"
                color={
                  layer === "dark"
                    ? theme.palette.surface_emphasis.high
                    : theme.palette.surface_emphasis.disabled
                }
              >
                {t(SingleWordsTranslationKeys.Dark).toString()}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </MapMenu>
    </>
  );
};

export default LayerSelectorWidget;
