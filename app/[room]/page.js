"use client";
import MessageByMe from "@/components/MessageByMe";
import { MyContext } from "@/Helper/Context";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5000/");

function Page() {
  const { data: session } = useSession();
  const { previousmessage, setpreviousmessage, room } = useContext(MyContext);
  const [messages, setmessages] = useState("");
  const [keyformessage, setkeyformessage] = useState(0);
  const endOfMessagesRef = useRef(null);
  const scrollToElement = () => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  socket.emit("sendroom", room);

  useEffect(() => {
    scrollToElement();
    async function chatfectch() {
      try {
        const fetcheddata1 = await axios.get("/api/chat?room=" + room);
        const data = fetcheddata1.data.fetcheddata;
        setpreviousmessage(data);
      } catch (error) {
        console.log(error);
      }
    }
    chatfectch();
    socket.on("messagefromserver", (data) => {
      setkeyformessage((prev) => prev + 1);
      setpreviousmessage((prev) => [
        ...prev,
        {
          _id: keyformessage,
          chatmessage: data[0],
          usermail: data[2],
          name: data[3],
        },
      ]);
    });
    return () => {
      socket.off("messagefromserver");
    };
  }, [setpreviousmessage, keyformessage]);

  const sends = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/chat", {
        usermail: session.user.email,
        name: session.user.name,
        chatmessage: messages,
        roomId: room,
      });
    } catch (error) {
      console.log(error);
    }
    socket.emit("messagefromfrontend", [
      messages,
      room,
      session.user.email,
      session.user.name,
    ]);

    console.log(previousmessage);
    setmessages("");
  };
  console.log(previousmessage);
  return (
    <div className="h-screen flex flex-col bg-background">
      <h1 className="m-5 font-bold">Room: {room}</h1>
      <div className="flex-1 flex justify-center overflow-auto">
        <div className="w-10/12 h-full border-4 p-2 flex flex-col-reverse overflow-y-scroll scroll-auto">
          <div ref={endOfMessagesRef}></div>
          {[...previousmessage].reverse().map((message) => (
            <MessageByMe
              key={message._id}
              messageinfo={[
                message._id,
                session.user.email,
                message.usermail,
                message.name,
                message.chatmessage,
              ]}
            ></MessageByMe>
          ))}
        </div>
      </div>
      <form onSubmit={sends} className="flex justify-center ">
        <input
          value={messages}
          onChange={(e) => setmessages(e.target.value)}
          className="w-8/12 h-10 border-4 border-blue-500 p-2 bg-background"
        />
        <button className="w-2/12 h-10 border-4 border-green-500 border-solid">
          Send
        </button>
      </form>
    </div>
  );
}

export default Page;
