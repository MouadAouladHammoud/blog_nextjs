import { Category } from "@/type";
import { CATEGORIES } from "@/utils/categories";
import { NextResponse } from "next/server";
import prisma from "@/lib/connect";

// localhost:3000/api/categories
export const GET = async () => {
  // return NextResponse.json(CATEGORIES, { status: 200 });
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
};
