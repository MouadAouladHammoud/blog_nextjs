import { NextResponse } from "next/server";
import { POSTS } from "@/utils/posts";
import prisma from "@/lib/connect";

// Get single Post
// localhost:3000/api/posts/react-js
export const GET = async (
  req: Request,
  { params }: { params: { slug: string } }
) => {
  try {
    // return NextResponse.json(POSTS[0], { status: 200 });
    const { slug } = params;
    /*
    const post = await prisma.post.findUnique({
      where: {
        slug,
      },
    });
    */

    const post = await prisma.post.update({
      where: {
        slug,
      },
      data: {
        view: {
          increment: 1,
        },
      },
    });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
};
