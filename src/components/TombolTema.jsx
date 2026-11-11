"use client";

import { useEffect, useState } from "react";

export default function TombolTema() {
  const [temaGelap, setTemaGelap] = useState(() =>
    typeof window !== "undefined" && localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", temaGelap);
    localStorage.setItem("darkMode", String(temaGelap));
  }, [temaGelap]);

  return (
    <button
      type="button"
      onClick={() => setTemaGelap((sebelumnya) => !sebelumnya)}
      className="rounded-lg border border-white px-3 py-2 text-sm font-semibold hover:bg-white hover:text-utama"
    >
      <span className="dark:hidden">🌙 Gelap</span>
      <span className="hidden dark:inline">☀️ Terang</span>
    </button>
  );
}
