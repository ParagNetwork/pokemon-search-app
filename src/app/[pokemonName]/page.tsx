"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface PokemonDetailsProps {
  pokemon: {
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
    abilities: { ability: { name: string } }[];
  };
}

export default function PokemonDetails() {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetailsProps["pokemon"] | null>(
    null
  );

  useEffect(() => {
    async function fetchPokemon() {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
      const data = await response.json();
      setPokemon(data);
    }
    fetchPokemon();
  }, [pokemonName]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link href="/">
          <span className="text-blue-500">&lt; Back</span>
        </Link>
        <span className="mx-2">/</span>
        <span>{pokemon.name}</span>
      </div>
      <div className="border p-4 rounded shadow bg-white">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-full h-32 object-contain"
        />
        <h2 className="text-center text-2xl mt-4 font-bold">{pokemon.name}</h2>
        <p className="mt-2">
          <strong>Type:</strong>{" "}
          {pokemon.types.map((t) => t.type.name).join(", ")}
        </p>
        <p className="mt-2">
          <strong>Stats:</strong>{" "}
          {pokemon.stats
            .map((s) => `${s.stat.name}: ${s.base_stat}`)
            .join(", ")}
        </p>
        <p className="mt-2">
          <strong>Abilities:</strong>{" "}
          {pokemon.abilities.map((a) => a.ability.name).join(", ")}
        </p>
      </div>
    </div>
  );
}
