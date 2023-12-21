import { FirstStep, SecondStep, ThirdStep } from "pages/CreateWalletPage/Steps";
import PropTypes from "prop-types";

function CurrentStep({ activeStep, setActiveStep }) {
  const StepComponents = {
    0: <FirstStep setActiveStep={setActiveStep} />,
    1: <SecondStep setActiveStep={setActiveStep} />,
    2: <ThirdStep />,
  };

  return StepComponents[activeStep];
}

CurrentStep.propTypes = {
  activeStep: PropTypes.number.isRequired,
  setActiveStep: PropTypes.func.isRequired,
};

export default CurrentStep;
