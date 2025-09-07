// Lokasi File: src/app/privasi/page.tsx

import Link from 'next/link';

export default function PrivasiPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-8">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-6 sm:p-10 text-left">
        
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-6">
          Kebijakan Privasi
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            Terakhir diperbarui: 9 Agustus 2025
          </p>
          <p>
            Kami di "Ayat Pilihan" menghargai privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami menangani informasi Anda saat Anda menggunakan layanan kami.
          </p>

          <h2 className="font-bold mt-8 mb-4 text-2xl">Informasi yang Kami Kumpulkan</h2>
          <p>
            "Ayat Pilihan" adalah aplikasi yang sangat sederhana. Kami **tidak** mengumpulkan informasi identitas pribadi apa pun dari Anda, seperti nama, alamat email, atau nomor telepon.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Data Analitik Anonim:</strong> Kami menggunakan Vercel Analytics untuk mengumpulkan data anonim tentang penggunaan website, seperti jumlah pengunjung, halaman yang dilihat, dan asal negara. Data ini tidak dapat digunakan untuk mengidentifikasi Anda secara pribadi dan hanya digunakan untuk meningkatkan layanan kami.</li>
            <li><strong>Penyimpanan Lokal (localStorage):</strong> Kami menggunakan penyimpanan lokal di browser Anda hanya untuk menyimpan satu informasi: apakah Anda sudah melihat jendela tutorial atau belum (`hasSeenTutorial`). Ini bertujuan agar Anda tidak melihat jendela yang sama berulang kali.</li>
          </ul>

          <h2 className="font-bold mt-8 mb-4 text-2xl">Penggunaan Data</h2>
          <p>
            Karena kami tidak mengumpulkan data pribadi, kami tidak menggunakan atau membagikan informasi pribadi Anda kepada pihak ketiga mana pun.
          </p>
          
          <h2 className="font-bold mt-8 mb-4 text-2xl">Menghubungi Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, Anda dapat menghubungi kami melalui formulir kontak yang tersedia di halaman utama.
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