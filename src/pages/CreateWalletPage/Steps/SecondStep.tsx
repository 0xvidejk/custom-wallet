import { useEffect } from "react";
import { Mnemonic, randomBytes } from "ethers";
import { StepPropsBase } from "pages/CreateWalletPage/Steps";
import styles from "pages/CreateWalletPage/styles";
import { SECURE_WALLET_TIPS } from "utils/constants";

import CustomButton from "components/common/CustomButton";
import CustomTypography from "components/common/CustomTypography";
import MnemonicBox from "components/common/MnemonicBox";

interface SecondStepProps extends StepPropsBase {
  password: string;
  setMnemonic: (mnemonic: string) => void;
  mnemonic: string;
}

function SecondStep({
  setActiveStep,
  password,
  setMnemonic,
  mnemonic,
}: SecondStepProps) {
  useEffect(() => {
    const generatedMnemonic = Mnemonic.fromEntropy(
      randomBytes(16),
      password,
    ).phrase;
    setMnemonic(generatedMnemonic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CustomTypography variant="heading" css={styles.createWalletPageHeading}>
        Write down your Secret Recovery Phrase
      </CustomTypography>
      <CustomTypography variant="label" css={styles.createWalletPageSubheading}>
        Write down this 12-word Secret Recovery Phrase and save it in a place
        that you trust and only you can access.
      </CustomTypography>
      <ul css={styles.createWalletPageTipsBox}>
        {SECURE_WALLET_TIPS.map((tip) => (
          <li key={tip}>
            <CustomTypography variant="body">{tip}</CustomTypography>
          </li>
        ))}
      </ul>
      <MnemonicBox mnemonic={mnemonic} />
      <CustomButton
        css={[
          styles.createWalletPageMnemonicButton,
          { width: "calc(60% + 40px)" },
        ]}
        onClick={() => setActiveStep(2)}
      >
        Next
      </CustomButton>
    </>
  );
}

export default SecondStep;
