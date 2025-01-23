import { Message } from "../../../DB/models/message-model.js";
import { asyncHandler } from "../../utils/error-Handler.js";
export const userMessages = asyncHandler(async (req, res, next) => {
  const profile = await Message.find({ receiverID: req.user._id });

  if (!profile || profile.length === 0) {
    return next(new Error("No messages found", { cause: 404 }));
  }

  return res.status(200).json({ success: true, profile: profile });
});
