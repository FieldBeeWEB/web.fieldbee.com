import {
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import * as React from "react";
import { FieldError, Noop } from "react-hook-form";
import InputErrorIcon from "../../custom-icons/InputErrorIcon";
import InputWrapper from "./InputWrapper";

interface Props {
  label: string;
  ariaLabel?: string;
  value?: string;
  onBlur: Noop;
  onChange: (...event: any[]) => void;
  placeholder?: string;
  error?: FieldError;
  helperText?: string;
  type: string | undefined;
  icon?: React.ReactNode;
  onIconClick?: () => void;
}

const BaseInput = ({
  label,
  error,
  ariaLabel,
  value,
  onChange,
  onBlur,
  placeholder,
  helperText,
  type,
  icon,
  onIconClick,
}: Props) => {
  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <InputWrapper error={error}>
      <InputLabel htmlFor="outlined-adornment-input">{label}</InputLabel>
      <OutlinedInput
        fullWidth
        id="outlined-adornment-input"
        type={type}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={ariaLabel}
              onClick={onIconClick}
              onMouseDown={handleMouseDown}
              edge="end"
            >
              {error ? <InputErrorIcon /> : icon}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        aria-describedby="component-error-text"
        sx={{
          "& input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active":
            {
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "#ffffff",
              transition: "background-color 5000s ease-in-out 0s",
              boxShadow: "inset 0 0 20px 20px #23232329",
            },
        }}
      />
      {error && (
        <FormHelperText id="component-error-text">
          {error.message}
        </FormHelperText>
      )}
      {!error && helperText && (
        <FormHelperText id="component-helper-text">{helperText}</FormHelperText>
      )}
    </InputWrapper>
  );
};
export default BaseInput;
