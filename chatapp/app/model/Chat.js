import mongoose, { Schema } from "mongoose";
const chatSchema = new Schema({
  roomId: String,
  usermail: String,
  name: String,
  chatmessage: String,
});
export const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);
