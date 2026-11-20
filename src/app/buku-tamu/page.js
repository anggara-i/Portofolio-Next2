import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import FormBukuTamu from "@/components/FormBukuTamu";

export const metadata = {
    title: "Buku Tamu",
    description: "Tinggalkan kesan atau sapaan untuk M.Miftakhul Huda.",
};

export default async function BukuTamu() {
    // Mengambil pesan dari tabel buku_tamu
    const { data: daftarPesan, error } = await supabase
        .from("buku_tamu")
        .select("*")
        .order("disematkan", { ascending: false })
        .order("created_at", { ascending: false });

    return (
        <main className="mx-auto w-full max-w-3xl px-4 py-10">
            {/* Judul halaman */}
            <h1 className="text-3xl font-bold text-primary md:text-4xl">
                Buku Tamu
            </h1>

            <p className="mt-3 text-lg text-muted-foreground">
                Tinggalkan kesan atau sapaan. Pesanmu langsung tampil di bawah.
            </p>

            {/* Form Buku Tamu */}
            <Card className="mt-8">
                <CardContent className="pt-6">
                    <FormBukuTamu />
                </CardContent>
            </Card>

            {/* Daftar Pesan */}
            <h2 className="mt-10 text-2xl font-bold text-primary">
                Pesan Terbaru
            </h2>

            <div className="mt-4 space-y-4">
                {error ? (
                    <p className="text-sm text-destructive">
                        Gagal mengambil pesan: {error.message}
                    </p>
                ) : daftarPesan && daftarPesan.length > 0 ? (
                    daftarPesan.map((item) => (
                        <Card key={item.id}>
                            <CardHeader>
                                <CardTitle>{item.nama}</CardTitle>

                                <CardDescription>
                                    {new Date(item.created_at).toLocaleDateString(
                                        "id-ID",
                                        {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )}
                                </CardDescription>
                                {item.disematkan && <Badge>Disematkan</Badge>}
                            </CardHeader>

                            <CardContent>
                                {item.pesan}
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-muted-foreground">
                        Belum ada pesan. Jadilah orang pertama yang mengisi buku tamu!
                    </p>
                )}
            </div>
        </main>
    );
}