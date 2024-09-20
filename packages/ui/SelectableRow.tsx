import { Stack, StackProps } from "@mui/material";

type Props = {
  selected: boolean;
} & StackProps;

export const SelectableRow = ({ selected, ...props }: Props) => {
  return (
    <Stack
      height="48px"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={(theme) => ({
        borderBottom: selected
          ? `1px solid ${theme.palette.primary.main}`
          : `1px solid ${theme.palette.secondary_shades[400]}`,
        backgroundColor: selected
          ? `${theme.palette.mix.main}`
          : `${theme.palette.secondary_shades[200]}`,
        cursor: "pointer",
        "&:hover": {
          borderBottom: `1px solid ${theme.palette.primary.main}`,
          background: `${theme.palette.mix.main}`,
        },
      })}
      {...props}
    >
      {props.children}
    </Stack>
  );
};
