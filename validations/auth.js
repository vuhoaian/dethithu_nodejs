const Joi = require("joi");
const validationAuth = Joi.object({
  userName: Joi.string().required().min(6),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

const validationAuthLogin = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});
module.exports = { validationAuth, validationAuthLogin };
