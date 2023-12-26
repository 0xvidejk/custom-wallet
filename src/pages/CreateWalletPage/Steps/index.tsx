import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";

export interface StepPropsBase {
  setActiveStep: (step: number) => void;
}

export { FirstStep, SecondStep, ThirdStep };
