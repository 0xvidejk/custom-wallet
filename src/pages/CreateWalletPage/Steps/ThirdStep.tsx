import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { CircularProgress, Input } from "@mui/material";
import { Wallet } from "ethers";
import { useFormik } from "formik";
import { encryptWalletData } from "helpers/ethersHelpers";
import { generateRandomThreeIndexes } from "helpers/generateRandomThreeIndexes";
import { splitMnemonic } from "helpers/separateMnemonic";
import { createLocalProfile } from "helpers/tauriHelpers";
import { StepPropsBase } from "pages/CreateWalletPage/Steps";
import styles from "pages/CreateWalletPage/styles";
import { useAppDispatch } from "store/hooks";
import { setAccountLocalData, setWallet } from "store/slices/accountSlice";
import { IWallet } from "types/account";

import CustomButton from "components/common/CustomButton";
import CustomTypography from "components/common/CustomTypography";

interface ThirdStepProps extends StepPropsBase {
  mnemonic: string;
  password: string;
}

function ThirdStep({ mnemonic, password, setActiveStep }: ThirdStepProps) {
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    progress: 0,
  });

  const dispatch = useAppDispatch();

  const mnemonicArray = splitMnemonic(mnemonic);
  const randomThreeIndexes = useMemo(() => generateRandomThreeIndexes(), []);

  const formik = useFormik({
    initialValues: {
      words: mnemonicArray.map((word, index) =>
        randomThreeIndexes.includes(index) ? "" : word,
      ),
    },
    onSubmit: async ({ words }) => {
      setLoadingState({ isLoading: true, progress: 0 });
      const isCorrect = words.every(
        (word, index) => word === mnemonicArray[index],
      );

      if (!isCorrect) {
        setLoadingState({ isLoading: false, progress: 0 });
        toast.error("Entered missing words are incorrect");
        return;
      }

      toast.success("Secret Recovery Phrase confirmed");
      try {
        const wallet = Wallet.fromPhrase(mnemonic);

        const walletData: IWallet = {
          address: wallet.address,
          privateKey: wallet.privateKey,
        };

        const encryptedWalletData = await encryptWalletData(wallet, password);
        const localAccountData = await createLocalProfile(
          password,
          encryptedWalletData,
        );
        dispatch(setWallet(walletData));
        dispatch(setAccountLocalData(localAccountData));
        setLoadingState({ isLoading: false, progress: 0 });
        setActiveStep(3);
      } catch (error) {
        toast.error(`Unexpected error: ${error}`);
        setLoadingState({ isLoading: false, progress: 0 });
      }
    },
  });
  return (
    <>
      <CustomTypography variant="heading" css={styles.createWalletPageHeading}>
        Confirm Secret Recovery Phrase
      </CustomTypography>
      <CustomTypography
        variant="label"
        css={[styles.createWalletPageSubheading, { marginBottom: "20px" }]}
      >
        Confirm Secret Recovery Phrase
      </CustomTypography>
      <form
        onSubmit={formik.handleSubmit}
        css={styles.createWalletPageCheckMnemonicForm}
      >
        <div
          css={[
            styles.createWalletPageMnemonicBoxWrapper,
            { marginBottom: "40px" },
          ]}
        >
          {mnemonicArray.map((word, index) => (
            <div css={styles.createWalletPageMnemonicItem} key={word}>
              <CustomTypography variant="body">{index + 1}.</CustomTypography>
              {randomThreeIndexes.includes(index) ? (
                <Input
                  type="text"
                  name="words"
                  value={formik.values.words[index]}
                  onChange={(event) => {
                    const newValue = event.target.value;
                    formik.setFieldValue(
                      "words",
                      formik.values.words.map((word, i) =>
                        i === index ? newValue : word,
                      ),
                    );
                  }}
                  css={styles.createWalletPageMnemonicInput}
                />
              ) : (
                <CustomTypography variant="body">{word}</CustomTypography>
              )}
            </div>
          ))}
        </div>
        <CustomButton
          type="submit"
          disabled={loadingState.isLoading}
          css={{ alignSelf: "center", width: "calc(60% + 40px)" }}
        >
          {loadingState.isLoading ? (
            <CircularProgress value={loadingState.progress} />
          ) : (
            "Confirm"
          )}
        </CustomButton>
      </form>
    </>
  );
}

export default ThirdStep;
