import { Stack, StackProps } from "@mui/material";

export const ListContainer = (props: StackProps) => {
  return <Stack spacing={1} padding={0} {...props} />;
};
