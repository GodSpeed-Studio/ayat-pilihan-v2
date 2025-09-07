// LOKASI: src/app/layout.tsx
// GANTI SELURUH ISI FILE DENGAN KODE INI

import type { Metadata } from "next";
import { Inter, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Analytics from "./Analytics";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const notoNaskh = Noto_Naskh_Arabic({ subsets: ["arabic"], weight: "400", variable: '--font-quran' });

export const metadata: Metadata = {
  title: "Ayat Pilihan",
  description: "Temukan petunjuk dan ketenangan dalam Al-Qur'an.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${notoNaskh.variable}`}>
      {/* 1. Body adalah container flex utama, ini sudah benar */}
      <body className="flex flex-col min-h-screen">
        <Toaster position="top-center" />

        {/* 2. Main content akan otomatis mengisi ruang yang tersedia karena 'flex-grow' */}
        {/* Padding bawah yang besar (pb-28) tidak lagi diperlukan dan dihapus */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 3. Footer tidak lagi 'fixed'. Ia menjadi elemen flex biasa yang akan terdorong ke bawah */}
        <footer className="w-full text-center text-gray-500 text-sm p-4 border-t border-gray-200">
          <div className="space-x-4 mb-2">
            <Link href="/panduan" className="hover:underline">Panduan</Link>
            <Link href="/dukung" className="hover:underline">Dukung Kami</Link>
            <Link href="/privasi" className="hover:underline">Privasi</Link>
            <Link href="/kontak" className="hover:underline">Hubungi Kami</Link>
          </div>
          <div className="mt-2">
            <span>© 2025 Ayat Pilihan - Sebuah Proyek oleh GodSpeed-Studio</span>
          </div>
        </footer>
        
        <Analytics />
      </body>
    </html>
  );
}