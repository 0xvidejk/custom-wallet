import { css } from "@emotion/react";
import { COLORS } from "utils/constants";

const styles = {
  dashboardPageContainer: css({
    flex: "1 0 100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),

  dashboardPageBox: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    width: "70%",
    padding: "32px",

    border: `1px solid ${COLORS.BRAND.DAVYS_GRAY}`,
    borderRadius: "36px",
  }),

  dashboardPageHeading: css({
    textTransform: "uppercase",
  }),

  dashboardPageHeadingColored: css({
    textTransform: "uppercase",
    fontWeight: "800",
    color: COLORS.BRAND.VISTA_BLUE,
  }),

  dashboardPageSubheading: css({
    marginTop: "8px",
    textAlign: "center",
    fontSize: "16px",

    "& > span": {
      fontWeight: "700",
      color: COLORS.BRAND.VISTA_BLUE,
    },
  }),

  dashboardPageBalanceBlock: css({
    display: "flex",
    alignItems: "center",
    gap: "6px",

    "& .MuiSvgIcon-root": {
      fontSize: "26px",
      color: COLORS.BRAND.VISTA_BLUE,
    },

    "& > h1": {
      marginTop: "5px",
    },
  }),

  refreshRotate: (isLoading) =>
    css({
      animation: !isLoading ? "none" : "refresh-rotate .87s ease-in-out both",
    }),

  dashboardPageBalance: (balance) =>
    css({
      ...(balance.length === 0 && {
        opacity: "0.45",
        animation: "skeleton-loading 1s linear infinite alternate",
      }),
    }),

  dashboardPageImageLogo: css({
    width: "250px",
  }),

  dashboardPageButtonsBlock: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "8px",
  }),

  dashboardPageInput: css({
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

  dashboardPageVisibilityIcon: css({
    "& path": {
      fill: COLORS.BRAND.FLORAL,
    },
  }),

  dashboardPageSubmitButton: css({
    marginTop: "30px",
  }),

  dashboardPageWalletsList: css({
    color: COLORS.BRAND.FLORAL,
  }),
};

export default styles;
