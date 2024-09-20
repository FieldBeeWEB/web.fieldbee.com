import { Box as MBox, BoxProps, styled } from "@mui/material";

const Wrapper = styled(MBox)(({ theme }) => ({
  backgroundColor: theme.palette.secondary_shades[200],
  minHeight: "100vh",
  width: "calc(100vw - 81px)",
  position: "absolute",
  left: "81px",
  color: theme.palette.common.white,
}));

export const ContentWrapper = (props: BoxProps) => {
  return <Wrapper {...props} />;
};
