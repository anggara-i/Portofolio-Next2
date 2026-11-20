"use client";

import { useActionState } from "react";
import TombolKirim from "@/components/TombolKirim";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FormProyek({ aksi, proyek, teksTombol }) {
  const [state, formAction] = useActionState(aksi, { proyek });

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={proyek.id} />

      <div className="space-y-2">
        <Label htmlFor="judul">Judul</Label>
        <Input
          id="judul"
          name="judul"
          required
          placeholder="Contoh: Website Buku Tamu"
          defaultValue={state.proyek.judul}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug (alamat halaman detail)</Label>
        <Input
          id="slug"
          name="slug"
          required
          aria-invalid={Boolean(state.slugError)}
          aria-describedby={state.slugError ? "slug-error" : "slug-hint"}
          placeholder="Contoh: buku-tamu"
          defaultValue={state.proyek.slug}
        />
        {state.slugError && (
          <p id="slug-error" role="alert" className="text-sm text-destructive">
            {state.slugError}
          </p>
        )}
        {!state.slugError && (
          <p id="slug-hint" className="text-sm text-muted-foreground">
            Gunakan huruf kecil dan tanda hubung.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="kategori">Kategori</Label>
        <Input
          id="kategori"
          name="kategori"
          required
          placeholder="HTML, CSS, JavaScript, atau Next.js"
          defaultValue={state.proyek.kategori}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="minggu">Minggu</Label>
        <Input
          id="minggu"
          name="minggu"
          required
          defaultValue={state.proyek.minggu}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deskripsi">Deskripsi</Label>
        <Textarea
          id="deskripsi"
          name="deskripsi"
          required
          rows={2}
          placeholder="Tuliskan deskripsi singkat proyek."
          defaultValue={state.proyek.deskripsi}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fitur">
          Yang saya pelajari (satu baris satu poin)
        </Label>
        <Textarea
          id="fitur"
          name="fitur"
          rows={3}
          placeholder={"Server Action\nValidasi Form\nCRUD Data"}
          defaultValue={state.proyek.fitur.join("\n")}
        />
        <p className="text-sm text-muted-foreground">
          Masukkan satu fitur pada setiap baris.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="gambar_url">Alamat Gambar</Label>
        <Input
          id="gambar_url"
          name="gambar_url"
          required
          aria-invalid={Boolean(state.fieldError === "gambar_url")}
          placeholder="/proyek/proyek-buku-tamu.png"
          defaultValue={state.proyek.gambar_url}
        />
      </div>

      <TombolKirim teks={teksTombol} />

      {state.error && state.error !== state.slugError && (
        <p className="text-sm text-aksen">{state.error}</p>
      )}
    </form>
  );
}