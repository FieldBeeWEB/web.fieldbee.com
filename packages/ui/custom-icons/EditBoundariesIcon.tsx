import { SvgIcon, SvgIconProps } from "@mui/material";
import * as React from "react";

const EditBoundariesIcon: React.FunctionComponent<SvgIconProps> = (props) => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="vector-polyline-edit">
        <path
          id="Vector"
          d="M1.3335 2V6H3.30016L4.6335 10H4.00016V14H8.00016V10.94L11.6068 7.33333H14.6668V3.33333H10.6668V6.38L7.06016 10H6.04016L4.70683 6H5.3335V2H1.3335ZM2.66683 3.33333H4.00016V4.66667H2.66683V3.33333ZM12.0002 4.66667H13.3335V6H12.0002V4.66667ZM14.1002 8.66667C14.0002 8.66667 13.9135 8.7 13.8402 8.77333L13.1668 9.45333L14.5468 10.8333L15.2268 10.16C15.3668 10.02 15.3668 9.78 15.2268 9.64L14.3602 8.77333C14.2868 8.7 14.1935 8.66667 14.1002 8.66667ZM12.7668 9.84L8.66683 13.94V15.3333H10.0602L14.1535 11.2267L12.7668 9.84ZM5.3335 11.3333H6.66683V12.6667H5.3335V11.3333Z"
          fill="currentColor"
        />
      </g>
    </svg>
  </SvgIcon>
);

export default EditBoundariesIcon;
