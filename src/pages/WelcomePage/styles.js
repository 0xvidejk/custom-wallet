import { css } from "@emotion/react";
import { COLORS } from "utils/constants";

const styles = {
  welcomePagecontainer: css({
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),

  welcomePageBox: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    width: "70%",
    padding: "32px",

    border: `1px solid ${COLORS.BRAND.DAVYS_GRAY}`,
    borderRadius: "36px",
  }),

  welcomePageHeading: css({
    textTransform: "uppercase",
  }),

  welcomePageHeadingColored: css({
    textTransform: "uppercase",
    fontWeight: "800",
    color: COLORS.BRAND.VISTA_BLUE,
  }),

  welcomePageSubheading: css({
    marginTop: "8px",
    textAlign: "center",
    fontSize: "16px",

    "& > span": {
      fontWeight: "700",
      color: COLORS.BRAND.VISTA_BLUE,
    },
  }),
  welcomePageImageLogo: css({
    width: "250px",
  }),

  welcomePageButtonsBlock: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    "& > *": {
      margin: "8px 0",
    },
  }),
};

export default styles;
