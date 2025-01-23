import joi from "joi";
export const signUpSchema = {
  body: joi
    .object({
      username: joi.string().min(3).max(15).required(),

      email: joi
        .string()
        .email({ maxDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: joi
        .string()
        .min(8)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),

      confirmpassword: joi.ref("password"),

      age: joi.number().integer().positive().min(17),

      phone: joi
        .string()
        .pattern(new RegExp("^(01[0-2]|02[0-9])[0-9]{8}$"))
        .required(),
    })
    .with("password", "confirmpassword"),
};
export const activateAccountSchema = {
  params: joi.object({
    token: joi.string().required(),
  }),
};

export const logInSchema = {
  body: joi
    .object({
      email: joi
        .string()
        .email({ maxDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: joi
        .string()
        .min(8)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    })
    .required(),
};
export const logOutSchema = {
  headers: joi.object({
    authuntication: joi.string().required(),
    "content-type": joi.string(),
    "content-length": joi.string(),
    "user-agent": joi.string().required(),
    host: joi.string().required(),
    "accept-encoding": joi.string(),
    accept: joi.string(),
    "cache-control": joi.string(),
    connection: joi.string(),
    "postman-token": joi.string(),
  }),
};

export const forgetCodeSchema = {
  body: joi.object({
    email: joi
      .string()
      .email({ maxDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
  }),
};
export const resetPassSchema = {
  body: joi
    .object({
      email: joi
        .string()
        .email({ maxDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      forgetCode: joi.string().length(5).required(),
      password: joi
        .string()
        .min(8)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),

      confirmpassword: joi.ref("password"),
    })
    .with("password", "confirmpassword"),
};
