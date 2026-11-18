export default function Kartu({ judul, children }) {
    return (
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-3 text-2xl font-bold text-utama dark:text-gray-100">{judul}</h2>
            {children}
        </section>
    );
}