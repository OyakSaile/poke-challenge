import { getPokemonDetailsAction } from "@/app/actions";
import { PokemonTypeBadge } from "@/components/ui/pokemon-type-badge";
import { PokemonStat } from "@/types/pokemon";
import {
  translatePokemonStat,
  capitalizeName,
  uiTranslations,
} from "@/utils/translations";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface PokemonDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PokemonDetailsPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const pokemon = await getPokemonDetailsAction(id);

    if (!pokemon) {
      return {
        title: "Pokémon não encontrado",
        description: "Este Pokémon não existe na nossa Pokédex",
      };
    }

    const capitalizedName = capitalizeName(pokemon.name);

    return {
      title: `${capitalizedName} (#${pokemon.id.toString().padStart(3, "0")})`,
      description: `Conheça ${capitalizedName}, um Pokémon do tipo ${pokemon.types.join(
        "/"
      )}. Altura: ${pokemon.height / 10}m, Peso: ${
        pokemon.weight / 10
      }kg. Veja estatísticas, habilidades e mais detalhes.`,
      openGraph: {
        title: `${capitalizedName} - Detalhes do Pokémon`,
        description: `${capitalizedName} é um Pokémon do tipo ${pokemon.types.join(
          "/"
        )}`,
        images: [
          {
            url: pokemon.image,
            width: 400,
            height: 400,
            alt: `Imagem de ${capitalizedName}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${capitalizedName} - Pokémon`,
        description: `${capitalizedName} é um Pokémon do tipo ${pokemon.types.join(
          "/"
        )}`,
        images: [pokemon.image],
      },
    };
  } catch {
    return {
      title: "Detalhes do Pokémon",
      description: "Veja informações detalhadas sobre este Pokémon",
    };
  }
}

export default async function PokemonDetailsPage({
  params,
}: PokemonDetailsPageProps) {
  try {
    const { id } = await params;
    const pokemon = await getPokemonDetailsAction(id);

    if (!pokemon) {
      notFound();
    }

    const capitalizedName = capitalizeName(pokemon.name);

    return (
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 md:mb-6"
        >
          <ChevronLeft className="w-4 h-4" />
          {uiTranslations.pokemon.backToPokedex}
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 md:p-8">
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
              <div className="flex-shrink-0 w-full md:w-auto">
                <div className="w-full md:w-64 h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Image
                    src={pokemon.image}
                    alt={capitalizedName}
                    width={200}
                    height={200}
                    className="object-contain w-full h-full max-w-[180px] md:max-w-[200px]"
                  />
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 md:mb-6">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold capitalize">
                    {capitalizedName}
                  </h1>
                  <span className="text-lg sm:text-xl md:text-2xl text-gray-500">
                    #{pokemon.id.toString().padStart(3, "0")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                  {pokemon.types.map((type: string) => (
                    <PokemonTypeBadge
                      key={type}
                      type={type}
                      variant="solid"
                      size="md"
                    />
                  ))}
                </div>

                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">
                    {uiTranslations.pokemon.baseStats}
                  </h3>
                  {pokemon.stats.map((stat: PokemonStat) => (
                    <div
                      key={stat.name}
                      className="flex items-center gap-3 md:gap-4"
                    >
                      <span className="w-20 md:w-24 text-xs md:text-sm font-medium text-gray-600 capitalize">
                        {translatePokemonStat(stat.name)}
                      </span>
                      <span className="w-8 md:w-12 text-xs md:text-sm font-bold">
                        {stat.value}
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              (stat.value / 255) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3 md:gap-4">
                  <div className="text-center md:text-left">
                    <span className="text-xs md:text-sm font-medium text-gray-600 block">
                      {uiTranslations.pokemon.height}
                    </span>
                    <p className="text-base md:text-lg font-semibold">
                      {pokemon.height / 10} {uiTranslations.units.meters}
                    </p>
                  </div>
                  <div className="text-center md:text-left">
                    <span className="text-xs md:text-sm font-medium text-gray-600 block">
                      {uiTranslations.pokemon.weight}
                    </span>
                    <p className="text-base md:text-lg font-semibold">
                      {pokemon.weight / 10} {uiTranslations.units.kilograms}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
