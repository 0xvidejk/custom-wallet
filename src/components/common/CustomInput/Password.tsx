import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

import { BaseInputProps } from "components/common/CustomInput/Base";
import BaseInput from "components/common/CustomInput/Base";
import styles from "components/common/CustomInput/styles";

interface PasswordInputProps extends BaseInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const PasswordInput = ({
  label,
  value,
  onChange,
  onBlur,
  errorText,
  isTouched,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (event: React.MouseEvent) =>
    event.preventDefault();

  return (
    <BaseInput
      errorText={errorText}
      label={label}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={showPassword ? "text" : "password"}
      placeholder={label}
      isTouched={isTouched}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {showPassword ? (
              <VisibilityOff css={styles.pageVisibilityIcon} />
            ) : (
              <Visibility css={styles.pageVisibilityIcon} />
            )}
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default PasswordInput;
