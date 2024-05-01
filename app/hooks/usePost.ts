import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { Post } from "@prisma/client";

const getPostBySlug = async (slug: string) => {
  // NB: ici on a pas besoin de mettre try & catch car "useQuery" est capable de gérer automatiquement les erreurs
  const { data } = await axios.get(`/api/posts/${slug}`);
  return data as Post;
};

export function usePost(slug: string) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug,

    // cacheTime: Il détermine la période pendant laquelle les données sont conservées en cache, ce qui permet aux composants d'accéder rapidement aux données précédemment récupérées avant de décider s'il est nécessaire de récupérer de nouvelles données depuis le serveur.
    // staleTime: Cette option contrôle si les données doivent être rafraîchies depuis le serveur ou non. Si les données sont considérées comme obsolètes, cela signifie qu'elles ne sont plus fraîches et doivent être mises à jour. Dans ce cas, une nouvelle requête est effectuée vers le serveur pour récupérer les données les plus récentes, qui seront ensuite mises à jour dans le cache.

    cacheTime: 100000, // Définit le temps de mise en cache des données inactives à 100000 millisecondes
    staleTime: 50000, // Les données restent fraîches pendant 50000 millisecondes avant de devenir obsolètes
  });
}

/*
export function usePost(slug: string) {
  const queryClient = useQueryClient();
  return useQuery(["post", slug], {
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug, // Active la requête seulement si slug n'est pas nul
    staleTime: 50000, // Les données restent fraîches pendant 50000 millisecondes avant de devenir obsolètes

    initialData: () => {
      // il s'agit de récupérer les données de post du cache, mais si le post n'est pas dans le cache, on retourne null
      // De cette manière, si tu accèdes directement à un post via l'URL du navigateur sans passer par la page d'accueil, tu risques de rencontrer une erreur. Cela s'explique par le fait que le post n'est pas encore présent dans le cache.
      // NB: Les posts sont initialisés et stockés dans le cache lors du chargement de la page d'accueil

      // const post_: Post = {
      //   id: "00123",
      //   createdAt: new Date(),
      //   title: "test title",
      //   slug: "test-slug",
      //   content: "<p>test content</p>",
      //   image: null,
      //   view: 12,
      //   nbComments: 12,
      //   catSlug: "category-slug",
      //   userEmail: "test@test.com",
      // };
      // return post_;

      const posts = (queryClient.getQueryData(["posts", null]) as Post[]) || [];
      const post = posts?.find((post) => post.slug === slug);
      return post;
    },
  });
}
*/
