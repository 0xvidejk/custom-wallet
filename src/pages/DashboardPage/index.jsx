import { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@mui/material";
import { id, keccak256, Wallet } from "ethers";
import { useFormik } from "formik";
import { getEthBalance } from "helpers/getEthBalance";
import styles from "pages/DashboardPage/styles";
import { ProviderContext } from "store/contexts";
import {
  getBalance,
  getEncryptedWalletData,
  getWalletData,
} from "store/selectors/accountSelector";
import { setBalance } from "store/slices/accountSlice";

import CustomButton from "components/common/CustomButton";
import CustomTypography from "components/common/CustomTypography";

function DashboardPage() {
  const [isRevealing, setIsRevealing] = useState(false);
  const [decryptedMnemonic, setDecryptedMnemonic] = useState("");
  const encryptedWalletData = useSelector(getEncryptedWalletData);
  const walletData = useSelector(getWalletData);
  const balance = useSelector(getBalance);
  const dispatch = useDispatch();
  const provider = useContext(ProviderContext);
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: (values) => {
      const { password } = values;
      const hashedPassword = keccak256(id(password));
      const { mnemonic } = Wallet.fromEncryptedJsonSync(
        encryptedWalletData,
        hashedPassword,
      );
      setIsRevealing(true);
      setDecryptedMnemonic(mnemonic.phrase);
    },
  });
  const refreshBalance = useCallback(async () => {
    const balance = await getEthBalance(walletData.address, provider);

    dispatch(setBalance(balance));
  }, [dispatch, walletData.address, provider]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshBalance();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [refreshBalance]);

  return (
    <section css={styles.dashboardPageContainer}>
      <div css={styles.dashboardPageBox}>
        <CustomTypography variant="heading">
          CustomWallet Dashboard
        </CustomTypography>
        <CustomTypography
          variant="heading"
          css={styles.dashboardPageSubheading}
        >
          Your account is: <span>{walletData.address}</span>
        </CustomTypography>
        <CustomTypography
          variant="heading"
          css={styles.dashboardPageSubheading}
        >
          Balance: <span>{balance}</span>
          {""} ETH
        </CustomTypography>
        <CustomButton css={{ marginTop: "20px" }} onClick={refreshBalance}>
          Refresh balance
        </CustomButton>
        <CustomButton
          css={{ marginTop: "20px" }}
          onClick={() => {
            setIsRevealing((prev) => !prev);
            setDecryptedMnemonic("");
            formik.resetForm();
          }}
        >
          Reveal Mnemonic
        </CustomButton>
        {isRevealing && (
          <div
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <form onSubmit={formik.handleSubmit} css={{ marginTop: "20px" }}>
              <Input
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Enter password"
                type="password"
                name="password"
              />
              <CustomButton css={{ marginLeft: "20px" }} type="submit">
                Submit
              </CustomButton>
            </form>
            <CustomTypography
              variant="heading"
              css={styles.dashboardPageSubheading}
            >
              Mnemonic: <span>{decryptedMnemonic}</span>
            </CustomTypography>
          </div>
        )}
      </div>
    </section>
  );
}

export default DashboardPage;
