import { Stack, StackProps } from "@mui/material";

export const RoundedListItem = (props: StackProps) => {
  return (
    <Stack
      sx={(theme) => ({
        borderRadius: "4px",
        border: `1px solid ${theme.palette.secondary_shades[300]}`,
        background: theme.palette.secondary_shades[200],
        padding: "12px 8px",
        alignItems: "flex-start",
      })}
      direction="row"
      spacing={1}
      {...props}
    />
  );
};
