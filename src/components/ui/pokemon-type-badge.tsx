import { translatePokemonType } from "@/utils/translations";

interface PokemonTypeBadgeProps {
  type: string;
  variant?: "solid" | "outline";
  size?: "sm" | "md" | "lg";
}

const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-800",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-800",
  steel: "bg-gray-500",
  fairy: "bg-pink-300",
};

const sizeClasses = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-2 text-base",
};

export function PokemonTypeBadge({
  type,
  variant = "solid",
  size = "md",
}: PokemonTypeBadgeProps) {
  const translatedType = translatePokemonType(type);
  const baseColor = typeColors[type.toLowerCase()] || "bg-gray-400";
  const sizeClass = sizeClasses[size];

  if (variant === "outline") {
    const outlineColor = baseColor
      .replace("bg-", "border-")
      .replace("bg-", "text-");
    return (
      <span
        className={`inline-flex items-center rounded-full border-2 ${outlineColor} bg-transparent font-medium ${sizeClass}`}
      >
        {translatedType}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full ${baseColor} text-white font-medium ${sizeClass}`}
    >
      {translatedType}
    </span>
  );
}
