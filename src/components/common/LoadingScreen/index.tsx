import React from "react";
import { CircularProgress } from "@mui/material";

import styles from "components/common/LoadingScreen/styles";

function LoadingScreen() {
  return (
    <section css={styles.container}>
      <CircularProgress size="10%" />
    </section>
  );
}

export default LoadingScreen;
