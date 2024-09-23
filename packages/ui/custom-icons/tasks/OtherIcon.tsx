import { SvgIcon, SvgIconProps } from "@mui/material";
import * as React from "react";

const OtherIcon: React.FunctionComponent<SvgIconProps> = (props) => (
  <SvgIcon viewBox="0 0 80 80" {...props}>
    <rect x="4" y="4" width="72" height="72" rx="8" fill="#D2D4D6" />
    <circle cx="25.6" cy="39.9984" r="3.6" fill="white" />
    <circle cx="40" cy="39.9984" r="3.6" fill="white" />
    <circle cx="54.4" cy="39.9984" r="3.6" fill="white" />
  </SvgIcon>
);

export default OtherIcon;
