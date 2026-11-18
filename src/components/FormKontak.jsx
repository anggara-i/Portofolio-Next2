"use client";

import { useState } from "react";

const kelasInput =
  "mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2";

export default function FormKontak() {
  // Kode 6.8: State semua isian
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [pesan, setPesan] = useState("");
  const [error, setError] = useState({});
  const [berhasil, setBerhasil] = useState(false);

  function ubahIsian(setNilai, namaField, nilai) {
    setNilai(nilai);
    setError((sebelumnya) => {
      const berikutnya = { ...sebelumnya };
      delete berikutnya[namaField];
      return berikutnya;
    });
    setBerhasil(false);
  }

  function kirim(e) {
    e.preventDefault();

    const errorBaru = {};
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const nomorHp = hp.replace(/\D/g, "");

    // Pemeriksaan Nama
    if (nama.trim() === "") {
      errorBaru.nama = "Nama wajib diisi.";
    }

    // Pemeriksaan Email
    if (!emailValid) {
      errorBaru.email =
        "Masukkan alamat email yang valid, contoh nama@gmail.com.";
    }

    // Kode 6.10: Pemeriksaan tambahan
    if (nomorHp.length < 10 || nomorHp.length > 15) {
      errorBaru.hp = "Nomor HP harus berisi 10 sampai 15 angka.";
    }

    if (keperluan === "") {
      errorBaru.keperluan = "Pilih salah satu keperluan.";
    }

    if (pesan.trim().length < 10) {
      errorBaru.pesan = "Pesan minimal 10 karakter.";
    }

    setError(errorBaru);

    setBerhasil(Object.keys(errorBaru).length === 0);
  }

  return (
    <form
      onSubmit={kirim}
      noValidate
      className="space-y-4"
    >
      {/* Nama */}
      <div>
        <label htmlFor="nama" className="block font-semibold">
          Nama lengkap
        </label>

        <input
          type="text"
          id="nama"
          name="nama"
          value={nama}
          required
          aria-invalid={Boolean(error.nama)}
          aria-describedby={error.nama ? "error-nama" : undefined}
          onChange={(e) => ubahIsian(setNama, "nama", e.target.value)}
          placeholder="Contoh: Indra Anggara"
          className={kelasInput}
        />

        {error.nama && (
          <p id="error-nama" role="alert" className="mt-1 text-sm text-aksen dark:text-red-300">
            {error.nama}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-semibold">
          Email
        </label>

        <input
          type="email"
          id="email"
          name="email"
          value={email}
          required
          aria-invalid={Boolean(error.email)}
          aria-describedby={error.email ? "error-email" : undefined}
          onChange={(e) => ubahIsian(setEmail, "email", e.target.value)}
          placeholder="nama@gmail.com"
          className={kelasInput}
        />

        {error.email && (
          <p id="error-email" role="alert" className="mt-1 text-sm text-aksen dark:text-red-300">
            {error.email}
          </p>
        )}
      </div>

      {/* Nomor HP */}
      <div>
        <label htmlFor="hp" className="block font-semibold">
          Nomor HP
        </label>

        <input
          type="tel"
          id="hp"
          name="hp"
          value={hp}
          required
          aria-invalid={Boolean(error.hp)}
          aria-describedby={error.hp ? "error-hp" : undefined}
          onChange={(e) => ubahIsian(setHp, "hp", e.target.value)}
          placeholder="082323331771"
          className={kelasInput}
        />

        {error.hp && (
          <p id="error-hp" role="alert" className="mt-1 text-sm text-aksen dark:text-red-300">
            {error.hp}
          </p>
        )}
      </div>

      {/* Keperluan - Kode 6.9 */}
      <div>
        <label htmlFor="keperluan" className="block font-semibold">
          Keperluan
        </label>

        <select
          id="keperluan"
          name="keperluan"
          value={keperluan}
          required
          aria-invalid={Boolean(error.keperluan)}
          aria-describedby={error.keperluan ? "error-keperluan" : undefined}
          onChange={(e) => ubahIsian(setKeperluan, "keperluan", e.target.value)}
          className={kelasInput}
        >
          <option value="">-- Pilih keperluan --</option>
          <option value="bertanya">Bertanya</option>
          <option value="kerja-sama">Kerja sama proyek</option>
          <option value="lainnya">Lainnya</option>
        </select>

        {error.keperluan && (
          <p id="error-keperluan" role="alert" className="mt-1 text-sm text-aksen dark:text-red-300">
            {error.keperluan}
          </p>
        )}
      </div>

      {/* Pesan */}
      <div>
        <label htmlFor="pesan" className="block font-semibold">
          Pesan
        </label>

        <textarea
          id="pesan"
          name="pesan"
          value={pesan}
          required
          aria-invalid={Boolean(error.pesan)}
          aria-describedby={error.pesan ? "error-pesan" : undefined}
          onChange={(e) => ubahIsian(setPesan, "pesan", e.target.value)}
          rows={5}
          maxLength={300}
          placeholder="Tulis pesanmu di sini..."
          className={kelasInput}
        />

        {error.pesan && (
          <p id="error-pesan" role="alert" className="mt-1 text-sm text-aksen dark:text-red-300">
            {error.pesan}
          </p>
        )}
      </div>

      {/* Tombol */}
      <button
        type="submit"
        className="rounded-lg bg-red-700 px-5 py-2 font-semibold text-white hover:bg-red-800"
      >
        Kirim Pesan
      </button>

      <p className="text-sm text-gray-500">
        Form ini belum mengirim pesan. Pengiriman pesan
        akan dibuat di Minggu 15.
      </p>

      {/* Kode 6.11: Pesan berhasil */}
      {berhasil && (
        <p role="status" className="rounded-lg bg-green-100 p-3 text-green-800 dark:bg-green-900 dark:text-green-100">
          Data formulir valid, {nama}. Pesan belum terkirim karena fitur pengiriman belum tersedia.
        </p>
      )}
    </form>
  );
}