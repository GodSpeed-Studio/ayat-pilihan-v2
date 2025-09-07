// Lokasi File: src/app/panduan/page.tsx

import Link from 'next/link';

export default function PanduanPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 sm:p-8">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-6 sm:p-10 text-left">
        
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-6">
          Panduan & Niat Penggunaan
        </h1>

        <div className="prose prose-lg max-w-none text-gray-700">
          {/* PARAGRAF BARU YANG SUDAH DIREVISI */}
          <p className="italic text-center">
            "Di setiap momen kehidupan—baik saat hati lapang penuh syukur maupun saat sempit dirundung duka—Al-Qur'an adalah petunjuk dan solusi abadi. Ia adalah tempat kita 'bertanya', bercermin, dan menemukan kembali arah. 'Ayat Pilihan' hadir sebagai jembatan sederhana untuk memulai percakapan itu. Dengan membuka satu halaman secara acak, semoga Anda menemukan penegasan, pengingat, atau hikmah yang paling Anda butuhkan saat ini."
          </p>

          <h2 className="font-bold mt-8 mb-4 text-2xl">Adab Sebelum Memulai</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Luruskan Niat:</strong> Niatkan dalam hati untuk mencari petunjuk, ketenangan, atau motivasi dari Allah SWT.</li>
            <li><strong>Berserah Diri (Tawakkal):</strong> Kosongkan pikiran dari segala ekspektasi dan pasrahkan hati Anda sepenuhnya.</li>
            <li><strong>Rasakan & Berdoa:</strong> Rasakan getaran dalam jiwa Anda, berdoa sesuai dengan apa yang Anda rasakan atau tanyakan.</li>
            <li><strong>Buka "Halaman" Anda:</strong> Setelah hati terasa siap, baru tekan tombol "CARI AYAT ACAK".</li>
          </ol>

          <h2 className="font-bold mt-8 mb-4 text-2xl">Penting untuk Dipahami</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Bukan Alat Fatwa atau Hukum.</strong> Ayat yang ditampilkan tidak boleh dijadikan dasar tunggal untuk menetapkan hukum syariat. Untuk urusan fikih, silakan merujuk kepada para ulama yang terpercaya.</li>
            <li><strong>Bukan Alat Ramalan.</strong> Website ini tidak dirancang untuk meramal masa depan. Niat kami murni untuk memfasilitasi momen perenungan (*tadabbur*).</li>
            <li><strong>Pentingnya Konteks Ayat.</strong> Setiap ayat memiliki konteks yang kaya. Gunakan tombol navigasi untuk melihat ayat sebelum dan sesudahnya, serta pelajarilah tafsir dari guru yang kompeten untuk pemahaman yang mendalam.</li>
            <li><strong>Hanyalah Sebuah Wasilah (Alat Bantu).</strong> Anggaplah website ini seperti jari Anda yang membuka halaman Mushaf. Petunjuk dan hidayah yang sesungguhnya mutlak datang dari Allah SWT.</li>
          </ul>
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