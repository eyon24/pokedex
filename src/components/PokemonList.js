import "../css/pokemonList.css";
import { Link } from "react-router-dom";

const PokemonList = ({ pokemon }) => {
  return (
    <div className="pokemon-list-page">
      <div className="pokemon-list">
        {pokemon.map((pokemon) => (
          <Link
            className="pokemon-link"
            key={pokemon.id}
            to={`/${pokemon.name}`}
          >
            <div className="pokemon-card">
              <span className="pokemon-number">#{pokemon.id}</span>
              <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              <h3 className="pokemon-name">{pokemon.name}</h3>
              <div className="types">
                {pokemon.types.map((type) => (
                  <p className="type" key={`${pokemon.name}${type.type.name}`}>
                    {type.type.name}
                  </p>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
