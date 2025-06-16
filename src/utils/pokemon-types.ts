export function getTypeColor(type: string): string {
  const typeColors: Record<string, string> = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    psychic: "bg-pink-500",
    ice: "bg-cyan-400",
    dragon: "bg-purple-600",
    dark: "bg-gray-800",
    fairy: "bg-pink-300",
    normal: "bg-gray-400",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    bug: "bg-green-600",
    rock: "bg-yellow-800",
    ghost: "bg-purple-700",
    steel: "bg-gray-500",
  };

  return typeColors[type.toLowerCase()] || "bg-gray-400";
}

export function getTypeColorLight(type: string): string {
  const typeColors: Record<string, string> = {
    fire: "bg-red-100 text-red-800",
    water: "bg-blue-100 text-blue-800",
    grass: "bg-green-100 text-green-800",
    electric: "bg-yellow-100 text-yellow-800",
    psychic: "bg-pink-100 text-pink-800",
    ice: "bg-cyan-100 text-cyan-800",
    dragon: "bg-purple-100 text-purple-800",
    dark: "bg-gray-100 text-gray-800",
    fairy: "bg-pink-100 text-pink-800",
    normal: "bg-gray-100 text-gray-800",
    fighting: "bg-red-100 text-red-800",
    poison: "bg-purple-100 text-purple-800",
    ground: "bg-yellow-100 text-yellow-800",
    flying: "bg-indigo-100 text-indigo-800",
    bug: "bg-green-100 text-green-800",
    rock: "bg-yellow-100 text-yellow-800",
    ghost: "bg-purple-100 text-purple-800",
    steel: "bg-gray-100 text-gray-800",
  };

  return typeColors[type.toLowerCase()] || "bg-gray-100 text-gray-800";
}
