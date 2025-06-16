import Image from "next/image";
import Link from "next/link";
import { PokemonTypeBadge } from "./pokemon-type-badge";
import { capitalizeName } from "@/utils/translations";

interface PokemonCardProps {
  id: number;
  name: string;
  type: string;
  image: string;
}

export function PokemonCard({ id, name, type, image }: PokemonCardProps) {
  const formattedId = id.toString().padStart(3, "0");
  const detailPageUrl = `/pokemon/${id}`;
  const capitalizedName = capitalizeName(name);

  return (
    <Link href={detailPageUrl} className="block group">
      <div className="bg-[#F0F3FF] rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 group-hover:scale-105">
        <div className="flex justify-between items-center mb-3">
          <PokemonTypeBadge type={type} variant="solid" size="sm" />
          <span className="text-gray-500 font-medium text-sm">
            #{formattedId}
          </span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 flex items-center justify-center">
            <Image
              src={image}
              alt={capitalizedName}
              width={80}
              height={80}
              className="object-contain group-hover:scale-110 transition-transform duration-200"
            />
          </div>
          <h2 className="font-semibold text-gray-800 capitalize text-center">
            {capitalizedName}
          </h2>
        </div>
      </div>
    </Link>
  );
}
