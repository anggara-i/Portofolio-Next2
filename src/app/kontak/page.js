import FormKontak from "@/components/FormKontak";

export const metadata = {
  title: "Kontak",
  description:
    "Hubungi Indra Anggara melalui form kontak, email, atau GitHub.",
};

export default function Kontak() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold text-utama dark:text-sky-200 md:text-4xl">
        Hubungi Saya
      </h1>

      <p className="mt-3 text-gray-700 dark:text-gray-300">
        Punya pertanyaan atau ingin bekerja sama?
        Isi form berikut.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm md:col-span-2">
          <FormKontak />
        </section>

        <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-utama dark:text-sky-200">
            Temukan Saya di
          </h2>

          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300">GitHub</p>
              <a
                href="https://github.com/anggara-i"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-red-700 hover:underline"
              >
                Kunjungi GitHub
              </a>
            </div>

            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300">Email</p>
              <a
                href="https://www.instagram.com/anggaaa_i?stkn=MXMxNndrdHVvcW1nOA%3D%3D"
                className="text-sm text-red-700 hover:underline"
              >
                anggaraputraindra4@gmail.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}