import Link from "next/link";
import Hero from "@/components/Hero";
import ProyekCard from "@/components/ProyekCard";
import SkillCard from "@/components/SkillCard";
import { buttonVariants } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Beranda",
  description:
    "Portofolio Indra Anggara Putra, siswa Rekayasa Perangkat Lunak dan calon Vibes Engineer.",
};

export default async function Home() {
  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .order("id");
  const { data: proyekTerbaru, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);

  return (
    <main className="mx-auto w-full min-w-0 max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <Hero
        nama="Indra Anggara Putra"
        tagline="Siswa Kelas XI SMK Jurusan Rekayasa Perangkat Lunak, calon Vibes Engineer Kelas Industri UBIG."
      />

      <section className="mt-8 w-full min-w-0 sm:mt-10">
        <h2 className="mb-4 break-words text-xl font-bold text-primary sm:text-2xl">
          Keahlian
        </h2>

        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {skills && skills.map((skill) => (
            <SkillCard
              key={skill.id}
              nama={skill.nama}
              level={skill.level}
            />
          ))}
        </div>
      </section>

      <section className="mt-8 w-full min-w-0 sm:mt-10">
        <h2 className="mb-4 break-words text-xl font-bold text-primary sm:text-2xl">
          Proyek Terbaru
        </h2>

        {error && (
          <p className="rounded-xl border border-dashed border-input p-6 text-center text-aksen">
            Proyek terbaru gagal dimuat: {error.message}
          </p>
        )}

        {!error && (!proyekTerbaru || proyekTerbaru.length === 0) && (
          <p className="rounded-xl border border-dashed border-input p-6 text-center text-muted-foreground">
            Belum ada proyek di database.
          </p>
        )}

        {!error && proyekTerbaru && proyekTerbaru.length > 0 && (
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {proyekTerbaru.map((item) => (
              <ProyekCard key={item.slug} proyek={item} />
            ))}
          </div>
        )}

        <Link
          href="/proyek"
          className={buttonVariants({ size: "lg", className: "mt-6" })}
        >
          Lihat semua proyek
        </Link>
      </section>
    </main>
  );
}