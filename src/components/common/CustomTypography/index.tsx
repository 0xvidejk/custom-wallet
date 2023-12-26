import { SerializedStyles } from "@emotion/react";
import { TYPOGRAPHY_MAPPING } from "utils/constants";

import style from "components/common/CustomTypography/styles";

// added object type to prevent errors. todo: find a better solution

interface CustomTypographyProps {
  children: React.ReactNode;
  variant: string;
  css?: SerializedStyles | SerializedStyles[] | object;
  className?: string;
}

function CustomTypography({
  children,
  variant,
  className,
}: CustomTypographyProps) {
  const TypographyTag = TYPOGRAPHY_MAPPING[variant];
  return (
    <TypographyTag
      css={[style.base, style[variant || "body"]]}
      className={className}
    >
      {children}
    </TypographyTag>
  );
}

export default CustomTypography;
