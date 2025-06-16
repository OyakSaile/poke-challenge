import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="relative w-48 h-48 mx-auto mb-6">
            <div className="absolute inset-0 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              <div className="text-6xl font-bold text-gray-400">404</div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Pokémon não encontrado!
          </h1>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Parece que este Pokémon fugiu para a natureza selvagem. Que tal
            voltar para a Pokédex e tentar encontrar outro?
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
              />
            </svg>
            Voltar para a Pokédex
          </Link>

          <div className="text-sm text-gray-500">
            Ou use a busca para encontrar um Pokémon específico
          </div>
        </div>

        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-3 h-3 bg-red-400 rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-3 h-3 bg-green-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
