import { Button, ButtonProps } from "@mui/material";

import styles from "components/common/CustomButton/styles";

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
}

function CustomButton({ children, variant, ...rest }: CustomButtonProps) {
  return (
    <Button variant={variant} css={styles.customButton} {...rest}>
      {children}
    </Button>
  );
}

export default CustomButton;
