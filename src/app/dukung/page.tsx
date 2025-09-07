// Lokasi File: src/app/dukung/page.tsx

import Link from 'next/link';

export default function DukungPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-8">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-xl p-6 sm:p-10 text-center">

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Jadilah Bagian dari Perjalanan Ini
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700 mx-auto">
          <p>
            Alhamdulillah, jika Anda sampai ke halaman ini, kami berharap "Ayat Pilihan" telah memberikan sedikit ketenangan atau inspirasi bagi Anda. Proyek ini kami bangun dengan semangat untuk berbagi dan akan selalu gratis untuk digunakan.
          </p>
          <p>
            Jika Anda merasa terbantu dan ingin mendukung keberlangsungan proyek ini, dukungan Anda akan sangat berarti. Donasi yang terkumpul akan kami gunakan sepenuhnya untuk biaya operasional (server & domain) serta pengembangan fitur-fitur baru di masa depan.
          </p>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Dukung Kami</h2>
           {/* Ganti "NAMA_AKUN" dengan nama akun Anda di Trakteer/Saweria */}
          <div className="flex justify-center gap-4">
            <a href="https://trakteer.id/ayatpilihan" target="_blank" rel="noopener noreferrer" className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors no-underline">
              Trakteer
            </a>
            <a href="https://saweria.co/ayatpilihan" target="_blank" rel="noopener noreferrer" className="bg-yellow-400 text-gray-800 font-bold py-2 px-6 rounded-lg hover:bg-yellow-500 transition-colors no-underline">
              Saweria
            </a>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 mx-auto mt-8">
            <p className="font-semibold">
                Berapapun dukungan Anda, tidak ada yang terlalu kecil. Terima kasih telah menjadi bagian dari perjalanan "Ayat Pilihan". Semoga Allah membalas kebaikan Anda dengan pahala dan keberkahan yang berlipat ganda. Aamiin ya Rabbal'alamin.
            </p>
        </div>

        <div className="text-center mt-10">
          <Link href="/" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors no-underline">
            Kembali ke Halaman Utama
          </Link>
        </div>

      </div>
    </main>
  );
}