import {
  OutlinedInput as MInput,
  OutlinedInputProps,
  styled,
} from "@mui/material";

const StyledInput = styled(MInput)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    paddingRight: "12px",
    fill: theme.palette.white[600],
  },
}));

export const InputWithIcon = (props: OutlinedInputProps) => {
  return <StyledInput {...props} />;
};
