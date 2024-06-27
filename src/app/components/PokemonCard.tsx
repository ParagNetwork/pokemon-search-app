import Link from 'next/link';

interface PokemonCardProps {
  pokemon: {
    name: string;
    image: string;
  };
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <img src={pokemon.image} alt={pokemon.name} className="w-full h-32 object-contain" />
      <h3 className="text-center mt-2 font-bold">{pokemon.name}</h3>
      <Link href={`/${pokemon.name}`}>
        <div className="block mt-2 text-center text-blue-500">Details →</div>
      </Link>
    </div>
  );
}
