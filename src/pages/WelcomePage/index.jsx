import { useNavigate } from "react-router-dom";
import CustomWalletLogo from "assets/logo.png";
import styles from "pages/WelcomePage/styles";

import CustomButton from "components/common/CustomButton";
import CustomTypography from "components/common/CustomTypography";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <section css={styles.welcomePageContainer}>
      <div css={styles.welcomePageBox}>
        <CustomTypography variant="heading" css={styles.welcomePageHeading}>
          Let&#39;s get started with{" "}
          <span css={styles.welcomePageHeadingColored}>Custom Wallet</span>
        </CustomTypography>
        <CustomTypography
          variant="subheading"
          css={styles.welcomePageSubheading}
        >
          The custom wallet for <span>Interexy</span> company for creating and
          accessing a simple Ethereum wallet. The application has two main
          parts: a setup phase for wallet creation and a main screen for wallet
          interaction. Developed as a part of checking technical skills
        </CustomTypography>
        <img
          css={styles.welcomePageImageLogo}
          src={CustomWalletLogo}
          alt="Custom Wallet logo"
        />
        <div css={styles.welcomePageButtonsBlock}>
          <CustomButton onClick={() => navigate("/create-wallet")}>
            Create a wallet
          </CustomButton>
          <CustomButton variant="outlined">
            Import an existing wallet
          </CustomButton>
        </div>
      </div>
    </section>
  );
}

export default WelcomePage;
