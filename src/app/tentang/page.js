import Kartu from "@/components/Kartu";

export const metadata = {
  title: "Tentang",
  description: "Cerita, hobi, cita-cita, dan jadwal belajar Indra Anggara.",
};

const hobi = ["Mendaki", "Sepak Bola", "Memancing"];

const jadwal = [
  { hari: "Senin", waktu: "19:00 - 21:00", kegiatan: "PKK" },
  { hari: "Selasa", waktu: "07:00 - 12:00", kegiatan: "PKK" },
  { hari: "Rabu", waktu: "18:00 - 20:00", kegiatan: "IOT" },
];

export default function Tentang() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-10">
      <h1 className="text-3xl font-bold text-utama md:text-4xl">Tentang Saya</h1>

      <Kartu judul="Perkenalan">
        <p>
          Saya tinggal di Kota Pasuruan dan saya senang mencoba hal baru di
          dunia teknologi. Saya ingin bisa membuat web yang bermanfaat untuk
          sekolah dan UMKM sekitar rumah.
        </p>
      </Kartu>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Kartu judul="Hobi">
          <ul className="list-disc space-y-1 pl-5">
            {hobi.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Kartu>

        <Kartu judul="Cita-cita">
          <p className="mb-2">
            Saya ingin menjadi seorang <strong>Web Developer</strong> dan
            sukses di dunia trading demi mewujudkan impian{" "}
            <strong>Financial Freedom</strong>.
          </p>
        </Kartu>
      </div>

      <Kartu judul="Jadwal Belajar">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-utama text-white">
              <tr>
                <th className="p-3">Hari</th>
                <th className="p-3">Waktu</th>
                <th className="p-3">Kegiatan</th>
              </tr>
            </thead>
            <tbody>
              {jadwal.map((item) => (
                <tr key={item.hari} className="border-b border-gray-200">
                  <td className="p-3 font-medium">{item.hari}</td>
                  <td className="p-3">{item.waktu}</td>
                  <td className="p-3">{item.kegiatan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Kartu>
    </main>
  );
}
