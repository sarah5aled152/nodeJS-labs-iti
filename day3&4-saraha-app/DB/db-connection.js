import mongoose from "mongoose";

export const connectDB = async () => {
  return await mongoose
    .connect(process.env.CONNECTION_URL_LOCAL)
    .then(() => console.log("database connection success"))
    .catch((error) => {
      console.log(`faile to connect to database ....${error}`);
    });
};
