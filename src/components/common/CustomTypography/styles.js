import {
  COLORS,
  TYPOGRAPHY_BODYHEADING,
  TYPOGRAPHY_BODYTEXT,
  TYPOGRAPHY_HEADING,
  TYPOGRAPHY_LABELTEXT,
  TYPOGRAPHY_SUBHEADING,
} from "utils/constants";

const style = {
  base: {
    margin: 0,
    color: COLORS.TEXT.BASE,
  },
  [TYPOGRAPHY_HEADING]: {
    fontSize: "28px",
    lineHeight: "32px",
    fontWeight: "600",
  },
  [TYPOGRAPHY_SUBHEADING]: {
    fontSize: "22px",
    lineHeight: "28px",
    fontWeight: "500",
  },
  [TYPOGRAPHY_BODYTEXT]: {
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "28px",
  },
  [TYPOGRAPHY_BODYHEADING]: {
    fontSize: "20px",
    lineHeight: "24px",
    fontWeight: "600",
  },
  [TYPOGRAPHY_LABELTEXT]: {
    fontSize: "14px",
    fontWeight: "200",
  },
};

export default style;
