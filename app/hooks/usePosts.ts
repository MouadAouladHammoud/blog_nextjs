import { useQuery } from "react-query";
import axios from "axios";
import { Post } from "@prisma/client";

/*
export function usePosts() {
  return useQuery("posts", async () => {
    const { data } = await axios.get("/api/posts");
    return data;
  });
}
*/

export function usePosts(slug: string | null) {
  return useQuery("posts", async () => {
    const { data } = await axios.get(`/api/posts?cat=${slug}`);
    return data;
  });
}
