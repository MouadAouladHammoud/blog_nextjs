import axios from "axios";
import { useQuery } from "react-query";

export const useComments = (slug: string) => {
  return useQuery(
    ["comments", slug],
    async () => {
      const { data } = await axios.get(`/api/comments?slug=${slug}`);
      return data;
    },
    {
      refetchOnWindowFocus: false, // Empêche la requête de se relancer automatiquement lorsque la page reprend le focus
      // refetchOnMount: false, // Empêche la requête de se relancer lorsque le composant est remonté
      retry: 0, // Désactive la tentative de relance automatique de la requête en cas d'échec

      // cacheTime: Il détermine la période pendant laquelle les données sont conservées en cache, ce qui permet aux composants d'accéder rapidement aux données précédemment récupérées avant de décider s'il est nécessaire de récupérer de nouvelles données depuis le serveur.
      // staleTime: Cette option contrôle si les données doivent être rafraîchies depuis le serveur ou non. Si les données sont considérées comme obsolètes, cela signifie qu'elles ne sont plus fraîches et doivent être mises à jour. Dans ce cas, une nouvelle requête est effectuée vers le serveur pour récupérer les données les plus récentes, qui seront ensuite mises à jour dans le cache.

      cacheTime: 100000, // Définit le temps de mise en cache des données inactives à 100000 millisecondes
      staleTime: 50000, // Les données restent fraîches pendant 50000 millisecondes avant de devenir obsolètes

      // refetchInterval: 2000, // Relance la requête toutes les 2000 millisecondes
      // refetchIntervalInBackground: true, // Permet la relance de la requête même si l'application est en arrière-plan
    }
  );
};
