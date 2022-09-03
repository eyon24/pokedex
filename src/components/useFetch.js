import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadMore, setLoadMore] = useState(url);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then(async (res) => {
        if (!res.ok) {
          setError("Could not fetch data");
          setError(true);
          setIsLoading(false);
        } else {
          return await res.json();
        }
      })
      .then(async (data) => {
        await data.results.forEach(async (pokemon) => {
          fetch(pokemon.url, { signal: abortCont.signal })
            .then(async (res) => {
              if (!res.ok) {
                setError("Could not fetch pokemon data");
                setError(true);
                setIsLoading(false);
              } else {
                return await res.json();
              }
            })
            .then(async (data) => {
              setPokemon((currentList) => [...currentList, data]);
              setIsLoading(false);
              setError(null);
            });
        });
      });

    return () => abortCont.abort();
  }, [url]);

  return { pokemon, isLoading, error };
};

export default useFetch;
