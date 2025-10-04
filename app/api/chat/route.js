import { dbconnect } from "@/app/lib/db";
import { Chat } from "@/app/model/Chat";
import { NextResponse } from "next/server";
dbconnect();
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const room = searchParams.get("room"); // e.g., /api/chat?room=abc123

  const fetcheddata = await Chat.find({ roomId: room });
  return NextResponse.json({ fetcheddata });
}
export async function POST(request) {
  try {
    const { usermail, name, chatmessage, roomId } = await request.json();
    const chat = new Chat({ usermail, name, chatmessage, roomId });
    const createdchat = await chat.save();
    return NextResponse.json(createdchat, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
