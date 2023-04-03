import PokemonList from "../components/PokemonList";
import Search from "../components/Search";
import { useEffect, useState } from "react";
import "../css/home.css";

const Home = () => {
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const handleNext = () => {
    setUrl(next);
    setIsLoading(true);
  };

  const handlePrev = () => {
    setUrl(prev);
    setIsLoading(true);
  };

  async function getPokemon() {
    setPokemon([]);
    const response = await fetch(url);
    if (!response.ok) {
      setError("Could not fetch data.");
      setIsLoading(false);
    }
    const data = await response.json();
    setNext(data.next);
    setPrev(data.previous);
    await data.results.forEach(async (pokemon) => {
      await getPokemonData(pokemon);
    });
    setIsLoading(false);
  }

  async function getPokemonData(pokemon) {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    setPokemon((currentList) => [...currentList, data]);
    return data;
  }

  useEffect(() => {
    getPokemon();
  }, [url]);

  return (
    <div className="wrapper">
      <Search />
      <div className="next-prev-buttons">
        <div className="prev">
          {prev && (
            <button className="n-p-button" onClick={handlePrev}>
              Previous
            </button>
          )}
        </div>
        <div className="next">
          {next && (
            <button className="n-p-button" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      {isLoading && <div className="loading">Loading...</div>}
      {pokemon && <PokemonList pokemon={pokemon} />}
    </div>
  );
};

export default Home;
