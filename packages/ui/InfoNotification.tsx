import { Box as MBox, BoxProps, styled } from "@mui/material";

const Badge = styled(MBox)(({ theme }) => ({
  borderRadius: "24px",
  border: `1px solid ${theme.palette.secondary_shades[500]}`,
  background: `${theme.palette.secondary_shades[300]}`,
  display: "flex",
  padding: "12px 32px",
  justifyContent: "center",
  alignItems: "center",
  color: `${theme.palette.white[100]}`,
  fontSize: "12px",
}));

export const InfoNotification = (props: BoxProps) => {
  return <Badge {...props} />;
};
