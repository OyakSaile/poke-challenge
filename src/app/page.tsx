import { PokemonCard } from "@/components/ui/pokemon-card";
import { Pagination } from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import { PokemonGridSkeleton } from "@/components/ui/skeleton";
import { getPokemonsAction } from "./actions/get-pokemons";
import { PokemonWithImage } from "@/types/pokemon";
import { Suspense } from "react";

interface HomePageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

async function PokemonList({ searchParams }: HomePageProps) {
  const { page, search } = await searchParams;
  const currentPage = Number(page) || 1;
  const searchQuery = search || "";

  const pokemonData = await getPokemonsAction({
    page: currentPage,
    search: searchQuery,
  });

  const pokemonList = pokemonData.results;
  const totalPages = pokemonData.totalPages;
  const hasResults = pokemonList.length > 0;
  const isSearching = searchQuery.length > 0;

  return (
    <>
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
    </>
  );
}

export default async function Home({ searchParams }: HomePageProps) {
  const { search } = await searchParams;
  const searchQuery = search || "";

  return (
    <div className="p-8">
      <div className="mb-6 w-full flex justify-center">
        <SearchInput
          className="max-w-[720px] w-full"
          defaultValue={searchQuery}
        />
      </div>

      <Suspense fallback={<PokemonGridSkeleton count={12} />}>
        <PokemonList searchParams={searchParams} />
      </Suspense>
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
