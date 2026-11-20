
"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sudahMasuk } from "@/lib/pin";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function masukKelola(stateSebelum, formData) {
  const pin = formData.get("pin");

  if (pin !== process.env.ADMIN_PIN) {
    return { error: "PIN salah. Coba lagi." };
  }

  const kue = await cookies();
  kue.set("pin_admin", pin, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60,
  });

  return {};
}

export async function keluarKelola() {
  const kue = await cookies();
  kue.delete("pin_admin");
}

export async function sematkanPesan(formData) {
  if (!(await sudahMasuk())) {
    redirect("/kelola");
  }

  const id = formData.get("id")?.toString();
  const nilaiSematan = formData.get("sematkan")?.toString();

  if (!id || (nilaiSematan !== "ya" && nilaiSematan !== "tidak")) {
    throw new Error("Data sematan pesan tidak valid.");
  }

  const { error } = await supabaseAdmin
    .from("buku_tamu")
    .update({ disematkan: nilaiSematan === "ya" })
    .eq("id", id);

  if (error) {
    throw new Error(`Sematan pesan gagal diperbarui: ${error.message}`);
  }

  revalidatePath("/kelola");
  revalidatePath("/buku-tamu");
}

export async function hapusPesan(formData) {
  if (!(await sudahMasuk())) {
    return;
  }

  const id = formData.get("id");

  await supabaseAdmin
    .from("buku_tamu")
    .delete()
    .eq("id", id);

  revalidatePath("/kelola");
  revalidatePath("/buku-tamu");
}

// Membaca dan memeriksa isian proyek

const daftarKategori = ["HTML", "CSS", "JavaScript", "Next.js"];

function bacaProyek(formData) {
  return {
    judul: formData.get("judul").trim(),
    slug: formData.get("slug").trim(),
    kategori: formData.get("kategori").trim(),
    minggu: formData.get("minggu").trim(),
    deskripsi: formData.get("deskripsi").trim(),
    fitur: formData
      .get("fitur")
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f !== ""),
    gambar_url: formData.get("gambar_url").trim(),
  };
}

function cekProyek(proyek) {
  if (
    proyek.judul === "" ||
    proyek.slug === "" ||
    proyek.deskripsi === ""
  ) {
    return {
      error: "Judul, slug, dan deskripsi wajib diisi.",
      field: null,
    };
  }

  if (/\s/.test(proyek.slug)) {
    return {
      error: "Slug tidak boleh memakai spasi. Gunakan tanda hubung, contoh: buku-tamu.",
      field: "slug",
    };
  }

  if (!daftarKategori.includes(proyek.kategori)) {
    return {
      error: "Kategori harus HTML, CSS, JavaScript, atau Next.js.",
      field: "kategori",
    };
  }

  if (!proyek.gambar_url.startsWith("/proyek/")) {
    return {
      error: "Alamat gambar harus diawali /proyek/, contoh: /proyek/proyek-buku-tamu.png.",
      field: "gambar_url",
    };
  }

  return { error: "", field: null };
}

function hasilValidasiProyek(validasi, proyek) {
  if (validasi.field === "slug") {
    return {
      error: "",
      slugError: validasi.error,
      proyek,
    };
  }

  return {
    error: validasi.error,
    fieldError: validasi.field,
    proyek,
  };
}

function perbaruiHalaman(slug) {
  revalidatePath("/");
  revalidatePath("/proyek");
  revalidatePath(`/proyek/${slug}`);
  revalidatePath("/kelola");
}

// Menambah proyek

export async function tambahProyek(stateSebelum, formData) {
  const proyek = bacaProyek(formData);

  if (!(await sudahMasuk())) {
    return {
      error: "Masukkan PIN dulu di halaman Kelola.",
      proyek,
    };
  }

  const validasi = cekProyek(proyek);

  if (validasi.error !== "") {
    return hasilValidasiProyek(validasi, proyek);
  }

  const hasil = await supabaseAdmin
    .from("projects")
    .insert(proyek);

  if (hasil.error) {
    if (hasil.error.code === "23505") {
      return {
        error: "Slug sudah dipakai proyek lain.",
        proyek,
      };
    }

    return {
      error: `Proyek gagal disimpan: ${hasil.error.message}`,
      proyek,
    };
  }

  perbaruiHalaman(proyek.slug);
  redirect("/kelola");
}

// Mengubah proyek

export async function ubahProyek(stateSebelum, formData) {
  const proyek = bacaProyek(formData);

  if (!(await sudahMasuk())) {
    return {
      error: "Masukkan PIN dulu di halaman Kelola.",
      proyek,
    };
  }

  const id = formData.get("id");
  const validasi = cekProyek(proyek);

  if (validasi.error !== "") {
    return hasilValidasiProyek(validasi, proyek);
  }

  const hasil = await supabaseAdmin
    .from("projects")
    .update(proyek)
    .eq("id", id);

  if (hasil.error) {
    if (hasil.error.code === "23505") {
      return {
        error: "Slug sudah dipakai proyek lain.",
        proyek,
      };
    }

    return {
      error: `Proyek gagal diubah: ${hasil.error.message}`,
      proyek,
    };
  }

  perbaruiHalaman(proyek.slug);
  redirect("/kelola");
}

// Menghapus proyek

export async function hapusProyek(formData) {
  if (!(await sudahMasuk())) {
    return;
  }

  const id = formData.get("id");

  await supabaseAdmin
    .from("projects")
    .delete()
    .eq("id", id);

  revalidatePath("/");
  revalidatePath("/proyek");
  revalidatePath("/kelola");
}