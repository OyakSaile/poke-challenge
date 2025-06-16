export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  other: {
    "official-artwork": {
      front_default: string | null;
    };
  };
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

export interface PokemonWithImage {
  id: number;
  name: string;
  image: string;
  type: string;
}

export interface PokemonStat {
  name: string;
  value: number;
}

export interface PokemonDetailsWithStats {
  id: number;
  name: string;
  image: string;
  types: string[];
  stats: PokemonStat[];
  height: number;
  weight: number;
}

export interface GetPokemonsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
