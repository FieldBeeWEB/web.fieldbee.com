import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as React from "react";
import { FieldError, Noop } from "react-hook-form";
import BaseInput from "./BaseInput";

interface Props {
  label: string;
  togglePasswordAriaLabel: string;
  value: string;
  onBlur: Noop;
  onChange: (...event: any[]) => void;
  placeholder?: string;
  error?: FieldError;
  helperText?: string;
}

const PasswordInput = ({
  label,
  error,
  togglePasswordAriaLabel,
  value,
  onChange,
  onBlur,
  placeholder,
  helperText,
}: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <BaseInput
      error={error}
      label={label}
      onBlur={onBlur}
      onChange={onChange}
      type={showPassword ? "text" : "password"}
      value={value}
      ariaLabel={togglePasswordAriaLabel}
      helperText={helperText}
      icon={showPassword ? <VisibilityOff /> : <Visibility />}
      onIconClick={handleClickShowPassword}
      placeholder={placeholder}
    />
  );
};
export default PasswordInput;
