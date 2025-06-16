import { PokemonDetailsWithStats } from "@/types/pokemon";

interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  stats: Array<{
    stat: {
      name: string;
    };
    base_stat: number;
  }>;
}

export const getPokemonDetailsAction = async (
  id: string
): Promise<PokemonDetailsWithStats> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data: PokemonApiResponse = await response.json();

  const image =
    data.sprites.other["official-artwork"].front_default ||
    data.sprites.front_default ||
    "/pokemon.png";

  const types = data.types.map((typeData) => typeData.type.name);

  const stats = data.stats.map((statData) => ({
    name: statData.stat.name,
    value: statData.base_stat,
  }));

  return {
    id: data.id,
    name: data.name,
    image,
    types,
    stats,
    height: data.height,
    weight: data.weight,
  };
};
