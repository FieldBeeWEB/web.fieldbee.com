import { ImageButton, MapButton, MapMenu } from "@fieldbee/ui";
import { Layers } from "@fieldbee/ui/icons";
import * as React from "react";
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
      <MapButton
        id="map-menu-button"
        active={!!anchorEl}
        onClick={handleClick}

      >
        <Layers />
      </MapButton>
      <MapMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "map-menu-button",
        }}
      >
        <ImageButton
          active={layer === "satellite"}
          src="/satellite.png"
          alt="Satellite view"
          onClick={()=>handleChangeLayer("satellite")}
        />
        <ImageButton
          active={layer === "road"}
          src="/road.png"
          alt="Road view"
          onClick={()=>handleChangeLayer("road")}

        />
        <ImageButton
          active={layer === "terrain"}
          src="/terrain.png"
          alt="Terrain view"
          onClick={()=>handleChangeLayer("terrain")}

        />
      </MapMenu>
    </>
  );
};

export default LayerSelectorWidget;
