// Lokasi: src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Analytics from "./Analytics";
import Link from "next/link"; // 1. Tambahkan import Link

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
      <body className="flex flex-col min-h-screen">
        <Toaster position="top-center" />

        {/* 2. Tambahkan padding bawah (pb-28) agar konten tidak tertutup footer */}
        <main className="flex-grow flex items-center justify-center p-4 pb-28">
          {children}
        </main>

        {/* 3. Tambahkan kelas `fixed` dan `z-index` pada footer */}
        <footer className="fixed bottom-0 left-0 w-full z-50 text-sm bg-white text-gray-600 border-t">
          <div className="max-w-4xl mx-auto py-4 px-4">
            <div className="flex justify-center space-x-4 mb-2">
              {/* 4. Link diaktifkan menggunakan komponen <Link> */}
              <Link href="/panduan" className="underline hover:text-blue-600">Panduan</Link>
              <Link href="/dukung" className="underline hover:text-blue-600">Dukung Kami</Link>
              <Link href="/privasi" className="underline hover:text-blue-600">Privasi</Link>
              <Link href="/kontak" className="underline hover:text-blue-600">Hubungi Kami</Link>
            </div>
            <p className="text-center">
              © 2025 Ayat Pilihan - Sebuah Proyek oleh GodSpeed-Studio
            </p>
          </div>
        </footer>
        
        <Analytics />
      </body>
    </html>
  );
}