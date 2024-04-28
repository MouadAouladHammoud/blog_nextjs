"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileButton() {
  const { data: session, status } = useSession();

  // user is not connected => login
  if (!session) {
    return (
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    );
  }

  // user is connected => avatar + menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={session?.user?.image || "/img/avatar.jpg"} />
          <AvatarFallback>{session?.user?.name || "User"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
