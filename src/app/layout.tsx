"use client";

import React from "react";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-gray-800 text-white p-4 flex flex-col items-center justify-center">
          {" "}
          {/* Centre le logo et le titre */}
          {/* Logo et titre sur la même ligne avec un espacement vertical */}
          <img
            src="/pokedex.png"
            alt="Pokedex logo"
            className="w-16 h-16 mb-3" // Ajustez la taille du logo et l'espace entre le logo et le titre
          />
          <h1 className="text-3xl font-bold text-center">Pokedex</h1>{" "}
          {/* Centre le titre */}
        </header>
        <main className="flex flex-col p-4">{children}</main>
      </body>
    </html>
  );
}
