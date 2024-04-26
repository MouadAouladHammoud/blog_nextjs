"use client";

import PageContainer from "@/components/page-container";
import PostsList from "@/components/posts-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Category } from "@/type";
import { Category } from "@prisma/client";
import { CATEGORIES } from "@/utils/categories";
import { POSTS } from "@/utils/posts";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePosts } from "./hooks/usePosts";
import { useCateogories } from "./hooks/useCategories";

export default function Home() {
  // get posts from api
  const { data: posts, isLoading, error, isFetching } = usePosts(null);
  const { data: categories } = useCateogories();

  /* const router = useRouter(); */
  return (
    <PageContainer>
      <div className="py-10 px-4">
        {/* Section Hero */}
        <div
          style={{ backgroundImage: "url('/img/hero.jpg')" }}
          className="rounded-lg aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
        >
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="sm:max-w-xl max-w-xs bg-secondary/80 p-4 rounded-lg">
              <h1 className="text-center font-bold text-3xl sm:text-5xl text-black dark:text-white">
                Become A Better React Developper
              </h1>
              <Input
                type="email"
                placeholder="Enter your email"
                className="dark:bg-white mt-4"
              />

              <Button size="lg" className="w-full py-6 text-xl mt-4">
                Subscribe to our newsletter
              </Button>
            </div>
          </div>
        </div>

        {/* Section List Categories */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center items-center">
          {categories?.map((category: Category) => (
            <Button key={category.id} variant="outline">
              <Link href={`/categories/${category.slug}`}>
                {category.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* Section List Posts */}
        {isFetching ? <p>Loading...</p> : <PostsList posts={posts} />}
      </div>
    </PageContainer>

    /* 
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button variant="outline">
        <Eye size={24} />
        Click me
      </Button>

      <Button variant="outline" onClick={() => router.push("/login")}>
        Redireger vers la page login
      </Button>

      <Button
        variant="outline"
        onClick={() => router.push("/categories/react")}
      >
        Redireger vers la page categories react
      </Button> 
    </main>
    */
  );
}
