import { Stack as MStack, StackProps, styled } from "@mui/material";
import SprayingIcon from "../custom-icons/SprayingIcon";

const Badge = styled(MStack)(({ theme }) => ({
  borderRadius: "12px",
  background: "#5383EC",
  width: "24px",
  height: "24px",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
}));

export const SprayingBadge = (props: StackProps) => {
  return (
    <Badge {...props}>
      <SprayingIcon sx={{ fontSize: 12 }} />
    </Badge>
  );
};
