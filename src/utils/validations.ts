import * as Yup from "yup";

import { VALIDATION_MESSAGES } from "./constants";

const { PASSWORD_MIN_LENGTH, PASSWORD_MATCH, REQUIRED } = VALIDATION_MESSAGES;

export const passwordValidation = Yup.object({
  password: Yup.string().min(8, PASSWORD_MIN_LENGTH).required(REQUIRED),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], PASSWORD_MATCH)
    .required(REQUIRED),
});
