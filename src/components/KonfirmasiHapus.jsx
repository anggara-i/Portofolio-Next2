"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function KonfirmasiHapus({
  id,
  aksi,
  judul,
  keterangan,
}) {
  const [terbuka, setTerbuka] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (terbuka && dialog && !dialog.open) {
      dialog.showModal();
    } else if (!terbuka && dialog?.open) {
      dialog.close();
    }
  }, [terbuka]);

  return (
    <>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={() => setTerbuka(true)}
      >
        Hapus
      </Button>
      <dialog
        ref={dialogRef}
        onCancel={(event) => {
          event.preventDefault();
          setTerbuka(false);
        }}
        className="fixed left-1/2 top-1/2 m-0 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border bg-background p-0 text-foreground shadow-xl backdrop:bg-black/30 backdrop:backdrop-blur-sm"
      >
        <div className="p-5">
          <h2 className="text-lg font-semibold">{judul}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{keterangan}</p>
        </div>
        <form
          action={aksi}
          onSubmit={() => setTerbuka(false)}
          className="flex justify-end gap-2 border-t border-border bg-muted/30 px-5 py-4"
        >
          <input type="hidden" name="id" value={id} />
          <Button
            type="button"
            variant="outline"
            onClick={() => setTerbuka(false)}
          >
            Batal
          </Button>
          <Button type="submit" variant="destructive">
            Ya, hapus
          </Button>
        </form>
      </dialog>
    </>
  );
}