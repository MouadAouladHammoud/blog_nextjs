"use client";
import { useSession } from "next-auth/react";

export const User = () => {
  const { data: session } = useSession();
  console.log("Client Session", session);
  return <pre>Client Session: {JSON.stringify(session)}</pre>;
};
