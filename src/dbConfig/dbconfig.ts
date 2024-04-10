import mongoose from "mongoose";

export async function connect() {
  try {
  await  mongoose.connect(process.env.MONGODB_URI!); // 
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("mongodb connected");
    });

    connection.on("error", (err) => {
      console.log("mongodb connection error,please " + err);
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong in db");
    console.log(error);
  }
}