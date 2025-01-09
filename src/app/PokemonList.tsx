"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchGeneration, setSearchGeneration] = useState("");
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    fetch(
      `https://nestjs-pokedex-api.vercel.app/pokemons?limit=${limit}&offset=${offset}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPokemons((prev) =>
            [...prev, ...data].filter(
              (pokemon, index, self) =>
                self.findIndex((p) => p.pokedexId === pokemon.pokedexId) ===
                index
            )
          );
        } else {
          console.error("erreur api :", data);
        }
      })
      .catch((error) => console.error("erreur récup des données :", error));
  }, [offset, limit]);

  useEffect(() => {
    setFilteredPokemons(
      pokemons.filter((pokemon) => {
        const matchesName = pokemon.name
          .toLowerCase()
          .includes(searchName.toLowerCase());
        const matchesType = searchType
          ? pokemon.types.some(
              (type) => type.name.toLowerCase() === searchType.toLowerCase()
            )
          : true;
        const matchesGeneration = searchGeneration
          ? pokemon.generation === parseInt(searchGeneration)
          : true;

        return matchesName && matchesType && matchesGeneration;
      })
    );
  }, [searchName, searchType, searchGeneration, pokemons]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      setOffset((prev) => prev + limit);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [limit]);

  return (
    <div className="container">
      <div className="filters">
        <input
          type="text"
          placeholder="Rechercher par nom"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="">Tous les types</option>
          {[
            ...new Set(
              pokemons.flatMap((pokemon) =>
                pokemon.types.map((type) => type.name)
              )
            ),
          ]
            .sort()
            .map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
        </select>
        <select
          value={searchGeneration}
          onChange={(e) => setSearchGeneration(e.target.value)}
        >
          <option value="">Toutes les générations</option>
          {[...new Set(pokemons.map((pokemon) => pokemon.generation))]
            .sort((a, b) => a - b)
            .map((generation) => (
              <option key={generation} value={generation}>
                Génération {generation}
              </option>
            ))}
        </select>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(parseInt(e.target.value));
            setOffset(0);
            setPokemons([]);
          }}
        >
          <option value={10}>10 Pokémon</option>
          <option value={20}>20 Pokémon</option>
          <option value={50}>50 Pokémon</option>
          <option value={100}>100 Pokémon</option>
        </select>
      </div>

      <div className="grid grid-cols-8 gap-6">
        {filteredPokemons.map((pokemon) => (
          <div key={pokemon.pokedexId} className="card">
            <p className="pokemon-id">#{pokemon.pokedexId}</p>
            <Link href={`/pokemons/${pokemon.pokedexId}`}>
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="pokemon-image"
              />
            </Link>
            <h2 className="pokemon-name">{pokemon.name}</h2>
            <div className="type-container">
              {pokemon.types.map((type) => (
                <img
                  key={type.id}
                  src={type.image}
                  alt={type.name}
                  className="type-image"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
