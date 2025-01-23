import mongoose, { Types, Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    content: { type: String, required: true, min: 10, max: 100 },
    images: [String],
    receiverID: { type: Types.ObjectId, ref: "User", required: true },
    isViewed: { type: Boolean, default: false },
  },

  { timestamps: true }
);
export const Message = mongoose.model("Message", MessageSchema);
