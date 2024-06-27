'use client';
import { useState } from 'react';
import SearchForm from '../app/components/SearchForm';
import PokemonCard from '../app/components/PokemonCard';
import Image from 'next/image';

interface Pokemon {
  name: string;
  url: string;
}

interface DetailedPokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

export default function Home() {
  const [pokemonList, setPokemonList] = useState<DetailedPokemon[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (type: string, searchTerm: string) => {
    setLoading(true);
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
    const response = await fetch(url);
    const data = await response.json();

    const promises = data.results.map(async (pokemon: Pokemon) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();
      return details;
    });

    const results = await Promise.all(promises);

    const filteredData = results.filter(pokemon => 
      // (type ? pokemon.types.map(t => t.type.name).includes(type) : true) && 
      (searchTerm ? pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
    );

    setPokemonList(results);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl mb-4 font-bold">Pokémon Search</h1>
      <SearchForm onSearch={handleSearch} />
      {loading ? (
         <div className="loader-design">
         <Image unoptimized height={0} width={0}  src='/assets/next.svg' alt="LoaderImage" />
       </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={{
              name: pokemon.name,
              image: pokemon.sprites.front_default,
            }} />
          ))}
        </div>
      )}
  
    </div>
  );
}
