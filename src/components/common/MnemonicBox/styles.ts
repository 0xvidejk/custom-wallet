import { css } from "@emotion/react";
import { COLORS } from "utils/constants";

const styles = {
  visibilityIcon: css({
    "& path": {
      fill: COLORS.BRAND.FLORAL,
    },
  }),

  mnemonicBox: css({
    position: "relative",
    width: "60%",
    border: `1px solid ${COLORS.BRAND.DAVYS_GRAY}`,
    padding: "20px",
    borderRadius: "8px",
  }),

  mnemonicBoxWrapper: css({
    display: "flex",
    flexWrap: "wrap",
    rowGap: "10px",
    columnGap: "10px",
  }),

  mnemonicBoxBlur: css({
    filter: "blur(4px)",
  }),

  visibilityIconMnemonic: css({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    cursor: "pointer",
  }),

  mnemonicItem: css({
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

  mnemonicForm: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),

  mnemonicInput: css({
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

  mnemonicButtons: css({
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    width: "calc(60% + 40px)",
  }),

  mnemonicButton: css({
    marginTop: "16px",
  }),
};
export default styles;
