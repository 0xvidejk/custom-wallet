import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CircularProgress } from "@mui/material";
import { HDNodeWallet } from "ethers";
import { useFormik } from "formik";
import { decryptWalletData, getErrorMessage } from "helpers/ethersHelpers";
import { getEthBalance } from "helpers/getEthBalance";
import { getStringHash } from "helpers/getStringHash";
import { updateLastWalletIndex } from "helpers/tauriHelpers";
import styles from "pages/DashboardPage/styles";
import { ProviderContext } from "store/contexts";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  getBalance,
  getEncryptedWalletData,
  getLastWalletIndex,
  getPasswordHash,
  getWallet,
} from "store/selectors/accountSelector";
import { setBalance, setLastWalletIndex } from "store/slices/accountSlice";
import { NOTIFICATION_MESSAGES } from "utils/constants";

import CustomButton from "components/common/CustomButton";
import { PasswordInput } from "components/common/CustomInput";
import CustomTypography from "components/common/CustomTypography";

function DashboardPage() {
  const walletData = useAppSelector(getWallet);
  const [wallets, setWallets] = useState<string[]>([walletData.address]);
  const [isRefreshingBalance, setIsRefreshingBalance] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [decryptedMnemonic, setDecryptedMnemonic] = useState("");
  const encryptedWalletData = useAppSelector(getEncryptedWalletData);
  const balance = useAppSelector(getBalance);
  const provider = useContext(ProviderContext);
  const dispatch = useAppDispatch();
  const passwordHash = useAppSelector(getPasswordHash);
  const lastWalletIndex = useAppSelector(getLastWalletIndex);

  const handleRevealClick = () => {
    setIsRevealing((prev) => !prev);
    setDecryptedMnemonic("");
    formik.resetForm();
  };

  const generateNewWallet = useCallback(async () => {
    toast.dismiss();
    const toastId = toast.loading("Generating a new wallet...", {
      autoClose: 2000,
    });
    try {
      const { signer } = await decryptWalletData(
        encryptedWalletData,
        passwordHash,
      );
      if (signer instanceof HDNodeWallet) {
        const mnemonic = signer.mnemonic;
        const nextIndex = lastWalletIndex + 1;
        const newWallet = HDNodeWallet.fromMnemonic(
          mnemonic,
          `m/44'/60'/0'/0/${nextIndex}`,
        );
        const newWalletAddress = newWallet.address;
        dispatch(setLastWalletIndex(nextIndex));
        setWallets((prev) => [...prev, newWalletAddress]);
        toast.update(toastId, {
          render: NOTIFICATION_MESSAGES.GENERATE_WALLET.SUCCESS,
          type: "success",
          autoClose: 2000,
          isLoading: false,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: NOTIFICATION_MESSAGES.GENERATE_WALLET.ERROR,
        type: "warning",
        autoClose: 2000,
        isLoading: false,
      });
    }
  }, [dispatch, encryptedWalletData, lastWalletIndex, passwordHash]);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: async ({ password }) => {
      toast.dismiss();
      try {
        setIsLoading(true);
        const hashedPassword = getStringHash(password);
        const { signer } = await decryptWalletData(
          encryptedWalletData,
          hashedPassword,
        );

        if (signer instanceof HDNodeWallet) {
          const mnemonic = signer.mnemonic;
          setDecryptedMnemonic(mnemonic.phrase);
          setIsRevealing(true);
        }
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    },
  });

  const refreshBalance = useCallback(async () => {
    setIsRefreshingBalance(true);
    const balance = await getEthBalance(walletData.address, provider);
    if (balance) dispatch(setBalance(balance));
  }, [dispatch, walletData.address, provider]);

  useEffect(() => {
    if (!walletData.address) return;
    const intervalId = setInterval(() => {
      refreshBalance();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [refreshBalance, walletData.address]);

  return (
    <section css={styles.dashboardPageContainer}>
      <div css={styles.dashboardPageBox}>
        <CustomTypography variant="heading">
          <span css={styles.dashboardPageHeadingColored}>
            {"CustomWallet "}
          </span>
          Dashboard
        </CustomTypography>
        <CustomTypography
          variant="heading"
          css={styles.dashboardPageSubheading}
        >
          Your account is: <span>{walletData.address}</span>
        </CustomTypography>
        <div css={styles.dashboardPageBalanceBlock}>
          <CustomTypography
            variant="heading"
            css={styles.dashboardPageSubheading}
          >
            Balance:{" "}
            <span css={() => styles.dashboardPageBalance(balance)}>
              {`${balance.length ? balance : "0"} `}
            </span>
            ETH
          </CustomTypography>
          <RefreshIcon
            onAnimationEnd={() => setIsRefreshingBalance(false)}
            css={styles.refreshRotate(isRefreshingBalance)}
            onClick={refreshBalance}
          />
        </div>
        <CustomButton css={{ marginTop: "20px" }} onClick={handleRevealClick}>
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
            {!!decryptedMnemonic || (
              <form
                onSubmit={formik.handleSubmit}
                css={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <PasswordInput
                  label="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter password"
                />

                <CustomButton disabled={isLoading} type="submit">
                  {isLoading ? <CircularProgress /> : "Submit"}
                </CustomButton>
              </form>
            )}
            {!!decryptedMnemonic && (
              <CustomTypography
                variant="heading"
                css={styles.dashboardPageSubheading}
              >
                Mnemonic: <span>{decryptedMnemonic}</span>
              </CustomTypography>
            )}
          </div>
        )}
        <CustomButton css={{ marginTop: "20px" }} onClick={generateNewWallet}>
          Generate New Wallet
        </CustomButton>
        <CustomTypography
          variant="heading"
          css={styles.dashboardPageSubheading}
        >
          Generated Wallets:
        </CustomTypography>
        <ul css={styles.dashboardPageWalletsList}>
          {wallets.map((wallet) => (
            <li key={wallet}>{wallet}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default DashboardPage;
