import { HighlightOff } from "@mui/icons-material";
import { FieldError, Noop } from "react-hook-form";
import BaseInput from "./BaseInput";

interface Props {
  label: string;
  clearAriaLabel: string;
  value?: string;
  onBlur: Noop;
  onChange: (...event: any[]) => void;
  placeholder?: string;
  error?: FieldError;
  type?: string | undefined;
  multiline?: boolean;
  helperText?: string;
}

const ClearableInput = ({
  label,
  error,
  clearAriaLabel,
  value,
  onChange,
  onBlur,
  placeholder,
  type,
  multiline,
  helperText,
}: Props) => {
  const handleClickClear = () => {
    onChange("");
  };

  return (
    <BaseInput
      error={error}
      label={label}
      onBlur={onBlur}
      onChange={onChange}
      type={type}
      value={value}
      ariaLabel={clearAriaLabel}
      helperText={helperText}
      icon={<HighlightOff />}
      onIconClick={handleClickClear}
      placeholder={placeholder}
    />
  );
};
export default ClearableInput;
