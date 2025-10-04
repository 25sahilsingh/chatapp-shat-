import mongoose from "mongoose";
export const dbconnect = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "chat_history",
    });
    console.log("db is connected....");
    //console.log(connection);
  } catch (error) {
    console.log(error);
  }
};
