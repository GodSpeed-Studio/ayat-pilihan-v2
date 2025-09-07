// LOKASI: src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Analytics from "./Analytics";

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
        
        {/* FIX: Mengembalikan kelas flexbox untuk menengahkan konten */}
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          {children}
        </main>
        
        <Analytics />
      </body>
    </html>
  );
}