import { css } from "@emotion/react";
import { COLORS } from "utils/constants";

const styles = {
  pageInput: css({
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

  pageVisibilityIcon: css({
    "& path": {
      fill: COLORS.BRAND.FLORAL,
    },
  }),
};

export default styles;
