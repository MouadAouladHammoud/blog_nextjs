import PageContainer from "@/components/page-container";
import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import { Post } from "@/type";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Eye, MessageCircle } from "lucide-react";

export default function SinglePostPage() {
  const POST: Post = {
    id: 1,
    category: "React",
    title: "React State Management: Choosing the Right Solution",
    image: "/react-state-management.jpg",
    caption:
      "Explore different state management solutions in React and choose the one that fits your needs.",
    date: "2023-01-15",
    minutesToRead: 10,
    author: "John ReactDev",
    nbViews: 25,
    nbComments: 8,
    slug: "react-state-management-choosing-right-solution",
    content: "Hello !",
  };

  return (
    <PageContainer>
      <div className="p-8">
        {/* Section Image */}
        <div
          style={{ backgroundImage: "url('/img/hero.jpg')" }}
          className="rounded-lg aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        >
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="sm:max-w-xl max-w-xs bg-secondary/80 p-4 rounded-lg">
              <h1 className="text-center font-bold text-3xl sm:text-5xl text-black dark:text-white">
                {POST.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Section Infos Post */}
        <div className="flex justify-between items-center p-3 mb-3">
          <div className="flex justify-center items-center gap-3">
            <Avatar>
              <AvatarImage src="/img/avatar.jpg" />
              <AvatarFallback>{POST.author}</AvatarFallback>
            </Avatar>

            <div>
              <p>{POST.author}</p>
              <p className="text-state-500 text-sm">
                Posted on {new Date(POST.date).toDateString()}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <MessageCircle size={24} />
              <p>{POST.nbComments}</p>
            </div>

            <div className="flex items-center gap-1">
              <Eye size={24} />
              <p>{POST.nbViews}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Section Content Post */}
        <div
          className="mt-6"
          dangerouslySetInnerHTML={{ __html: POST.content as string }}
        ></div>
      </div>
    </PageContainer>
  );
}
