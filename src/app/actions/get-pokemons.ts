import {
  GetPokemonsResponse,
  PokemonDetails,
  PokemonWithImage,
} from "@/types/pokemon";

interface GetPokemonsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const getPokemonsAction = async (
  params: GetPokemonsParams = {}
): Promise<{
  results: PokemonWithImage[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}> => {
  const { page = 1, limit = 40, search } = params;
  const offset = (page - 1) * limit;

  if (search) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=1000`
    );
    const data: GetPokemonsResponse = await response.json();

    const filtered = data.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    const paginatedFiltered = filtered.slice(offset, offset + limit);

    const pokemonWithImages = await Promise.all(
      paginatedFiltered.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url);
        const details: PokemonDetails = await detailResponse.json();

        const image =
          details.sprites.other["official-artwork"].front_default ||
          details.sprites.front_default ||
          "/pokemon.png";

        const primaryType = details.types[0]?.type.name || "unknown";

        return {
          id: details.id,
          name: details.name,
          image,
          type: primaryType,
        };
      })
    );

    return {
      results: pokemonWithImages,
      totalCount: filtered.length,
      currentPage: page,
      totalPages: Math.ceil(filtered.length / limit),
      hasNext: offset + limit < filtered.length,
      hasPrevious: page > 1,
    };
  }

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data: GetPokemonsResponse = await response.json();

  const pokemonWithImages = await Promise.all(
    data.results.map(async (pokemon) => {
      const detailResponse = await fetch(pokemon.url);
      const details: PokemonDetails = await detailResponse.json();

      const image =
        details.sprites.other["official-artwork"].front_default ||
        details.sprites.front_default ||
        "/pokemon.png";

      const primaryType = details.types[0]?.type.name || "unknown";

      return {
        id: details.id,
        name: details.name,
        image,
        type: primaryType,
      };
    })
  );

  const totalCount = data.count;
  const totalPages = Math.ceil(totalCount / limit);

  return {
    results: pokemonWithImages,
    totalCount,
    currentPage: page,
    totalPages,
    hasNext: data.next !== null,
    hasPrevious: data.previous !== null,
  };
};
