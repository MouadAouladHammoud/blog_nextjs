"use client";

import { Separator } from "@radix-ui/react-separator";
import React, { SyntheticEvent, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Comment } from "@prisma/client";
import axios from "axios";
import { useMutation } from "react-query";
import { useComments } from "@/app/hooks/useComments";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CommentWithUser } from "@/type";

export default function Comments({ postSlug }: { postSlug: string }) {
  const { status } = useSession();
  const [comment, setComment] = useState("");

  // create comment
  const createComment = async (newComment: Partial<Comment>) => {
    return await axios
      .post("/api/comments", newComment)
      .then((res) => res.data);
  };
  const { mutate, isLoading } = useMutation(createComment, {
    onSuccess: (data: Comment) => {
      alert("comment has been created");
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await mutate({ content: comment, postSlug });
  };

  // get comments
  const { data: comments, isFetching } = useComments(postSlug);

  return (
    <div className="mt-10">
      <Separator />
      <h2 className="text-2xl text-slate-500 font-semibold mt-4">Comments</h2>

      {/* Form to write a comment */}
      <div className="mt-2 mb-6">
        {status === "authenticated" ? (
          <div className="">
            <Textarea
              placeholder="Any comment ?"
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              disabled={comment === "" || isLoading}
              onClick={onSubmit}
              className="mt-4"
            >
              Add your comment
            </Button>
          </div>
        ) : (
          <Link href="/login" className="underline">
            Login to write a comment
          </Link>
        )}
      </div>

      {/* List of comments */}
      {isFetching ? (
        <p>Loading...</p>
      ) : (
        comments?.map((comment: CommentWithUser) => (
          <div key={comment.id} className="flex items-center mb-2">
            <Avatar>
              <AvatarImage
                src={/*comment.user?.image ||*/ "/img/avatar.jpg"}
              ></AvatarImage>
              <AvatarFallback>{comment.user?.name}</AvatarFallback>
            </Avatar>

            <div className="ml-3 p-4 border rounded-lg border-slate-400">
              <div className="flex items-center gap-2">
                <span>{comment.user?.name}</span>
                <span className="text-slate-500 text-sm">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p>{comment.content}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
