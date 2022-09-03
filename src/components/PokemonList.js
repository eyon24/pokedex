import "../css/pokemonList.css";
import { useState } from "react";

const PokemonList = ({ pokemon }) => {
  const [search, setSearch] = useState("");
  return (
    <div className="pokemon-list-page">
      <div className="search-container">
        <input
          className="search"
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="pokemon-list">
        {pokemon
          .filter((val) => {
            if (search === "") {
              return val;
            } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
              return val;
            } else if (val.id === parseInt(search)) {
              return val;
            }
          })
          .map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <span className="pokemon-number">#{pokemon.id}</span>
              <img src={pokemon.sprites.front_default} alt={pokemon.name}></img>
              <h3 className="pokemon-name">{pokemon.name}</h3>
              <div className="types">
                {pokemon.types.map((type) => (
                  <p key={`${pokemon.name}${type.type.name}`}>
                    {type.type.name}
                  </p>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PokemonList;
