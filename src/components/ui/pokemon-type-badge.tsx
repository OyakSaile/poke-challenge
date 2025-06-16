import { getTypeColor, getTypeColorLight } from "@/utils/pokemon-types";

interface PokemonTypeBadgeProps {
  type: string;
  variant?: "solid" | "light";
  size?: "sm" | "md";
}

export function PokemonTypeBadge({
  type,
  variant = "light",
  size = "sm",
}: PokemonTypeBadgeProps) {
  const sizeStyles = size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-2 text-sm";
  const colorStyles =
    variant === "solid"
      ? `${getTypeColor(type)} text-white`
      : getTypeColorLight(type);

  return (
    <span
      className={`rounded-full font-medium capitalize ${sizeStyles} ${colorStyles}`}
    >
      {type}
    </span>
  );
}
