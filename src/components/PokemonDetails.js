import { useState } from "react";
import { useParams } from "react-router-dom";
import PokemonBody from "./PokemonBody";
import useFetchPokemon from "./useFetchPokemon";

const PokemonDetails = () => {
  const { name } = useParams();
  const [shinyVisible, setShinyVisible] = useState(false);

  const {
    data: pokemon,
    isPending,
    error,
  } = useFetchPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`);

  const handleToggle = () => {
    setShinyVisible(!shinyVisible);
  };

  return (
    <div className="pokemon-details-page">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {pokemon && (
        <div className="pokemon-details-container">
          <div className="pokemon-details-intro">
            <h1>{pokemon.name}</h1>
            <span>{pokemon.id}</span>
            <div className="pokemon-details-types">
              {pokemon.types.map((type) => (
                <span key={type.type.name}>{type.type.name}</span>
              ))}
            </div>
            {!shinyVisible && (
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            )}
            {shinyVisible && (
              <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
            )}
            <button onClick={handleToggle}>
              {shinyVisible ? "Show Default" : "Show Shiny"}
            </button>
          </div>
          <PokemonBody pokemon={pokemon} />
          <div className="pokemon-details-stats">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name}>
                <span>
                  Base {stat.stat.name}:{stat.base_stat}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
