import { connectDB } from "../DB/db-connection.js";

import * as routers from "./modules/index-routers.js";
import cors from "cors";
export const initiateApp = (app, express) => {
  const port = process.env.PORT;
  app.use(cors());
  app.use(express.json());
  app.use("/uploads", express.static("uploads"));
  connectDB();

  app.use("/auth", routers.authRouter);
  app.use("/message", routers.messageRouter);
  app.use("/user", routers.userRouter);

  app.all("*", (req, res, next) => {
    return next(new Error("page not found"));
  });

  app.use((error, req, res, next) => {
    console.log(error);

    res.status(error.cause || 500).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
    next();
  });

  app.listen(port, () => {
    console.log(`server is running on port ${port}...`);
  });
};
