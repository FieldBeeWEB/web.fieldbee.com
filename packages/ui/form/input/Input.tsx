import { TextField as MInput, TextFieldProps, styled } from "@mui/material";

const StyledInput = styled(MInput)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    paddingRight: "12px",
    fill: theme.palette.white[600],
  },
}));

export const Input = (props: TextFieldProps) => {
  return <StyledInput {...props} variant="outlined" />;
};
