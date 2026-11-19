import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ambilGambarProyek } from "@/lib/gambar-proyek";

export default function ProyekCard({ proyek }) {
  const gambar = ambilGambarProyek(proyek);

  return (
    <Link
      href={`/proyek/${proyek.slug}`}
      className="block h-full rounded-xl transition-shadow hover:shadow-md"
    >
      <Card className="h-full w-full">
        {gambar && (
          <Image
            src={gambar}
            alt={`Tangkapan layar ${proyek.judul}`}
            width={640}
            height={420}
            className="aspect-[16/10] w-full object-cover"
          />
        )}
        <CardHeader className="flex-1 content-start">
          <Badge className="w-fit">{proyek.kategori}</Badge>
          <CardTitle className="line-clamp-2 min-h-14 text-lg text-primary">
            {proyek.judul}
          </CardTitle>
          <CardDescription className="line-clamp-3 min-h-[4.5rem]">
            {proyek.deskripsi}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
       