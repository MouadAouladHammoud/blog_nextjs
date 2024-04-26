import { useQuery } from "react-query";
import axios from "axios";

export function useCateogories() {
  return useQuery("categories", async () => {
    const { data } = await axios.get("/api/categories");
    return data;
  });
}
