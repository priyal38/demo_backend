import Joi, { ObjectSchema } from "joi";

const PASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
);

const authSignup = Joi.object().keys({
  
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
  refreshToken: Joi.string().allow('').optional(),
});

const authLogin = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export default {
  "/auth/login": authLogin,
  "/auth/signup": authSignup,
} as { [key: string]: ObjectSchema };