const gambarLokalProyek = {
  "project-iot": "/proyek/iot-esp32.png",
  "project-petugasku": "/proyek/petugasku.png",
  "tabel-jadwal": "/proyek/jadwal.png",
  "portofolio-responsif": "/proyek/responsif.jpg",
};

export function ambilGambarProyek(proyek) {
  const gambarDatabase = proyek.gambar_url?.trim();

  if (gambarDatabase && !gambarDatabase.startsWith("/")) {
    return gambarDatabase;
  }

  return gambarLokalProyek[proyek.slug] ?? gambarDatabase ?? proyek.gambar ?? null;
}