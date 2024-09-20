import { SvgIcon } from "@mui/material";

const CheckIcon = () => (
  <SvgIcon
    viewBox="0 0 16 16"
    sx={{
      borderRadius: "12px",
      width: "16px",
      height: "16px",
      padding: "4px",
      backgroundColor: (t) => t.palette.primary.main,
    }}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="check">
        <path
          id="Vector"
          d="M14.0007 4.66656L6.00065 12.6666L2.33398 8.9999L3.27398 8.0599L6.00065 10.7799L13.0607 3.72656L14.0007 4.66656Z"
          fill="#151515"
        />
      </g>
    </svg>
  </SvgIcon>
);

export default CheckIcon;
