// Lokasi File: src/app/kontak/page.tsx

import Link from 'next/link';

export default function KontakPage() {
  // Link Google Form Anda
  const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLSfR8Hn17hmkuS1FO8MGDan33exuQz1aGCOPcMtOs4csip8JHg/viewform";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-8">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-xl p-6 sm:p-10 text-center">

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Hubungi Kami
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700 mx-auto">
          <p>
            Punya saran, masukan, laporan bug, atau ingin berbagi "Kisah Pengguna"? Kami akan sangat senang mendengarnya. Masukan dari Anda sangat berharga untuk pengembangan "Ayat Pilihan" ke depannya.
          </p>
          <p>
            Silakan isi formulir di bawah ini untuk menghubungi kami.
          </p>
        </div>

        <div className="mt-8">
          <a 
            href={googleFormLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors no-underline"
          >
            Buka Formulir Kontak
          </a>
        </div>

        <div className="text-center mt-10">
          <Link href="/" className="text-gray-500 hover:underline">
            Kembali ke Halaman Utama
          </Link>
        </div>

      </div>
    </main>
  );
}