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
      type="outline"
      onClick={gantiTema}
      className="border-white bg-transparent text-white hover:bg-aksen hover:text-white">
      {gelap ? "Mode Terang" : "Mode Gelap"}
    </button>
  );
}