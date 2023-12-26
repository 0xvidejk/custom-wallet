import { useFormik } from "formik";
import { getStringHash } from "helpers/getStringHash";
import { StepPropsBase } from "pages/CreateWalletPage/Steps";
import styles from "pages/CreateWalletPage/styles";
import {
  CREATE_PASSWORD_HEADING,
  CREATE_PASSWORD_SUBHEADING,
} from "utils/constants";
import { passwordValidation } from "utils/validations";

import CustomButton from "components/common/CustomButton";
import { PasswordInput } from "components/common/CustomInput";
import CustomTypography from "components/common/CustomTypography";

interface FirstStepProps extends StepPropsBase {
  setPassword: (password: string) => void;
}

function FirstStep({ setActiveStep, setPassword }: FirstStepProps) {
  const formik = useFormik({
    initialValues: {
      password: "" as string,
      repeatPassword: "" as string,
    },
    initialTouched: {
      password: true,
      repeatPassword: false,
    },
    validationSchema: passwordValidation,
    onSubmit: ({ password }) => {
      const passwordHash = getStringHash(password);
      setPassword(passwordHash);
      setActiveStep(1);
    },
  });

  return (
    <>
      <CustomTypography variant="heading" css={styles.createWalletPageHeading}>
        {CREATE_PASSWORD_HEADING}
      </CustomTypography>
      <CustomTypography variant="label" css={styles.createWalletPageSubheading}>
        {CREATE_PASSWORD_SUBHEADING}
      </CustomTypography>
      <form
        onSubmit={formik.handleSubmit}
        css={styles.createWalletPageInputsBox}
      >
        <PasswordInput
          label="Password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          errorText={formik.errors.password}
          isTouched={formik.touched.password}
        />
        <PasswordInput
          label="Repeat Password"
          value={formik.values.repeatPassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          errorText={formik.errors.repeatPassword}
          isTouched={formik.touched.repeatPassword}
        />
        <CustomButton
          disabled={Boolean(formik.errors.password)}
          css={styles.createWalletPageSubmitButton}
          type="submit"
        >
          Submit
        </CustomButton>
      </form>
    </>
  );
}

export default FirstStep;
