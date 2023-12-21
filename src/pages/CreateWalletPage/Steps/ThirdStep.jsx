import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircularProgress, Input } from "@mui/material";
import { invoke } from "@tauri-apps/api";
import { keccak256, Wallet } from "ethers";
import { useFormik } from "formik";
import { encryptWalletInChunks } from "helpers/encryptWalletInChunks";
import { generateRandomThreeIndexes } from "helpers/generateRandomThreeIndexes";
import styles from "pages/CreateWalletPage/styles";
import { getMnemonic, getPassword } from "store/selectors/accountSelector";
import { setWalletData } from "store/slices/accountSlice";
import { v4 as uuidV4 } from "uuid";

import CustomButton from "components/common/CustomButton";
import CustomTypography from "components/common/CustomTypography";

function ThirdStep() {
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    progress: 0,
  });
  const mnemonic = useSelector(getMnemonic);
  const dispatch = useDispatch();
  const userPassword = useSelector(getPassword);
  const mnemonicArray = mnemonic.split(" ");
  const randomThreeIndexes = useMemo(() => generateRandomThreeIndexes(), []);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      words: mnemonicArray.map((word, index) =>
        randomThreeIndexes.includes(index) ? "" : word,
      ),
    },
    onSubmit: async (values) => {
      setLoadingState({ isLoading: true, progress: 0 });
      const { words } = values;
      const isCorrect = words.every(
        (word, index) => word === mnemonicArray[index],
      );

      if (!isCorrect) {
        setLoadingState({ isLoading: false, progress: 0 });
        toast.error("Entered missing words are incorrect");
        return;
      }

      toast.success("Secret Recovery Phrase confirmed");
      const passwordHash = keccak256(userPassword);
      const wallet = Wallet.fromPhrase(mnemonic);

      const encryptedWalletData = await encryptWalletInChunks(
        wallet,
        passwordHash,
        (progress) => {
          setLoadingState((prev) => ({ ...prev, progress }));
        },
      );

      invoke("create_user_profile", {
        userName: uuidV4(),
        passwordHash,
        encryptedWalletData,
      })
        .then((userName) => {
          invoke("get_user_profile")
            .then(({ profile_name }) => {
              if (profile_name !== userName)
                throw new Error("Failed to create user profile");
              dispatch(setWalletData({ address: wallet.address, mnemonic }));
              toast.success("User profile created successfully");
              setLoadingState({ isLoading: false, progress: 0 });
              navigate("/congratulations");
            })
            .catch((error) => {
              throw new Error(error);
            });
        })
        .catch((error) => {
          toast.error(`Unexpected error: ${error}`);
          setLoadingState({ isLoading: false, progress: 0 });
        });
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
