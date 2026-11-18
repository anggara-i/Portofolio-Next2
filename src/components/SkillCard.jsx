export default function Skillcard({ nama, level }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-utama dark:text-gray-100">
                {nama}
            </h3>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Level: {level}
            </p>
        </div>
    );
}