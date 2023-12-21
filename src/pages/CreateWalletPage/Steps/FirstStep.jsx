import { useState } from "react";
import { useDispatch } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { id } from "ethers";
import { useFormik } from "formik";
import styles from "pages/CreateWalletPage/styles";
import { setPassword } from "store/slices/accountSlice";
import * as Yup from "yup";

import CustomButton from "components/common/CustomButton";
import CustomTypography from "components/common/CustomTypography";

function FirstStep({ setActiveStep }) {
  const [showPassword, setShowPassword] = useState({
    firstInput: false,
    secondInput: false,
  });
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required"),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const password = values["password"].toString();
      const passwordId = id(password);
      dispatch(setPassword(passwordId));
      setActiveStep(1);
    },
  });

  const handleClickShowPassword = (input) => {
    setShowPassword((prev) => ({ ...prev, [input]: !showPassword[input] }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <CustomTypography variant="heading" css={styles.createWalletPageHeading}>
        Create Password
      </CustomTypography>
      <CustomTypography variant="label" css={styles.createWalletPageSubheading}>
        This password will unlock your Custom Wallet only on this device. Custom
        Wallet doesn&#39;t store your password.
      </CustomTypography>
      <form
        onSubmit={formik.handleSubmit}
        css={styles.createWalletPageInputsBox}
      >
        <FormControl
          fullWidth
          error={Boolean(formik.errors.password)}
          css={styles.createWalletPageInput}
          variant="standard"
        >
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="standard-adornment-password"
            type={showPassword.firstInput ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword("firstInput")}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword.firstInput ? (
                    <VisibilityOff
                      css={styles.createWalletPageVisibilityIcon}
                    />
                  ) : (
                    <Visibility css={styles.createWalletPageVisibilityIcon} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.errors.password && (
            <FormHelperText>{formik.errors.password}</FormHelperText>
          )}
        </FormControl>
        <FormControl
          fullWidth
          error={Boolean(
            formik.touched.repeatPassword && formik.errors.repeatPassword,
          )}
          css={styles.createWalletPageInput}
          variant="standard"
        >
          <InputLabel htmlFor="standard-adornment-repeat-password">
            Repeat Password
          </InputLabel>
          <Input
            name="repeatPassword"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="standard-adornment-repeat-password"
            type={showPassword.secondInput ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => handleClickShowPassword("secondInput")}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword.secondInput ? (
                    <VisibilityOff
                      css={styles.createWalletPageVisibilityIcon}
                    />
                  ) : (
                    <Visibility css={styles.createWalletPageVisibilityIcon} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.touched.repeatPassword && formik.errors.repeatPassword && (
            <FormHelperText>{formik.errors.repeatPassword}</FormHelperText>
          )}
        </FormControl>
        <CustomButton
          disabled={Boolean(Object.keys(formik.errors).length)}
          css={styles.createWalletPageSubmitButton}
          type="submit"
        >
          Submit
        </CustomButton>
      </form>
    </>
  );
}

export default FirstStep;
