export type PokemonListType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: pokemonAttribut[];
};

export type pokemonAttribut = {
  name: string;
  url: string;
};
