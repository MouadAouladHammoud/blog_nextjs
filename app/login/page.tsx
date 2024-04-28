"use client";

import PageContainer from "@/components/page-container";
import PageTitle from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Appel à signIn de NextAuth
    const result = await signIn("credentials", {
      redirect: false, // Ne redirige pas après la connexion
      email,
      password,
    });

    if (result?.error) {
      console.error("Failed to sign in", result.error);
    } else {
      window.location.href = "/";
    }
  };

  const onLogin = (provider: string) => () => {
    signIn(provider);
  };

  return (
    <PageContainer>
      <div className="py-10">
        <PageTitle title="Login" />

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-sm mx-auto mb-3"
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="hello@example.com"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button type="submit">Sign In</Button>
        </form>

        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          <Button onClick={onLogin("github")}>
            <Github className="mr-3" />
            Signin with Github
          </Button>

          <Button onClick={onLogin("google")}>
            <Mail className="mr-3" />
            Signin with Google
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
