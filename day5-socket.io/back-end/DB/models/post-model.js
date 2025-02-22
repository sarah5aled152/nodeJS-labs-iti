import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    name: { type: String, required: true },

    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const postModel = mongoose.model("post", postSchema);
