import Link from "next/link";
import Hero from "@/components/Hero";
import Kartu from "@/components/Kartu";
import ProyekCard from "@/components/ProyekCard";
import SkillCard from "@/components/SkillCard";
import { proyek } from "@/data/proyek";

const skills = [
  { nama: "HTML", level: "Menengah" },
  { nama: "CSS", level: "Menengah" },
  { nama: "Git dan GitHub", level: "Dasar" },
  { nama: "Desain Poster dengan Canva", level: "Menengah" },
  { nama: "JavaScript", level: "Dasar" },
];

const proyekTerbaru = proyek.slice(-3);

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10">
      <Hero
        nama="Indra Anggara"
        tagline="Siswa kelas XI SMK, calon Vibes Engineer di Kelas Industri UBIG."
      />

      <Kartu judul="Keahlian">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill.nama} nama={skill.nama} level={skill.level} />
          ))}
        </div>
      </Kartu>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-utama">Proyek Terbaru</h2>
        {proyekTerbaru.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              {proyekTerbaru.map((item) => (
                <ProyekCard key={item.slug} proyek={item} />
              ))}
            </div>
            <Link
              href="/proyek"
              className="mt-6 inline-block rounded-lg bg-utama px-5 py-2 font-semibold text-white"
            >
              Lihat semua proyek
            </Link>
          </>
        ) : (
          <p className="rounded-xl border border-gray-200 bg-white p-6 text-gray-700 shadow-sm">
            Proyek pribadi akan ditambahkan di sini.
          </p>
        )}
      </section>
    </main>
  );
}
