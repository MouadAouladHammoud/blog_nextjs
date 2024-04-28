/*
// Gestion de l'accès aux application en utilisant "useSession": [Methode:1] (client session)
"use client";
import { useSession } from "next-auth/react";

export default function WritePage() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticted, handle it here.
      console.log("Not Logged In!");
    },
  });

  if (status === "loading") {
    return <div>Loading or Unauthenticated</div>;
  }
  return <div>Page write</div>;
}
*/

/*
// Gestion de l'accès aux application en utilisant "getServerSession": [Methode:2] (server session)
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";

export default async function WritePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    // redirect('/api/auth/signin')
  }
  return <div>Page write</div>;
}
*/

// Gestion de l'accès aux application en utilisant le fichier middleware: [Methode:3] (middleware.ts)
export default async function WritePage() {
  return <div>Page write</div>;
}
