import { useQuery } from "react-query";
import axios from "axios";
import { Category } from "@prisma/client";

export function useCateogories() {
  return useQuery(
    "categories",
    async () => {
      const { data } = await axios.get("/api/categories");
      return data;
    },
    {
      refetchOnWindowFocus: false, // Empêche la requête de se relancer automatiquement lorsque la page reprend le focus
      // refetchOnMount: false, // Empêche la requête de se relancer lorsque le composant est remonté
      retry: 0, // Désactive la tentative de relance automatique de la requête en cas d'échec

      // cacheTime: Il détermine la période pendant laquelle les données sont conservées en cache, ce qui permet aux composants d'accéder rapidement aux données précédemment récupérées avant de décider s'il est nécessaire de récupérer de nouvelles données depuis le serveur.
      // staleTime: Cette option contrôle si les données doivent être rafraîchies depuis le serveur ou non. Si les données sont considérées comme obsolètes, cela signifie qu'elles ne sont plus fraîches et doivent être mises à jour. Dans ce cas, une nouvelle requête est effectuée vers le serveur pour récupérer les données les plus récentes, qui seront ensuite mises à jour dans le cache.

      cacheTime: Infinity, // Les données restent en cache indéfiniment
      staleTime: 50000, // Les données restent fraîches pendant 50000 millisecondes avant de devenir obsolètes
      select: (data) => {
        // Transforme les données ici avant qu'elles atteignent le composant
        // NB: on ne peut pas mettre des fonctions de promesse ici
        return data.map((category: Category) => {
          return { ...category, name: category.title.toUpperCase() };
        });
      },
      // refetchInterval: 2000, // Relance la requête toutes les 2000 millisecondes
      // refetchIntervalInBackground: true, // Permet la relance de la requête même si l'application est en arrière-plan
    }
  );
}
