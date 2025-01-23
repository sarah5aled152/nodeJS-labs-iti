import Joi from "joi";

export const sendMessageSchema = {
  body: Joi.object({
    content: Joi.string().trim().min(1).max(1000).required().messages({
      "string.empty": "Message content cannot be empty",
      "string.max": "Message content must be less than 1000 characters",
    }),
  }),
  files: Joi.object({
    images: Joi.array()
      .items(
        Joi.object({
          size: Joi.number()
            .max(5 * 1024 * 1024)
            .messages({
              "number.max": "Image size must be less than 5MB",
            }),
          mimetype: Joi.string()
            .valid("image/jpeg", "image/png", "image/gif")
            .messages({
              "any.only": "Only JPEG, PNG, and GIF images are allowed",
            }),
        })
      )
      .max(5)
      .messages({
        "array.max": "Maximum 5 images are allowed",
      }),
  }).optional(),
};

export const viewMessageSchema = {
  params: Joi.object({
    messageID: Joi.string().hex().length(24).required().messages({
      "string.hex": "Invalid message ID format",
      "string.length": "Message ID must be 24 characters long",
    }),
  }),
};

export const deleteMessageSchema = {
  params: Joi.object({
    messageID: Joi.string().hex().length(24).required().messages({
      "string.hex": "Invalid message ID format",
      "string.length": "Message ID must be 24 characters long",
    }),
  }),
};
