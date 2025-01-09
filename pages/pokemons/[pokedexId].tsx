"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function PokemonDetails() {
  const router = useRouter();
  const { pokedexId } = router.query;
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pokedexId) {
      const fetchPokemon = async () => {
        try {
          const response = await fetch(
            `https://nestjs-pokedex-api.vercel.app/pokemons/${pokedexId}`
          );
          if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
          }
          const data = await response.json();
          setPokemon(data);
        } catch (error) {
          setError("Erreur de récupération des données");
          console.error("Erreur de récupération des données", error);
        }
      };

      fetchPokemon();
    }
  }, [pokedexId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!pokemon) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container p-4">
      <button onClick={() => router.back()} className="back-button mb-4">
        Retour
      </button>
      <div className="pokemon-details">
        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
        <div className="pokemon-info">
          <h2 className="pokemon-name">{pokemon.name}</h2>
          <p className="pokemon-id">#{pokemon.pokedexId}</p>
          <section>
            <h3 className="section-title">Détails</h3>
            <div className="stats">
              {Object.entries(pokemon.stats).map(([key, value]) => (
                <div key={key} className="stat">
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </div>
            <h4 className="section-title">Types</h4>
            <div className="types">
              {pokemon.types.map((type) => (
                <img
                  key={type.id}
                  src={type.image}
                  alt={type.name}
                  className="type-image"
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
