import { SvgIcon, SvgIconProps } from "@mui/material";
import * as React from "react";

const DashboardIcon: React.FunctionComponent<SvgIconProps> = (props) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path
      d="M13 9V3H21V9H13ZM3 13V3H11V13H3ZM13 21V11H21V21H13ZM3 21V15H11V21H3ZM5 11H9V5H5V11ZM15 19H19V13H15V19ZM15 7H19V5H15V7ZM5 19H9V17H5V19Z"
      fill="currentColor"
    />
  </SvgIcon>
);

export default DashboardIcon;
