import useFetch from "./useFetch";
import PokemonList from "./PokemonList";

const Home = () => {
  const { pokemon, isLoading, error } = useFetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  return (
    <div className="wrapper">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {pokemon && <PokemonList pokemon={pokemon} />}
    </div>
  );
};

export default Home;
