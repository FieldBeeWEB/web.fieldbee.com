import { FormControl } from "@mui/material";
import React from "react";
import { FieldError } from "react-hook-form";

type Props = {
  error?: FieldError;
} & React.PropsWithChildren;

const InputWrapper = ({ error, children }: Props) => {
  return (
    <FormControl
      error={!!(error && error.message)}
      variant="outlined"
      sx={{
        "& .Mui-error": {
          color: "#F2B8B5 !important",
        },
        "& .Mui-error fieldset": {
          borderColor: "#F2B8B5 !important",
        },
      }}
    >
      {children}
    </FormControl>
  );
};

export default InputWrapper;
