import { css } from "@emotion/react";
import { COLORS } from "utils/constants";

const styles = {
  WelcomeBackPageContainer: css({
    flex: "1 0 100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),

  WelcomeBackPageBox: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    width: "70%",
    padding: "32px",

    border: `1px solid ${COLORS.BRAND.DAVYS_GRAY}`,
    borderRadius: "36px",
  }),

  WelcomeBackPageHeading: css({
    textTransform: "uppercase",
  }),

  WelcomeBackPageHeadingColored: css({
    textTransform: "uppercase",
    fontWeight: "800",
    color: COLORS.BRAND.VISTA_BLUE,
  }),

  WelcomeBackPageSubheading: css({
    marginTop: "8px",
    textAlign: "center",
    fontSize: "16px",

    "& > span": {
      fontWeight: "700",
      color: COLORS.BRAND.VISTA_BLUE,
    },
  }),
  WelcomeBackPageImageLogo: css({
    width: "250px",
  }),

  WelcomeBackPageButtonsBlock: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "8px",
  }),

  WelcomeBackPageInput: css({
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

  WelcomeBackPageVisibilityIcon: css({
    "& path": {
      fill: COLORS.BRAND.FLORAL,
    },
  }),

  WelcomeBackPageSubmitButton: css({
    marginTop: "30px",
  }),
};

export default styles;
