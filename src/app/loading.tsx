import { PokemonGridSkeleton } from "@/components/ui/skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-8">
      <div className="mb-6 w-full flex justify-center">
        <Skeleton className="max-w-[720px] w-full h-14 rounded-full" />
      </div>

      <PokemonGridSkeleton count={12} />
    </div>
  );
}
