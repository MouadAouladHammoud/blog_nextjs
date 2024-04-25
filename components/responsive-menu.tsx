import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import { CATEGORIES } from "@/utils/categories";
import { Category } from "@/type";

export default function ResponsiveMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-6 w-6 md:hidden" />
      </SheetTrigger>

      <SheetContent side="left">
        <div className="flex flex-col gap-4">
          <Link href="/write">
            <Button variant="ghost">Write a Post</Button>
          </Link>

          <p>Cateories</p>
          {CATEGORIES.map((category: Category) => (
            <Link
              className="block px-2 py-1 text-lg"
              key={category.id}
              href={`/categories/${category.slug}`}
            >
              <Button variant="ghost">{category.name}</Button>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
