"use client";

import { ReactQueryDevtools } from "react-query/devtools";
import PageContainer from "@/components/page-container";
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Eye, MessageCircle } from "lucide-react";
import { usePost } from "@/app/hooks/usePost";
import Image from "next/image";
import Comments from "@/components/comments";

export default function SinglePostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const { data: post, isFetching, error } = usePost(slug);

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <PageContainer>
      <ReactQueryDevtools />
      <div className="p-8">
        {/* Section Image */}
        <div
          // style={{ backgroundImage: "url('/img/hero.jpg')" }}
          className="relative rounded-lg aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        >
          <Image
            src={post?.image || "/img/hero.jpg"}
            fill
            alt={post?.title || "Image"}
          />
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="sm:max-w-xl max-w-xs bg-secondary/80 p-4 rounded-lg">
              <h1 className="text-center font-bold text-3xl sm:text-5xl text-black dark:text-white">
                {post?.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Section Infos Post */}
        <div className="flex justify-between items-center p-3 mb-3">
          <div className="flex justify-center items-center gap-3">
            <Avatar>
              <AvatarImage src="/img/avatar.jpg" />
              {/* <AvatarFallback>{post.author}</AvatarFallback> */}
            </Avatar>

            <div>
              {/* <p>{post.author}</p> */}
              {post?.createdAt && (
                <p className="text-state-500 text-sm">
                  Posted on {new Date(post?.createdAt).toDateString()}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <MessageCircle size={24} />
              <p>{post?.nbComments}</p>
            </div>

            <div className="flex items-center gap-1">
              <Eye size={24} />
              <p>{post?.view}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Section Content Post */}
        <div
          className="mt-6"
          dangerouslySetInnerHTML={{ __html: post?.content as string }}
        ></div>

        <Comments postSlug={slug} />
      </div>
    </PageContainer>
  );
}
