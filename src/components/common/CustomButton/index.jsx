import { Button } from "@mui/material";

import styles from "components/common/CustomButton/styles";

function CustomButton({ children, variant, ...rest }) {
  return (
    <Button variant={variant} css={styles.customButton} {...rest}>
      {children}
    </Button>
  );
}

CustomButton.defaultProps = {
  children: undefined,
  variant: "contained",
};

export default CustomButton;
