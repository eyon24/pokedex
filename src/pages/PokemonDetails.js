import { useState } from "react";
import { useParams } from "react-router-dom";
import PokemonBody from "../components/PokemonBody";
import useFetchPokemon from "../hooks/useFetchPokemon";
import "../css/pokemondetails.css";

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
        <div className="pd-container">
          <div className="pd-intro">
            <h1>
              {pokemon.name}
              <span>#{pokemon.id}</span>
            </h1>
            <div className="pd-images">
              <div className="pd-img-container">
                {!shinyVisible && (
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                )}
                {shinyVisible && (
                  <img src={pokemon.sprites.front_shiny} alt={pokemon.name} />
                )}
              </div>
              <button onClick={handleToggle}>
                {shinyVisible ? "Show Default" : "Show Shiny"}
              </button>
            </div>
            <div className="pd-types">
              <span id="title">Type</span>
              <div className="pd-type-list">
                {pokemon.types.map((type) => (
                  <span key={type.type.name}>{type.type.name}</span>
                ))}
              </div>
            </div>
          </div>
          <PokemonBody className="pd-body" pokemon={pokemon.species.url} />
          <div className="pd-stats">
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
