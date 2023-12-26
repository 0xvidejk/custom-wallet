import React from "react";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  InputProps,
} from "@mui/material";
import { convertToCamelCase } from "helpers/toCamelCase";

import styles from "components/common/CustomInput/styles";

export interface BaseInputProps extends InputProps {
  label?: string;
  errorText?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
  onClick?: () => void;
  endAdornment?: React.ReactNode;
  placeholder?: string;
  isTouched?: boolean;
}

const BaseInput = ({
  errorText,
  value,
  onChange,
  onBlur,
  type = "text",
  endAdornment,
  label = "Custom Input",
  placeholder = "Custom Input",
  isTouched,
}: BaseInputProps) => {
  const formikInputIdentifier = convertToCamelCase(label);
  return (
    <FormControl
      fullWidth
      error={Boolean(isTouched && errorText)}
      css={styles.pageInput}
      variant="standard"
    >
      <InputLabel htmlFor={formikInputIdentifier}>{label}</InputLabel>
      <Input
        name={formikInputIdentifier}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        id={formikInputIdentifier}
        type={type}
        endAdornment={endAdornment}
        placeholder={placeholder}
      />
      {isTouched && errorText && <FormHelperText>{errorText}</FormHelperText>}
    </FormControl>
  );
};

export default BaseInput;
