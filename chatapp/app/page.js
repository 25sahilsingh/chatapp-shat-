"use client";
import Link from "next/link";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { dbconnect } from "./lib/db";

const page = () => {
  const { data: session } = useSession();
  console.log("just before dbconnection");
  dbconnect();
  if (session) {
    return (
      <div className="h-screen pt-72 text-center bg-background">
        <h1 className="text-9xl text-foreground">welcome to chatbot</h1>
        <Link href="/login">
          <button className="rounded bg-blue-800 p-3 m-10 text-foreground">
            Get started
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="h-screen bg-background">
        <div className="pt-72 text-center bg-background">
          <h1 className="text-9xl text-foreground">welcome to chatbot</h1>
        </div>
        <div className="flex justify-center bg-background">
          <p className="self-center text-foreground"> u are not signed in: </p>
          <button
            className="rounded bg-blue-800 p-3 m-10 text-foreground"
            onClick={() =>
              signIn("github", {
                callbackUrl: "/login",
                redirect: true,
              })
            }
          >
            sign in
          </button>
        </div>
      </div>
    );
  }
};

export default page;
