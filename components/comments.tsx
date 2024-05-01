"use client";

import { Separator } from "@radix-ui/react-separator";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Comment } from "@prisma/client";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useComments } from "@/app/hooks/useComments";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CommentWithUser } from "@/type";

export default function Comments({ postSlug }: { postSlug: string }) {
  const { status, data: session } = useSession();
  const currentUser = session?.user;
  const queryClients = useQueryClient();

  const [comment, setComment] = useState("");

  // create comment
  const createComment = async (newComment: Partial<Comment>) => {
    return await axios
      .post("/api/comments", newComment)
      .then((res) => res.data);
  };
  const { mutate: commentCreateMutation, isLoading } = useMutation(
    createComment,
    {
      onSuccess: (data: Comment, variables, context) => {
        console.log("🚀 ~ createComment ~ data:", data); // Affiche les données du commentaire créé
        console.log("🚀 ~ createComment ~ variables:", variables); // Affiche les variables passées à la mutation (content et postSlug)
        console.log("🚀 ~ createComment ~ context:", context); // Affiche le contexte utilisé pendant la mutation

        // Invalide le cache des requêtes de commentaires pour le post spécifique, en forçant manuellement l'invalidation et de déclencher un rechargement des données pour s'assurer que l'interface d'utilisateur est à jour
        // NB: Même avec "cacheTime" et "staleTime" réglés sur "Infinity", on peut forcer une mise à jour des données en utilisant "invalidateQueries".
        queryClients.invalidateQueries(["comments", postSlug]); // Invalider les requêtes de cache liées pour mettre à jour les données affichées

        alert("comment has been created");
      },
      onError: (error) => {
        console.log("error", error);
      },
    }
  );
  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await commentCreateMutation({ content: comment, postSlug });
  };

  // delete comment
  const deleteComment = async (id: string) => {
    return await axios
      .delete("/api/comments", { data: { id } })
      .then((res) => res.data);
  };
  const commentDeleteMutation = useMutation(deleteComment, {
    onSuccess: (data, variables, context) => {
      console.log("🚀 ~ createComment ~ data:", data); // Affiche les données du commentaire créé
      console.log("🚀 ~ createComment ~ variables:", variables); // Affiche les variables passées à la mutation (content et postSlug)
      console.log("🚀 ~ createComment ~ context:", context); // Affiche le contexte utilisé pendant la mutation

      // Invalide le cache des requêtes de commentaires pour le post spécifique, en forçant manuellement l'invalidation et de déclencher un rechargement des données pour s'assurer que l'interface d'utilisateur est à jour
      // NB: Même avec "cacheTime" et "staleTime" réglés sur "Infinity", on peut forcer une mise à jour des données en utilisant "invalidateQueries".
      queryClients.invalidateQueries(["comments", postSlug]); // Invalider les requêtes de cache liées pour mettre à jour les données affichées

      alert("comment has been deleted");
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
  const onDeleteComment = async (id: string) => {
    await commentDeleteMutation.mutateAsync(id); // "mutateAsync" pour les appels async
  };

  useEffect(() => {}, []);

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
                <span>
                  {currentUser?.email === comment.user?.email ? (
                    <>
                      You{" "}
                      <Button
                        variant="link"
                        onClick={() => onDeleteComment(comment.id)}
                      >
                        Delete your comment
                      </Button>
                    </>
                  ) : (
                    comment.user?.name
                  )}
                </span>
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
