import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  FirstStep,
  SecondStep,
  StepPropsBase,
  ThirdStep,
} from "pages/CreateWalletPage/Steps";

interface CurrentStepProps extends StepPropsBase {
  activeStep: number;
}

interface CreateWalletData {
  password?: string;
  mnemonic?: string;
}

function CurrentStep({ activeStep, setActiveStep }: CurrentStepProps) {
  const [createWalletData, setCreateWalletData] = useState<CreateWalletData>({
    password: "",
    mnemonic: "",
  });

  const setPassword = (password: string) => {
    setCreateWalletData((prev) => ({ ...prev, password }));
  };

  const setMnemonic = (mnemonic: string) => {
    setCreateWalletData((prev) => ({ ...prev, mnemonic }));
  };

  const StepComponents = {
    0: <FirstStep setActiveStep={setActiveStep} setPassword={setPassword} />,
    1: (
      <SecondStep
        setActiveStep={setActiveStep}
        password={createWalletData.password}
        setMnemonic={setMnemonic}
        mnemonic={createWalletData.mnemonic}
      />
    ),
    2: (
      <ThirdStep
        setActiveStep={setActiveStep}
        mnemonic={createWalletData.mnemonic}
        password={createWalletData.password}
      />
    ),
    3: <Navigate to={"/congratulations"} />,
  };

  return StepComponents[activeStep];
}

export default CurrentStep;
