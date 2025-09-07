// File: src/app/QuoteCard.tsx

import React, { forwardRef } from 'react';
import type { Verse } from './types'; // 1. Impor tipe Verse dari file terpusat

// 2. Definisikan props untuk komponen ini HANYA SEKALI
interface QuoteCardProps {
  verse: Verse | null;
}

// 3. Gunakan forwardRef untuk bisa menerima 'ref' dari komponen induk
const QuoteCard = forwardRef<HTMLDivElement, QuoteCardProps>(({ verse }, ref) => {
  
  // Jika data ayat belum ada, render div kosong agar tidak error saat render pertama
  if (!verse) {
    return <div ref={ref} />;
  }

  // Jika data ayat sudah ada, tampilkan kartu kutipan lengkap
  return (
    <div ref={ref} className="bg-white rounded-lg shadow-xl p-8 text-center max-w-md w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Surah {verse.chapterName}
      </h2>
      <p className="mb-4 text-lg font-medium text-gray-600">
        {verse.verse_key.replace(':', ' : ')}
      </p>
      <p
        className="text-3xl leading-relaxed text-right dir-rtl mb-4 text-gray-800"
        style={{ fontFamily: 'var(--font-quran)' }}
      >
        {verse.text_uthmani}
      </p>
      <p className="text-gray-700 text-base">
        "{verse.translation}"
      </p>
    </div>
  );
});

// Baris ini adalah praktik yang baik untuk debugging di React DevTools
QuoteCard.displayName = 'QuoteCard';

export default QuoteCard;