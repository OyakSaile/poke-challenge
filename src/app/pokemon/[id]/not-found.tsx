import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function PokemonNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 bg-red-200 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center border-4 border-red-300">
              <div className="text-4xl">❌</div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Este Pokémon não existe!
          </h1>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Parece que você está procurando por um Pokémon que não está na nossa
            Pokédex. Verifique o número ou nome e tente novamente.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Voltar para a Pokédex
          </Link>

          <div className="text-sm text-gray-500">
            Explore todos os Pokémon disponíveis na nossa coleção
          </div>
        </div>

        <div className="mt-12">
          <div className="text-xs text-gray-400 mb-4">
            Pokémon mais populares:
          </div>
          <div className="flex justify-center space-x-4">
            <Link
              href="/pokemon/1"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              #001 Bulbasaur
            </Link>
            <Link
              href="/pokemon/4"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              #004 Charmander
            </Link>
            <Link
              href="/pokemon/7"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              #007 Squirtle
            </Link>
            <Link
              href="/pokemon/25"
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              #025 Pikachu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
