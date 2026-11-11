
import { proyek } from "@/lib/proyek";
import FilterProyek from "@/components/FilterProyek";

export const metadata = {
  title: "Proyek",
  description: "Daftar proyek karya Indra Anggara.",
};

export default function DaftarProyek() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-utama md:text-4xl">
        Proyek Saya
      </h1>

      <p className="mt-3 text-lg text-gray-700">
        Proyek pribadi akan ditampilkan di halaman ini.
      </p>

      <FilterProyek dataProyek={proyek} />
    </main>
  );
}
