import { useState } from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import CurrentStep from "pages/CreateWalletPage/CurrentStep";
import styles from "pages/CreateWalletPage/styles";
import { CREATE_WALLET_STEPS } from "utils/constants";

function CreateWalletPage() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = Object.values(CREATE_WALLET_STEPS);

  return (
    <section css={styles.createWalletPageContainer}>
      <div css={styles.createWalletPageBox}>
        <Stepper
          activeStep={activeStep}
          css={styles.createWalletPageStepCircle}
          alternativeLabel
        >
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel css={styles.createWalletPageStepLabel}>
                {step}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <CurrentStep activeStep={activeStep} setActiveStep={setActiveStep} />
      </div>
    </section>
  );
}

export default CreateWalletPage;
