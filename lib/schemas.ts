import * as yup from "yup";

const EMAIL_PATTERN = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const PASSWORD_PATTERN = /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/;
const EN_PATTERN = /^[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*$/;
const UA_PATTERN = /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u;

const email = yup
  .string()
  .trim()
  .required("Email is required")
  .matches(EMAIL_PATTERN, "Enter a valid email");

const password = yup
  .string()
  .required("Password is required")
  .matches(PASSWORD_PATTERN, "Password must be 6 English letters and 1 number");

const en = yup
  .string()
  .trim()
  .required("English word is required")
  .matches(EN_PATTERN, "Use English letters only");

const ua = yup
  .string()
  .trim()
  .required("Ukrainian word is required")
  .matches(UA_PATTERN, "Use Ukrainian letters only");

export const loginSchema = yup.object({ email, password });

export const registerSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email,
  password,
});

export const addWordSchema = yup.object({
  category: yup.string().required("Select a category"),
  isIrregular: yup.boolean().when("category", {
    is: "verb",
    then: (schema) => schema.required("Select a verb type"),
  }),
  en,
  ua,
});

export const editWordSchema = yup.object({ en, ua });

export type LoginValues = yup.InferType<typeof loginSchema>;
export type RegisterValues = yup.InferType<typeof registerSchema>;
export type AddWordValues = yup.InferType<typeof addWordSchema>;
export type EditWordValues = yup.InferType<typeof editWordSchema>;
