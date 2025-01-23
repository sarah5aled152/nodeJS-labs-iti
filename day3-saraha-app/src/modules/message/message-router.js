import { Router } from "express";
import * as MessageController from "./message-controller.js";
import { uploadFile } from "./../../middlewares/multer.js";
import { allowedExtentions } from "../../utils/allowedExtensions.js";
import { authuntication } from "../../middlewares/authuntication.js";
import { systemRoles } from "../../utils/system-roles.js";
import { validationMiddleware } from "../../middlewares/validation.js";

import * as messageSchema from "./message-validationSchema.js";
const router = Router();

router.post(
  "/sendMessage/:receiverID",
  authuntication(systemRoles.USER),

  uploadFile({
    filePath: "message/images",
    extentions: allowedExtentions.image,
  }).array("images", 10),
  validationMiddleware(messageSchema.sendMessageSchema),
  MessageController.sendMessage
);
router.get(
  "/viewMessage/:messageID",
  authuntication(systemRoles.USER),
  validationMiddleware(messageSchema.viewMessageSchema),
  MessageController.viewMessage
);
router.delete(
  "/deleteMessage/:messageID",
  authuntication(systemRoles.USER),
  validationMiddleware(messageSchema.deleteMessageSchema),

  MessageController.DeleteMessage
);
export default router;
