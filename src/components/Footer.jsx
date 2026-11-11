export default function Footer() {
  const tahun = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-utama p-6 text-center text-latar">
      <p>&copy; {tahun} Indra Anggara. Dibuat dengan Next.js.</p>
    </footer>
  );
}
