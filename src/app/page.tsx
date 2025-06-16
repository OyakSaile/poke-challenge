import { PokemonCard } from "@/components/ui/pokemon-card";
import { Pagination } from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import { getPokemonsAction } from "./actions/get-pokemons";
import { PokemonWithImage } from "@/types/pokemon";

interface HomePageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const searchQuery = searchParams.search || "";

  const pokemonData = await getPokemonsAction({
    page: currentPage,
    search: searchQuery,
  });

  const pokemonList = pokemonData.results;
  const totalPages = pokemonData.totalPages;
  const hasResults = pokemonList.length > 0;
  const isSearching = searchQuery.length > 0;

  return (
    <div className="p-8">
      <div className="mb-6">
        <SearchInput
          placeholder="Search Pokémon by name..."
          className="max-w-md"
          defaultValue={searchQuery}
        />
      </div>

      {hasResults && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {pokemonList.map((pokemon: PokemonWithImage) => (
            <PokemonCard
              id={pokemon.id}
              key={pokemon.id}
              name={pokemon.name}
              type={pokemon.type}
              image={pokemon.image}
            />
          ))}
        </div>
      )}

      {!hasResults && (
        <EmptyState isSearching={isSearching} searchQuery={searchQuery} />
      )}

      {hasResults && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}

function EmptyState({
  isSearching,
  searchQuery,
}: {
  isSearching: boolean;
  searchQuery: string;
}) {
  const title = "No Pokémon found";
  const message = isSearching
    ? `No results for "${searchQuery}"`
    : "Try adjusting your search";

  return (
    <div className="text-center py-12">
      <div className="text-gray-400 text-lg mb-2">{title}</div>
      <div className="text-gray-500 text-sm">{message}</div>
    </div>
  );
}
