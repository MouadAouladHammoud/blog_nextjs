"use client";

import React, { PropsWithChildren } from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface Props extends PropsWithChildren<{}> {
  session: Session | null;
}

export default function AuthProvider(props: { session: any; children: any }) {
  const { session, children } = props;
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
