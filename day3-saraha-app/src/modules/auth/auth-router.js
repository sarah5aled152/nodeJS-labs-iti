import { Router } from "express";

import * as authController from "./auth-controller.js";
import { validationMiddleware } from "./../../middlewares/validation.js";
import * as authValidation from "./auth-validationSchema.js";
const router = Router();

router.post(
  "/signup",
  validationMiddleware(authValidation.signUpSchema),
  authController.signUp
);
router.get(
  "/activate_account/:token",
  validationMiddleware(authValidation.activateAccountSchema),
  authController.activateAccount
);
router.get(
  "/login",
  validationMiddleware(authValidation.logInSchema),
  authController.logIn
);
export default router;
