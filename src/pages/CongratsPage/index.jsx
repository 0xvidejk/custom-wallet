import { useNavigate } from "react-router-dom";
import Confetti from "assets/confetti.png";
import styles from "pages/CongratsPage/styles";

import CustomButton from "components/common/CustomButton";
import CustomTypography from "components/common/CustomTypography";

function CongratsPage() {
  const navigate = useNavigate();
  return (
    <section css={styles.congratsPageContainer}>
      <div css={styles.congratsPageBox}>
        <CustomTypography variant="heading" css={styles.congratsPageHeading}>
          Congratulations!
        </CustomTypography>
        <img src={Confetti} alt="confetti" />
        <CustomTypography variant="body" css={styles.congratsPageSubheading}>
          Thank you for setting up <span>CustomWallet</span>.
        </CustomTypography>
        <CustomTypography variant="body" css={styles.congratsPageSubheading}>
          Now you can use your wallet to send and receive transactions.
        </CustomTypography>
        <CustomButton onClick={() => navigate("/dashboard")}>
          Go to Wallet
        </CustomButton>
      </div>
    </section>
  );
}

export default CongratsPage;
