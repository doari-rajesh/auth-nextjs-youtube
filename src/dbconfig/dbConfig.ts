import mongoose from "mongoose";

export async function dbConnect() {
  try {
    mongoose.connect(process.env.MONGODB_URL!)
    const connection = mongoose.connection
    connection.on("connected", () => console.log("DB connection ho gya"))
    connection.on("error", () => {
      console.log("DB connection error")
      process.exit()
    })
    

  } catch (error) {
    console.log("DB mei error aya hai");
    console.log(error);
    process.exit(1);
  }
}
