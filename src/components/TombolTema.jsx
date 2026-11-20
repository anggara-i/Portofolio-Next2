"use client";

import { useState } from "react";

export default function TombolTema() {
  const [gelap, setGelap] = useState(false);

  function gantiTema() {
    document.documentElement.classList.toggle("dark");
    setGelap(!gelap);
  }

  return (
    <button
      type="button"
      onClick={gantiTema}
      className="rounded-lg border border-white bg-transparent px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
      {gelap ? "Mode Terang" : "Mode Gelap"}
    </button>
  );
}