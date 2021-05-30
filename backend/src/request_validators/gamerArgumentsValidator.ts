import { body, validationResult } from "express-validator";

const MINIMUM_AGE = 18;
const MINIMUM_DATE = "1900-01-01";
const MAXIMUM_DATE = `${
  new Date().getFullYear() - MINIMUM_AGE
}-${new Date().getMonth()}-${new Date().getDate()}`;

export const createGamerArgumentsValidator = () => [
  body("email", "This email is not valid").isEmail(),
  body(
    "password",
    "Password should be 8 characters long, contains an upper case, a lower case and a number"
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
  body("birthDate")
    .isDate()
    .withMessage("Incorrect date format")
    .isAfter(MINIMUM_DATE)
    .withMessage("Incorrect date")
    .isBefore(MAXIMUM_DATE)
    .withMessage("You must be at least 18 to create an account"),
];

export const changePasswordArgumentsValidator = () => [
  body(
    "password",
    "Password should be 8 characters long, contains an upper case, a lower case and a number"
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
];
