import { Router } from "express";
import * as userController from "./user-controller.js";
import { authuntication } from "../../middlewares/authuntication.js";
import { systemRoles } from "../../utils/system-roles.js";

const router = Router();

router.get(
  "/userMessages",
  authuntication(systemRoles.USER),
  userController.userMessages
);

export default router;
