import { body, check, validationResult } from "express-validator";

const MINIMUM_AGE = 18;
const MINIMUM_DATE = "1900-01-01";
const MAXIMUM_DATE = `${
  new Date().getFullYear() - MINIMUM_AGE
}-${new Date().getMonth()}-${new Date().getDate()}`;

export const registerGamerArgumentsValidator = () => [
  body("email", "This email is not valid").isEmail(),
  check(
    "confirmPassword",
    "confirmPassword field must have the same value as the password field"
  ).custom((value, { req }) => value === req.body.password),
  body(
    "password",
    "Password should be 8 characters long, contains an upper case, a lower case and a number"
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
  body("pseudo", "Pseudo should be 5 characters long").isLength({ min: 5 }),
  body("birthDate")
    .isDate()
    .withMessage("Incorrect date format")
    .isAfter(MINIMUM_DATE)
    .withMessage("Incorrect date")
    .isBefore(MAXIMUM_DATE)
    .withMessage("You must be at least 18 to create an account"),
];

export const loginGamerArgumentsValidator = () => [
  body("email", "This email is not valid").isEmail(),
  body(
    "password",
    "Password should be 8 characters long, contains an upper case, a lower case and a number"
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
];

export const changePasswordArgumentsValidator = () => [
  body(
    "password",
    "Password should be 8 characters long, contains an upper case, a lower case and a number"
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
];
