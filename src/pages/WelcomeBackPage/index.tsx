import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomWalletLogo from "assets/logo.png";
import { useFormik } from "formik";
import { decryptWalletData } from "helpers/ethersHelpers";
import { getErrorMessage } from "helpers/ethersHelpers";
import { getStringHash } from "helpers/getStringHash";
import styles from "pages/WelcomeBackPage/styles";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getEncryptedWalletData } from "store/selectors/accountSelector";
import { setWallet } from "store/slices/accountSlice";

import CustomButton from "components/common/CustomButton";
import { PasswordInput } from "components/common/CustomInput";
import CustomTypography from "components/common/CustomTypography";

function WelcomeBackPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const encryptedWalletData = useAppSelector(getEncryptedWalletData);

  const formik = useFormik({
    initialValues: {
      password: "" as string,
    },
    onSubmit: async ({ password }) => {
      const passwordHash = getStringHash(password);
      try {
        toast.dismiss();
        setIsLoading(true);
        const { walletData } = await decryptWalletData(
          encryptedWalletData,
          passwordHash,
        );

        dispatch(setWallet(walletData));

        toast.success("Welcome back!");

        setIsLoading(false);
        navigate("/dashboard");
      } catch (error) {
        toast.error(getErrorMessage(error));
        setIsLoading(false);
        return;
      }
    },
  });

  return (
    <section css={styles.WelcomeBackPageContainer}>
      <div css={styles.WelcomeBackPageBox}>
        <CustomTypography variant="heading" css={styles.WelcomeBackPageHeading}>
          {"Welcome back to "}
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
          <PasswordInput
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Password"
          />
          <CustomButton type="submit" disabled={isLoading}>
            Log In
          </CustomButton>
        </form>
      </div>
    </section>
  );
}

export default WelcomeBackPage;
