import { Box as MBox, BoxProps, styled } from "@mui/material";

const Box = styled(MBox)(({ theme }) => ({
  flexGrow: 1,
  display: "flex",
  borderRadius: "inherit",
  height: "calc(100% - 51px)",
}));

export const ModalBody = (props: BoxProps) => {
  return <Box flexDirection="row" {...props} />;
};
