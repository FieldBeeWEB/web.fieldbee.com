import { Box as MBox, BoxProps, styled } from "@mui/material";

const SidebarWrapper = styled(MBox)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  height: "calc(100vh - 32px)",
  width: 48,
  padding: 16,
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  borderRight: `1px solid ${theme.palette.secondary_shades[300]}`,
  borderRightStyle: "solid",
}));

export const Sidebar = (props: BoxProps) => {
  return <SidebarWrapper>{props.children}</SidebarWrapper>;
};
