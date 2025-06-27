"use client";
import Head from "next/head";
import styles from "./Login.module.css"; // Importing module CSS
import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/Helper/Context";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const userdetails = useContext(MyContext);
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user?.name) {
      userdetails.setusername(session.user.name);
    }
  }, [session]);
  if (session) {
    console.log(session);
    return (
      <div className="bg-background">
        <div className=" bg-red-800 pr-4">
          <div className="flex justify-end text-foreground">
            Signed in as:
            <img
              src={session.user.image}
              alt="!profile image"
              className=" rounded-full w-4 h-4 self-center"
            ></img>
            {session.user.email}
          </div>
          <div className="flex justify-end text-foreground">
            <button
              onClick={() => signOut({ callbackUrl: "/", redirect: true })}
            >
              Sign out
            </button>
          </div>
        </div>
        <Head>
          <title>Login Page</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Raleway:400,700"
          />
        </Head>
        <div className={styles.container}>
          <div className={styles.screen}>
            <div className={styles.screenContent}>
              <form className={styles.login}>
                <div className={styles.loginField}>
                  <input
                    type="text"
                    className={styles.loginInput}
                    placeholder="User name / Email"
                    value={userdetails.username}
                    onChange={(e) => {
                      //userdetails.setusername(e.target.value); {it makes so user can change there name}
                    }}
                  />
                </div>
                <div className={styles.loginField}>
                  <input
                    type="number"
                    className={styles.loginInput}
                    placeholder="room code"
                    value={userdetails.room}
                    onChange={(e) => {
                      userdetails.setroom(e.target.value);
                    }}
                  />
                </div>
                <Link href={`/${userdetails.room}`}>
                  <button className={styles.loginSubmit}>
                    <span className={styles.buttonText}>Log In Now</span>
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1> Not signed in</h1> <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
