import useFetchPokemon from "./useFetchPokemon";

const PokemonBody = (pokemon) => {
  const {
    data: body,
    isPending,
    error,
  } = useFetchPokemon(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemon.pokemon.order}`
  );

  const getText = () => {
    let i = 0;
    while (body.flavor_text_entries.at(i).language.name !== "en") {
      i = i + 1;
    }

    return body.flavor_text_entries.at(i).flavor_text;
  };

  return <div>{body && <p>{getText()}</p>}</div>;
};

export default PokemonBody;