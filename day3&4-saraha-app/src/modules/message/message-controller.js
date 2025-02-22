import { User } from "../../../DB/models/user-model.js";
import { Message } from "../../../DB/models/message-model.js";
import { asyncHandler } from "../../utils/error-Handler.js";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const receiverID = req.user._id;
  const { content } = req.body;

  const CheckUser = await User.findById(receiverID);
  if (!CheckUser) {
    return next(new Error("User not found", { cause: 404 }));
  }

  const message = await Message.create({ content, receiverID });
  req.files?.forEach((file) => {
    message.images.push(file.path);
  });
  await message.save();

  return res
    .status(201)
    .json({ success: true, message: "Message sent!", message: message });
});

export const viewMessage = asyncHandler(async (req, res, next) => {
  const { messageID } = req.params;

  console.log(messageID);
  const receiverID = req.user._id;

  const checkMessage = await Message.findOne({
    _id: messageID,
    receiverID,
  });

  console.log(checkMessage);

  if (!checkMessage) {
    return next(
      new Error("Message not found or user not allowed to view", { cause: 404 })
    );
  }

  const markASViewed = await Message.findOneAndUpdate(
    { _id: messageID },
    { isViewed: true, $inc: { __v: 1 } },
    { new: true }
  );

  return res.status(200).json({ success: true, message: markASViewed });
});

export const DeleteMessage = asyncHandler(async (req, res, next) => {
  const { messageID } = req.params;
  const receiverID = req.user._id;

  const CheckMessage = await Message.findOne({
    _id: messageID,
    receiverID,
  });

  if (!CheckMessage) {
    return next(
      new Error("Message not found or user not allowed to delete", {
        cause: 404,
      })
    );
  }

  // await User.updateOne(
  //   { _id: req.user._id },
  //   { $pull: { messages: messageID } }
  // );

  await Message.deleteOne({ _id: messageID });

  return res.status(200).json({ success: true, message: "Message Deleted!" });
});
