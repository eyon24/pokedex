import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadMore, setLoadMore] = useState(url);

  const getData = async () => {
    try {
      const response = await fetch(loadMore);
      const data = await response.json();

      setLoadMore(data.next);

      function getPokemon(results) {
        results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();

          setPokemon((currentList) => [...currentList, data]);
          setIsLoading(false);
          setError(null);
        });
      }

      console.log(data.results);
      await getPokemon(data.results);
    } catch (err) {
      if (err.name == "AbortError") {
        console.log("Aborted");
      } else {
        setIsLoading(false);
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    getData();
  }, [url]);

  console.log(pokemon);
  return { pokemon, isLoading, error };
};

export default useFetch;
