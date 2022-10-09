import useFetchPokemon from "../hooks/useFetchPokemon";
import "../css/pokemondetails.css";

const PokemonBody = (url) => {
  const { data, isPending, error } = useFetchPokemon(url.pokemon);

  const getText = () => {
    let i = 0;
    while (data.flavor_text_entries.at(i).language.name !== "en") {
      i = i + 1;
    }
    return data.flavor_text_entries.at(i).flavor_text;
  };

  return (
    <div className="pd-body">
      <span>Description</span>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && <p>{getText()}</p>}
    </div>
  );
};

export default PokemonBody;
