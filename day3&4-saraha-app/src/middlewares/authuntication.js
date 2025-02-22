import { User } from "../../DB/models/user-model.js";

import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/error-Handler.js";
// import { Token } from "../../DB/models/token.js";

export const authuntication = (accessRoles) => {
  return asyncHandler(async (req, res, next) => {
    let { authuntication } = req.headers;
    //check token existence
    if (!authuntication) {
      return next(new Error("please log in first ", { cause: 404 }));
    }

    //check prefix
    if (!authuntication.startsWith(process.env.BEARER_KEY))
      return next(new Error("invalid token"));
    authuntication = authuntication.split(process.env.BEARER_KEY)[1];

    //verify token
    const decode = jwt.verify(authuntication, "ss");

    if (!decode?.id) {
      return next(new Error("invalid payload"));
    }

    // //check token in db
    // const tokenDB = await Token.findOne({
    //   token: authuntication,
    //   isValid: true,
    // });
    // if (!tokenDB) {
    //   return next(new Error("token not valid"));
    // }

    // user check
    const user = await User.findById(decode.id, "username email role"); // loggdInUser ROle
    if (!user) return next(new Error("please signUp first", { cause: 404 }));
    // auhtorization
    if (!accessRoles.includes(user.role))
      return next(new Error("unauthorized", { cause: 401 }));

    // if (!user.loggedIn) {
    //   return next(new Error("user not logged in", { cause: 403 }));
    // }
    // if (user.isDeleted) {
    //   return next(new Error("user is soft deleted", { cause: 404 }));
    // }
    req.user = user;
    return next();
  });
};
