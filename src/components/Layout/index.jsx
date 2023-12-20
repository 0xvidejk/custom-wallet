import { Outlet } from "react-router-dom";

import styles from "components/Layout/styles";

function Layout() {
  return (
    <div css={styles.container}>
      <div css={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
