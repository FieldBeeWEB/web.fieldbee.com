import { Box as MBox, ContainerProps } from "@mui/material";

export const DashboardLayout = (props: ContainerProps) => {
  return <MBox display="flex">{props.children}</MBox>;
};
