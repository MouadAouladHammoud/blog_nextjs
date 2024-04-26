import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

// http://localhost:3000/api/posts
/* 
export const GET = async () => {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
*/

// http://localhost:3000/api/posts?cat=react
export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const catSlug = searchParams.get("cat");

    const posts = await prisma.post.findMany({
      where: {
        ...(catSlug && catSlug != null && catSlug != "null" && catSlug != ""
          ? { catSlug }
          : {}),
      },
      include: {
        cat: true, // include the category in the post
      },
    });
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
