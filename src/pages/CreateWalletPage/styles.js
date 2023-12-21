import { css } from "@emotion/react";
import { COLORS } from "utils/constants";

const styles = {
  createWalletPageContainer: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    flex: "1 0 100%",
  }),

  createWalletPageBox: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    width: "70%",
    padding: "32px",

    border: `1px solid ${COLORS.BRAND.DAVYS_GRAY}`,
    borderRadius: "36px",
  }),

  createWalletPageStepCircle: css({
    marginBottom: "14px",
    width: "60%",
    minWidth: "450px",

    "& .MuiStepIcon-root": {
      width: "40px",
      height: "40px",
    },
    "& .MuiStepIcon-active": {
      color: COLORS.BRAND.VISTA_BLUE,
    },
    "& .MuiStepIcon-completed": {
      color: COLORS.BRAND.VISTA_BLUE,
    },

    "& .MuiStepConnector-root": {
      top: "20px",
    },
  }),

  createWalletPageStepLabel: css({
    "& .MuiStepLabel-label": {
      fontFamily: "'Montserrat Variable', sans-serif",
      color: COLORS.BRAND.FLORAL,
      "&.Mui-active": {
        color: COLORS.BRAND.VISTA_BLUE,
      },
      "&.Mui-completed": {
        color: COLORS.UTILS.SUCCESS,
      },
    },
  }),

  createWalletPageHeading: css({
    marginBottom: "16px",
  }),

  createWalletPageSubheading: css({
    textAlign: "center",
  }),

  createWalletPageInputsBox: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60%",
    minWidth: "450px",
  }),

  createWalletPageInput: css({
    marginTop: "16px",
    "& .MuiInputBase-root": {
      color: COLORS.BRAND.FLORAL,
      "&::before": {
        borderBottom: `1px solid ${COLORS.BRAND.FLORAL}`,
      },
      "&:hover": {
        "&:not(.Mui-disabled, .Mui-error):before": {
          borderBottom: `2px solid ${COLORS.BRAND.FLORAL}`,
        },
      },
    },

    "& .MuiFormLabel-root": {
      color: COLORS.BRAND.FLORAL,
    },
  }),

  createWalletPageVisibilityIcon: css({
    "& path": {
      fill: COLORS.BRAND.FLORAL,
    },
  }),

  createWalletPageSubmitButton: css({
    marginTop: "30px",
  }),

  createWalletPageTipsBox: css({
    listStyle: "none",

    "& li p": {
      "&::before": {
        content: "'•'",
        color: COLORS.BRAND.FLORAL,
        display: "inline-block",
        fontWeight: "bold",
        width: "1em",
        marginLeft: "-1em",
      },
    },
  }),

  createWalletPageMnemonicBox: css({
    position: "relative",
    width: "60%",
    border: `1px solid ${COLORS.BRAND.DAVYS_GRAY}`,
    padding: "20px",
    borderRadius: "8px",
  }),

  createWalletPageMnemonicBoxWrapper: css({
    display: "flex",
    flexWrap: "wrap",
    rowGap: "10px",
    columnGap: "10px",
  }),

  createWalletPageMnemonicBoxBlur: css({
    filter: "blur(4px)",
  }),

  createWalletPageVisibilityIconMnemonic: css({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    cursor: "pointer",
  }),

  createWalletPageMnemonicItem: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 1 calc(33.3% - 10px)",
    gap: "4px",

    "& p:nth-of-type(2)": {
      border: `1px solid ${COLORS.BRAND.DAVYS_GRAY}`,
      borderRadius: "8px",
      textAlign: "center",
      padding: "2px 8px",
      width: "100%",
    },
  }),

  createWalletPageCheckMnemonicForm: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),

  createWalletPageMnemonicInput: css({
    color: COLORS.BRAND.FLORAL,
    textAlign: "center",
    marginLeft: "auto",
    width: "calc(100% - 25px)",
    "&::before": {
      borderBottom: `1px solid ${COLORS.BRAND.FLORAL}`,
    },
    "&:hover": {
      "&:not(.Mui-disabled, .Mui-error):before": {
        borderBottom: `2px solid ${COLORS.BRAND.FLORAL}`,
      },
    },
  }),

  createWalletPageMnemonicButtons: css({
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    width: "calc(60% + 40px)",
  }),

  createWalletPageMnemonicButton: css({
    marginTop: "16px",
  }),
};

export default styles;
