import { ChevronLeft } from "@mui/icons-material";
import { Stack, StackProps, Typography } from "@mui/material";

type Props = {
  expanded: boolean;
  expandedLabel: string;
  narrowedLabel: string;
} & StackProps;

export const ExpandBadge = ({
  expanded,
  expandedLabel,
  narrowedLabel,
  ...props
}: Props) => (
  <Stack
    sx={(theme)=>({
      height: "32px",
      width: "145px",
      position: "absolute",
      cursor: "pointer",
      top: "50%",
      left: "-58px",
      transform: "translate(0,-50%) rotate(-90deg)",
      background: theme.palette.secondary.main,
      zIndex: 10,
      fontSize: "14px",
      borderRadius: "0px 0px 8px 8px",
    })}
    spacing="8"
    direction="row"
    alignItems="center"
    justifyContent="center"
    {...props}
  >
    <ChevronLeft
      sx={{
        transform: expanded ? "rotate(90deg)" : "rotate(-90deg)",
      }}
    />
    <Typography fontSize="14px" fontWeight="bold" textTransform="uppercase">
      {expanded ? expandedLabel : narrowedLabel}
    </Typography>
  </Stack>
);
