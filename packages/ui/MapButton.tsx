import { Stack, StackProps } from "@mui/material";

type Props = {
  active?: boolean;
} & StackProps;

export const MapButton = ({ active, ...props }: Props) => {
  return (
    <Stack
      sx={(theme) => ({
        height: "48px",
        width: "48px",
        cursor: "pointer",
        background: theme.palette.elevation_overlay["08dp"],
        fontSize: "14px",
        borderRadius: "4px",
        color: active
          ? theme.palette.surface_emphasis.disabled
          : theme.palette.surface_emphasis.high,
      })}
      spacing="8"
      direction="row"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {props.children}
    </Stack>
  );
};
