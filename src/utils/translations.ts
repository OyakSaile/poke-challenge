export const pokemonTypeTranslations: Record<string, string> = {
  normal: "Normal",
  fire: "Fogo",
  water: "Água",
  electric: "Elétrico",
  grass: "Planta",
  ice: "Gelo",
  fighting: "Lutador",
  poison: "Venenoso",
  ground: "Terra",
  flying: "Voador",
  psychic: "Psíquico",
  bug: "Inseto",
  rock: "Pedra",
  ghost: "Fantasma",
  dragon: "Dragão",
  dark: "Sombrio",
  steel: "Aço",
  fairy: "Fada",
};

export const pokemonStatTranslations: Record<string, string> = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defesa",
  "special-attack": "Ataque Especial",
  "special-defense": "Defesa Especial",
  speed: "Velocidade",
};

export const uiTranslations = {
  search: {
    placeholder: "Faça uma busca pelo nome do pokémon",
    noResults: "Nenhum Pokémon encontrado",
    noResultsFor: "Nenhum resultado para",
    tryAdjusting: "Tente ajustar sua busca",
  },
  pokemon: {
    height: "Altura",
    weight: "Peso",
    baseStats: "Atributos Base",
    backToPokedex: "Voltar para a Pokédex",
  },
  pagination: {
    previous: "Anterior",
    next: "Próximo",
  },
  units: {
    meters: "m",
    kilograms: "kg",
  },
};

// Helper functions
export function translatePokemonType(type: string): string {
  return pokemonTypeTranslations[type.toLowerCase()] || type;
}

export function translatePokemonStat(stat: string): string {
  return pokemonStatTranslations[stat.toLowerCase()] || stat;
}

export function capitalizeName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
