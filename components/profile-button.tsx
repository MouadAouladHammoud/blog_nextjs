import Link from "next/link";
import { Button } from "./ui/button";

export default function ProfileButton() {
  // user is connected => avatar + menu
  // user is not connected => login
  return (
    <Link href="/login">
      <Button>Login</Button>
    </Link>
  );
}
