import { Stack, StackProps } from "@mui/material";

type Props = {
  active?: boolean;
} & StackProps;

export const MapButtons = ({ active, ...props }: Props) => {
  return (
    <Stack
      style={{
        position: "absolute",
        top: "16px",
        left: "16px",
        zIndex: 10,
      }}
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {props.children}
    </Stack>
  );
};
