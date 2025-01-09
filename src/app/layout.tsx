"use client";

import React from "react";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <main className="flex flex-col p-4">{children}</main>
      </body>
    </html>
  );
}
