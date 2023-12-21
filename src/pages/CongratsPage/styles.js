import { css } from "@emotion/react";
import { COLORS } from "utils/constants";

const styles = {
  congratsPageContainer: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    flex: "1 0 100%",
  }),

  congratsPageBox: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    width: "70%",
    padding: "32px",

    border: `1px solid ${COLORS.BRAND.DAVYS_GRAY}`,
    borderRadius: "36px",
  }),

  congratsPageHeading: css({
    marginBottom: "16px",
  }),

  congratsPageSubheading: css({
    textAlign: "center",
    "&:not(:last-of-type)": { marginTop: "32px" },
    "&:last-of-type": { marginBottom: "32px" },
    "& > span": {
      textTransform: "uppercase",
      fontWeight: "700",
      color: COLORS.BRAND.VISTA_BLUE,
    },
  }),
};

export default styles;
