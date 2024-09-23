import { SvgIcon, SvgIconProps } from "@mui/material";
import * as React from "react";

const TillingIcon: React.FunctionComponent<SvgIconProps> = (props) => (
  <SvgIcon viewBox="0 0 80 80" {...props}>
    <rect x="4" y="4" width="72" height="72" rx="8" fill="#7D8DF6" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.4 22H22V38.8H24.4V22ZM29.2 22H26.8V38.8H29.2V22ZM41.2 22H58V24.4H41.2V22ZM34 22H31.6V38.8H34V22ZM36.4 22H38.8V38.8H36.4V22ZM58 26.8H41.2V29.2H58V26.8ZM41.2 31.6H58V34H41.2V31.6ZM58 36.4H41.2V38.8H58V36.4ZM41.2 41.2H43.6V58H41.2V41.2ZM48.4 41.2H46V58H48.4V41.2ZM50.8 41.2H53.2V58H50.8V41.2ZM58 41.2H55.6V58H58V41.2ZM22 41.2H38.8V43.6H22V41.2ZM38.8 46H22V48.4H38.8V46ZM22 50.8H38.8V53.2H22V50.8ZM38.8 55.6H22V58H38.8V55.6Z"
      fill="white"
    />
  </SvgIcon>
);

export default TillingIcon;
