import { useState } from "react";
import { VisibilityOff } from "@mui/icons-material";
import { copyTextToClipboard } from "helpers/copyTextToClipboard";
import { splitMnemonic } from "helpers/separateMnemonic";
import { MNEMONIC_PLACEHOLDER } from "utils/constants";

import CustomButton from "components/common/CustomButton";
import CustomTypography from "components/common/CustomTypography";
import styles from "components/common/MnemonicBox/styles";

interface MnemonicBoxProps {
  mnemonic: string;
}

const MnemonicBox = ({ mnemonic }: MnemonicBoxProps) => {
  const [isBlurred, setIsBlurred] = useState<boolean>(true);
  const mnemonicArray = splitMnemonic(mnemonic);

  return (
    <>
      <div css={styles.mnemonicBox} onClick={() => setIsBlurred(false)}>
        {isBlurred && (
          <VisibilityOff
            css={[styles.visibilityIcon, styles.visibilityIconMnemonic]}
          />
        )}
        <div
          css={[styles.mnemonicBoxWrapper, isBlurred && styles.mnemonicBoxBlur]}
        >
          {(() => mnemonicArray || MNEMONIC_PLACEHOLDER)().map(
            (word, index) => (
              <div css={styles.mnemonicItem} key={word}>
                <CustomTypography variant="body">{index + 1}.</CustomTypography>
                <CustomTypography variant="body">{word}</CustomTypography>
              </div>
            ),
          )}
        </div>
      </div>
      <div css={styles.mnemonicButtons}>
        <CustomButton
          css={styles.mnemonicButton}
          onClick={() => copyTextToClipboard(mnemonic)}
          variant="text"
        >
          Copy the mnemonic
        </CustomButton>
        <CustomButton
          css={styles.mnemonicButton}
          onClick={() => setIsBlurred(true)}
          variant="text"
          disabled={isBlurred}
        >
          Hide seed phrase
        </CustomButton>
      </div>
    </>
  );
};

export default MnemonicBox;
