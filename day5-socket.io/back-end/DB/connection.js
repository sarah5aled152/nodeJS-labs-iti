import mongoose from "mongoose";

export const dbConnection = async function () {
  return await mongoose
    .connect("mongodb://127.0.0.1:27017/Socket-io-app")
    .then(() => console.log("database connected success!"))
    .catch((error) => {
      console.log(`database connection failed ${error}`);
    });
};
