'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { surahList } from './surahData';

type Verse = {
  verse_key: string;
  text_uthmani: string;
  translation: string;
  chapterName: string;
};

const getIndonesianSurahName = (surahNumber: number): string => {
  const surah = surahList.find(s => s.number === surahNumber);
  return surah ? surah.name : 'Unknown Surah';
};

export default function HomePage() {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [currentVerseNumber, setCurrentVerseNumber] = useState<number | null>(null);

  const fetchSpecificVerse = useCallback(async (verseNumber: number) => {
    if (verseNumber < 1 || verseNumber > 6236) return;
    setIsFading(true);
    setIsNavigating(true);

    setTimeout(async () => {
      try {
        const response = await fetch(`https://api.quran.com/api/v4/verses/by_key/${verseNumber}?language=id&fields=text_uthmani&translations=33`);
        const data = await response.json();
        
        const verseData = data.verse;
        const surahNumber = parseInt(verseData.verse_key.split(':')[0], 10);
        
        setVerse({
          verse_key: verseData.verse_key,
          text_uthmani: verseData.text_uthmani,
          translation: verseData.translations[0].text.replace(/<[^>]*>/g, ''),
          chapterName: getIndonesianSurahName(surahNumber),
        });
        setCurrentVerseNumber(verseNumber);
      } catch (error) {
        toast.error("Gagal mengambil data ayat.");
      } finally {
        setIsFading(false);
        setIsNavigating(false);
      }
    }, 400);
  }, []);

  const fetchRandomVerse = useCallback(async () => {
    setIsLoading(true);
    const randomVerseNumber = Math.floor(Math.random() * 6236) + 1;
    await fetchSpecificVerse(randomVerseNumber);
    setIsLoading(false);
  }, [fetchSpecificVerse]);

  const handlePrevious = () => { if (currentVerseNumber && currentVerseNumber > 1) fetchSpecificVerse(currentVerseNumber - 1); };
  const handleNext = () => { if (currentVerseNumber && currentVerseNumber < 6236) fetchSpecificVerse(currentVerseNumber + 1); };

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--background-ivory)' }}>
      <main className="flex flex-col flex-grow items-center justify-center p-4 text-center">
        
        <div className={`w-full max-w-2xl transition-opacity duration-400 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          {!verse ? (
            <div className="flex flex-col items-center">
              <h1 className="text-4xl font-bold text-gray-800">Ayat Pilihan</h1>
              <p className="mt-2 text-lg text-gray-600">Mulailah hari Anda atau temukan petunjuk di setiap momen.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-left">
              <div className="text-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Surah {verse.chapterName}</h2>
                <p className="text-base sm:text-lg font-semibold text-gray-600">{verse.verse_key.replace(':', ' : ')}</p>
              </div>
              <p className="text-3xl sm:text-4xl leading-relaxed text-right dir-rtl mb-6 text-gray-900" style={{ fontFamily: 'var(--font-quran, "Traditional Arabic", serif)' }}>{verse.text_uthmani}</p>
              <p className="text-gray-700 text-base leading-relaxed">{verse.translation}</p>
              <div className="mt-6 pt-4 border-t flex justify-between gap-4">
                <button onClick={handlePrevious} disabled={isNavigating || !currentVerseNumber || currentVerseNumber <= 1} className="w-full px-3 py-2 text-sm sm:text-base bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 text-gray-700 font-semibold transition-colors">‹ Sebelumnya</button>
                <button onClick={handleNext} disabled={isNavigating || !currentVerseNumber || currentVerseNumber >= 6236} className="w-full px-3 py-2 text-sm sm:text-base bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 text-gray-700 font-semibold transition-colors">Berikutnya ›</button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <button 
            onClick={fetchRandomVerse} 
            disabled={isLoading} 
            className="px-10 py-4 text-xl font-bold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-70 disabled:scale-100"
            style={{
              backgroundColor: isLoading ? '#9CA3AF' : 'var(--button-green)',
              color: isLoading ? '#E5E7EB' : 'var(--text-gold)',
            }}
          >
            {isLoading ? 'Mencari...' : 'CARI AYAT ACAK'}
          </button>
        </div>
      </main>
    
      <footer className="w-full text-center text-gray-500 text-sm p-4 border-t border-gray-200">
        <div className="space-x-4">
          <Link href="/panduan" className="hover:underline">Panduan</Link>
          <Link href="/dukung" className="hover:underline">Dukung Kami</Link>
          <Link href="/privasi" className="hover:underline">Privasi</Link>
          <Link href="/kontak" className="hover:underline">Hubungi Kami</Link>
        </div>
        <div className="mt-2">
          <span>© 2025 Ayat Pilihan - Sebuah Proyek oleh GodSpeed-Studio</span>
        </div>
      </footer>
    </div>
  );
}