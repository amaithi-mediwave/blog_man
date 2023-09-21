const joi = require("joi");

//---------------------------------------------------------------
//              VALIDATOR - REGISTER USER
//---------------------------------------------------------------

function validateRegisterUser(username, email, password, login_after_register) {
  let user = { username, email, password, login_after_register };

  const joiSchema = joi
    .object({
      username: joi.string().min(5).max(30).required(),

      email: joi.string().email().min(5).max(25).required(),

      password: joi.string().min(8).max(20).required(),

      login_after_register: joi
        .string()
        .valid("true")
        .valid("false")
        .optional(),
    })
    .options({ abortEarly: true });

  return joiSchema.validate(user);
}

//---------------------------------------------------------------
//              VALIDATOR - LOGIN USER
//---------------------------------------------------------------

function validateLoginUser(email, password) {
  let user = { email, password };
  const joiSchema = joi
    .object({
      email: joi.string().email().min(5).max(25).required(),

      password: joi.string().min(8).max(20).required(),
    })
    .options({ abortEarly: true });

  return joiSchema.validate(user);
}

//---------------------------------------------------------------
//              VALIDATOR - USER INFO
//---------------------------------------------------------------

function validateUserInfo(
  first_name,
  last_name,
  dob,
  profession,
  interests,
  about
) {
  let info = { first_name, last_name, dob, profession, interests, about };

  const joiSchema = joi
    .object({
      first_name: joi.string().min(3).max(10).required(),

      last_name: joi.string().min(3).max(10).required(),

      dob: joi
        .date()
        .max("01-01-2003")
        .iso()
        .messages({
          "date.format": `"Date format is YYYY-MM-DD"`,
          "date.max": `"Age must be 18+"`,
        })
        .required(),

      profession: joi.string().min(3).max(20).required(),

      interests: joi.string().min(3).max(50).required(),

      about: joi
        .string()
        .min(3)
        .max(500)
        .messages({
          "string.max": `"About Should be less than 500 characters"`,
        })
        .required(),
    })
    .options({ abortEarly: true });

  return joiSchema.validate(info);
}

module.exports = {
  validateRegisterUser,
  validateLoginUser,

  validateUserInfo,
};
