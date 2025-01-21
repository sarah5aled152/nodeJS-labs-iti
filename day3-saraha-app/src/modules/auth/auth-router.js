import { Router } from "express";

import * as authController from "./auth-controller.js";

const router = Router();

router.post(
  "/signup",

  authController.signUp
);
router.get(
  "/activate_account/:token",

  authController.activateAccount
);
router.get(
  "/login",

  authController.logIn
);
export default router;
