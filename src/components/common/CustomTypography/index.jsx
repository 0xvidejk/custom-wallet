import PropTypes from "prop-types";
import { TYPOGRAPHY_MAPPING } from "utils/constants";

import style from "components/common/CustomTypography/styles";

function CustomTypography({ children, variant, ...rest }) {
  const TypographyTag = TYPOGRAPHY_MAPPING[variant];

  return (
    <TypographyTag css={[style.base, style[variant || "body"]]} {...rest}>
      {children}
    </TypographyTag>
  );
}

CustomTypography.defaultProps = {
  children: undefined,
  variant: "body",
};

CustomTypography.propTypes = {
  children: PropTypes.node,
};

export default CustomTypography;

/* 
    heading
    subheading
    body
    label
*/
