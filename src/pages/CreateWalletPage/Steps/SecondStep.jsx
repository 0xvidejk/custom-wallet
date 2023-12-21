import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VisibilityOff } from "@mui/icons-material";
import { Mnemonic, randomBytes } from "ethers";
import { copyTextToClipboard } from "helpers/copyTextToClipboard";
import styles from "pages/CreateWalletPage/styles";
import PropTypes from "prop-types";
import { getMnemonic, getPassword } from "store/selectors/accountSelector";
import { setMnemonic } from "store/slices/accountSlice";
import { SECURE_WALLET_TIPS } from "utils/constants";

import CustomButton from "components/common/CustomButton";
import CustomTypography from "components/common/CustomTypography";

function SecondStep({ setActiveStep }) {
  const [isBlurred, setIsBlurred] = useState(true);
  const mnemonic = useSelector(getMnemonic);
  const password = useSelector(getPassword);
  const dispatch = useDispatch();

  useEffect(() => {
    const mnemonic = Mnemonic.fromEntropy(randomBytes(16), password).phrase;

    dispatch(setMnemonic(mnemonic));
  }, [dispatch, password]);

  const mnemonicArray = mnemonic.split(" ");

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
      <div
        css={styles.createWalletPageMnemonicBox}
        onClick={() => setIsBlurred(false)}
      >
        {isBlurred && (
          <VisibilityOff
            css={[
              styles.createWalletPageVisibilityIcon,
              styles.createWalletPageVisibilityIconMnemonic,
            ]}
          />
        )}
        <div
          css={[
            styles.createWalletPageMnemonicBoxWrapper,
            isBlurred && styles.createWalletPageMnemonicBoxBlur,
          ]}
        >
          {mnemonicArray.map((word, index) => (
            <div css={styles.createWalletPageMnemonicItem} key={word}>
              <CustomTypography variant="body">{index + 1}.</CustomTypography>
              <CustomTypography variant="body">{word}</CustomTypography>
            </div>
          ))}
        </div>
      </div>
      <div css={styles.createWalletPageMnemonicButtons}>
        <CustomButton
          css={styles.createWalletPageMnemonicButton}
          onClick={() => copyTextToClipboard(mnemonic)}
          variant="text"
        >
          Copy the mnemonic
        </CustomButton>
        <CustomButton
          css={styles.createWalletPageMnemonicButton}
          onClick={() => setIsBlurred(true)}
          variant="text"
          disabled={isBlurred}
        >
          Hide seed phrase
        </CustomButton>
      </div>
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

SecondStep.propTypes = {
  setActiveStep: PropTypes.func.isRequired,
};

export default SecondStep;
