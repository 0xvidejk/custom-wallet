import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, Input, InputAdornment } from "@mui/material";
import CustomWalletLogo from "assets/logo.png";
import { id, keccak256, Wallet } from "ethers";
import { useFormik } from "formik";
import styles from "pages/WelcomeBackPage/styles";
import { getEncryptedWalletData } from "store/selectors/accountSelector";
import { setWalletData } from "store/slices/accountSlice";

import CustomButton from "components/common/CustomButton";
import CustomTypography from "components/common/CustomTypography";

function WelcomeBackPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const walletData = useSelector(getEncryptedWalletData);
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async (values) => {
      const { password } = values;
      const enteredPasswordId = id(password);
      const enteredPasswordHash = keccak256(enteredPasswordId);

      try {
        const { address, mnemonic } = await Wallet.fromEncryptedJson(
          walletData,
          enteredPasswordHash,
        );
        dispatch(
          setWalletData({
            address,
            mnemonic: mnemonic.phrase,
          }),
        );
        toast.success("Welcome back!");
        navigate("/dashboard");
      } catch {
        toast.error("Incorrect password");
        return;
      }
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <section css={styles.WelcomeBackPageContainer}>
      <div css={styles.WelcomeBackPageBox}>
        <CustomTypography variant="heading" css={styles.WelcomeBackPageHeading}>
          Welcome back to{" "}
          <span css={styles.WelcomeBackPageHeadingColored}>Custom Wallet</span>
        </CustomTypography>
        <CustomTypography
          variant="subheading"
          css={styles.WelcomeBackPageSubheading}
        >
          Enter your password to access your wallet
        </CustomTypography>
        <img
          css={styles.WelcomeBackPageImageLogo}
          src={CustomWalletLogo}
          alt="Custom Wallet logo"
        />
        <form
          onSubmit={formik.handleSubmit}
          css={styles.WelcomeBackPageButtonsBlock}
        >
          <FormControl
            fullWidth
            error={Boolean(formik.errors.password)}
            css={styles.WelcomeBackPageInput}
            variant="standard"
          >
            <Input
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? (
                      <VisibilityOff
                        css={styles.WelcomeBackPageVisibilityIcon}
                      />
                    ) : (
                      <Visibility css={styles.WelcomeBackPageVisibilityIcon} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <CustomButton type="submit">Log In</CustomButton>
        </form>
      </div>
    </section>
  );
}

export default WelcomeBackPage;
