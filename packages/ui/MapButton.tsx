import { Stack, StackProps } from "@mui/material";

type Props = {
  active?: boolean;
} & StackProps;

export const MapButton = ({ active, ...props }: Props) => {
  return (
    <Stack
      sx={(theme)=>({
        height: "48px",
        width: "48px",
        cursor: "pointer",
        background: theme.palette.secondary_shades[200],
        fontSize: "14px",
        borderRadius: "40px",
        border: active ? `1px solid ${theme.palette.primary.main}` : `1px solid ${theme.palette.secondary_shades[400]}`,
        color: active ? theme.palette.primary.main : "white",
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
