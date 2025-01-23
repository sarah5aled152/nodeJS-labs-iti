const reqKeys = ["body", "params", "query", "headers"];

export const validationMiddleware = (schema) => {
  return (req, res, next) => {
    let validationErrorArr = [];

    for (const key of reqKeys) {
      console.log(`Validating ${key}`);

      const validationResult = schema[key]?.validate(req[key]);

      if (validationResult?.error) {
        console.log(
          `Validation error for ${key}:`,
          validationResult.error.message
        );
        validationErrorArr.push(...validationResult.error.details);
      }
    }

    if (validationErrorArr.length) {
      return res.json({
        success: false,
        message: "Validation error",
        errors: validationErrorArr.map((obj) => obj.message),
      });
    }
    next();
  };
};
