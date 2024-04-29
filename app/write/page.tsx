"use client";

/*
// Gestion de l'accès aux application en utilisant "useSession": [Methode:1] (client session)
import { useSession } from "next-auth/react";

export default function WritePage() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticted, handle it here.
      console.log("Not Logged In!");
    },
  });

  if (status === "loading") {
    return <div>Loading or Unauthenticated</div>;
  }
  return <div>Page write</div>;
}
*/

/*
// Gestion de l'accès aux application en utilisant "getServerSession": [Methode:2] (server session)
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";

export default async function WritePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
    // redirect('/api/auth/signin')
  }
  return <div>Page write</div>;
}
*/

import PageContainer from "@/components/page-container";
import PageTitle from "@/components/page-title";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { SyntheticEvent, useState } from "react";
import { useCateogories } from "@/app/hooks/useCategories";
import { Category, Post } from "@prisma/client";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Button } from "@/components/ui/button";
import { useMutation } from "react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Gestion de l'accès aux application en utilisant le fichier middleware: [Methode:3] (middleware.ts)
export default function WritePage() {
  const router = useRouter();

  const { data: categories, isFetching: isCategoriesFetching } =
    useCateogories();

  const createPost = (newPost: Partial<Post>) =>
    axios.post("/api/posts", newPost).then((res) => res.data);

  const { mutate, isLoading } = useMutation(createPost, {
    onSuccess: (data: Post) => {
      alert("Post has been successfully created");
      router.push(`/posts/${data.slug}`);
    },
    onError: (error) => {
      alert("Error: Something went wrong");
      console.log("error", error);
    },
  });

  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imageObjectUrl, setImageObjectUrl] = useState<string | null>(null);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!title || !content || !catSlug) {
      alert("Please fill all the fields");
      return;
    }

    const image = await uploadImage();
    if (!image) {
      alert("Image is required");
      return;
    }

    await mutate({
      title,
      content,
      catSlug,
      slug: title.replace(/\s+/g, "-").toLowerCase(),
      image,
    });
  };

  const onChangeFile = (e: SyntheticEvent) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files || !files[0]) {
      return;
    }
    setFile(files[0]);
    setImageObjectUrl(URL.createObjectURL(files[0]));
  };

  const uploadImage = async () => {
    try {
      if (!file) {
        return;
      }

      const formData = new FormData();
      formData.set("file", file);
      const response = await axios.post("/api/upload", formData);
      return response.data; // /images/123456789_nameImage.jpg
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageContainer>
      <div className="p-10">
        <PageTitle title="Write a Post" />

        {/* Image */}
        <div className="py-6">
          {imageObjectUrl && (
            <div className="relative w-40 h-40 mx-auto mb-2">
              <Image src={imageObjectUrl} alt={title} fill />
            </div>
          )}
          <Input type="file" onChange={onChangeFile} />
        </div>

        {/* Title */}
        <Input
          placeholder="Title"
          type="text"
          className="mb-6"
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Category */}
        {isCategoriesFetching ? (
          <p>Loading...</p>
        ) : (
          <Select onValueChange={(value) => setCatSlug(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category: Category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Content */}
        <ReactQuill
          className="mt-6"
          placeholder="Content..."
          value={content}
          onChange={setContent}
        />

        {/* Submit button */}
        <Button disabled={isLoading} className="mt-6" onClick={handleSubmit}>
          Publish
        </Button>
      </div>
    </PageContainer>
  );
}
