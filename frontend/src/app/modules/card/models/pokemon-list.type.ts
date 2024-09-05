export interface PokemonListType {
  count: number;
  next: string | null;
  previous: string | null;
  results: pokemonAttribut[];
}

export interface pokemonAttribut {
  name: string;
  url: string;
}
