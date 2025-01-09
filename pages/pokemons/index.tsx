"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    fetch(
      `https://nestjs-pokedex-api.vercel.app/pokemons?limit=${limit}&offset=${offset}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPokemons(data);
        } else {
          console.error("erreur API", data);
        }
      })
      .catch((error) => {
        console.error("erreur récup des données", error);
      });
  }, [limit, offset]);

  return (
    <div className="container p-4">
      <div className="filters">
        <input type="text" placeholder="Search" className="search-input" />
        <select className="filter-dropdown">
          <option value="">All Types</option>
          {}
        </select>
        <select
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value))}
          className="filter-dropdown"
        >
          <option value={10}>10 Pokémon</option>
          <option value={20}>20 Pokémon</option>
          <option value={50}>50 Pokémon</option>
          <option value={100}>100 Pokémon</option>
        </select>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {pokemons.map((pokemon) => (
          <div key={pokemon.pokedexId} className="card">
            <Link href={`/pokemons/${pokemon.pokedexId}`}>
              <p className="pokemon-id">#{pokemon.pokedexId}</p>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="pokemon-image"
              />
              <h2 className="pokemon-name">{pokemon.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
