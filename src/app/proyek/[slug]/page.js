import Link from "next/link";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { proyek } from "@/data/proyek";
import { ambilGambarProyek } from "@/lib/gambar-proyek";

function ambilProyek(slug) {
  return proyek.find((item) => item.slug === slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await ambilProyek(slug);

  if (!item) {
    return { title: "Proyek tidak ditemukan" };
  }
  return { title: item.judul, description: item.deskripsi };
}

export default async function DetailProyek({ params }) {
  const { slug } = await params;
  const item = await ambilProyek(slug);

  if (!item) {
    notFound();
  }

  const fitur = Array.isArray(item.fitur) ? item.fitur : [];
  const teknologi = Array.isArray(item.teknologi) ? item.teknologi : [];
  const gambar = ambilGambarProyek(item);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/proyek" className="text-sm font-semibold text-aksen hover:underline">
        &larr; Kembali ke daftar proyek
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-primary md:text-4xl">{item.judul}</h1>
      <div className="mt-3 flex items-center gap-3">
        <Badge>{item.kategori}</Badge>
        <span className="text-muted-foreground">Dibuat tahun {item.tahun}</span>
      </div>  
      {gambar && (
        <Image
          src={gambar}
          alt={`Tangkapan layar ${item.judul}`}
          width={640}
          height={420}
          priority
          className="mt-6 h-auto w-full rounded-xl border border-border"
        />
      )}
      <p className="mt-6 text-lg">{item.deskripsi}</p>
      <Separator className="my-8" />
      <h2 className="text-2xl font-bold text-primary">Yang Saya Pelajari</h2>
      <ul className="mt-3 list-disc pl-5">
        {fitur.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      {teknologi.length > 0 && (
        <>
          <Separator className="my-8" />
          <h2 className="text-2xl font-bold text-primary">Teknologi</h2>
          <p className="mt-3">{teknologi.join(", ")}</p>
        </>
      )}
    </main>
  );
}