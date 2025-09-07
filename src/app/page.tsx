'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import * as htmlToImage from 'html-to-image';
import QuoteCard from './QuoteCard';
import { surahList } from './surahData';
import toast from 'react-hot-toast';
import Link from 'next/link';

type Verse = { verse_key: string; text_uthmani: string; translation: string; audioUrl: string | null; chapterName: string; };
const getIndonesianSurahName = (surahNumber: number): string => { const surah = surahList.find(s => s.number === surahNumber); return surah ? surah.name : 'Unknown Surah'; };

export default function HomePage() {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [currentVerseNumber, setCurrentVerseNumber] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const quoteCardRef = useRef<HTMLDivElement>(null);

  // ... (Semua logika fungsi Anda tidak perlu diubah) ...
  useEffect(() => { const openInExternalBrowser = () => { const currentUrl = window.location.protocol + "//" + window.location.host + window.location.pathname; const intentUrl = `intent://${currentUrl.replace(/https?:\/\//, '')}#Intent;scheme=https;package=com.android.chrome;end`; window.location.href = intentUrl; }; const isInstagramBrowser = /Instagram|FBAV/i.test(navigator.userAgent); if (isInstagramBrowser) { const timer = setTimeout(() => { openInExternalBrowser(); }, 500); return () => clearTimeout(timer); } }, []);
  const fetchSpecificVerse = async (verseNumber: number) => { if (verseNumber < 1 || verseNumber > 6236) return; setIsNavigating(true); if(audioRef.current) audioRef.current.pause(); setIsPlaying(false); setIsAudioLoading(false); try { const response = await fetch(`https://api.alquran.cloud/v1/ayah/${verseNumber}/editions/quran-uthmani,id.indonesian,ar.alafasy`); const data = await response.json(); if (data.code === 200) { const arabicData = data.data[0]; const translationData = data.data[1]; const audioData = data.data[2]; setVerse({ verse_key: `${arabicData.surah.number}:${arabicData.numberInSurah}`, text_uthmani: arabicData.text, translation: translationData.text, audioUrl: audioData.audio, chapterName: getIndonesianSurahName(arabicData.surah.number), }); setCurrentVerseNumber(verseNumber); } else { throw new Error(data.status); } } catch (error) { console.error("TERJADI ERROR:", error); toast.error("Gagal mengambil data ayat."); } setIsNavigating(false); };
  const fetchRandomVerse = async () => { setIsLoading(true); const randomVerseNumber = Math.floor(Math.random() * 6236) + 1; await fetchSpecificVerse(randomVerseNumber); setIsLoading(false); };
  const handleShare = useCallback(async () => { if (quoteCardRef.current === null) { return; } const shareToast = toast.loading('Mempersiapkan gambar...'); try { const dataUrl = await htmlToImage.toPng(quoteCardRef.current, { pixelRatio: 2 }); if (navigator.share) { const response = await fetch(dataUrl); const blob = await response.blob(); const file = new File([blob], `ayat-pilihan-${verse?.verse_key.replace(':', '_')}.png`, { type: 'image/png' }); if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ title: `Ayat Pilihan: ${verse?.chapterName} ${verse?.verse_key}`, text: `"${verse?.translation}" (Q.S. ${verse?.chapterName}: ${verse?.verse_key}) - Dibagikan dari Ayat Pilihan`, files: [file], }); toast.success('Berhasil dibagikan!', { id: shareToast }); return; } } const link = document.createElement('a'); link.download = `ayat-pilihan-${verse?.verse_key.replace(':', '_')}.png`; link.href = dataUrl; link.click(); toast.success('Gambar berhasil diunduh!', { id: shareToast }); } catch (err) { if (err instanceof Error && err.name === 'AbortError') { toast.dismiss(shareToast); } else { toast.error('Gagal membagikan gambar.', { id: shareToast }); } } }, [verse]);
  const handlePrevious = () => { if (currentVerseNumber && currentVerseNumber > 1) fetchSpecificVerse(currentVerseNumber - 1); };
  const handleNext = () => { if (currentVerseNumber && currentVerseNumber < 6236) fetchSpecificVerse(currentVerseNumber + 1); };
  const handlePlayPause = () => { if (isPlaying) { audioRef.current?.pause(); } else { setIsAudioLoading(true); audioRef.current?.play(); } };
  useEffect(() => { const audio = audioRef.current; if (audio) { const handlePlay = () => { setIsPlaying(true); setIsAudioLoading(false); }; const handlePause = () => setIsPlaying(false); const handleWaiting = () => setIsAudioLoading(true); audio.addEventListener('playing', handlePlay); audio.addEventListener('pause', handlePause); audio.addEventListener('ended', handlePause); audio.addEventListener('waiting', handleWaiting); return () => { audio.removeEventListener('playing', handlePlay); audio.removeEventListener('pause', handlePause); audio.removeEventListener('ended', handlePause); audio.removeEventListener('waiting', handleWaiting); }; } }, [verse]);

  return (
    <>
      <div className="absolute -z-10 -left-[9999px]">
        <QuoteCard ref={quoteCardRef} verse={verse} />
      </div>

      <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
        {verse && (
          <>
            <div className="rounded-xl bg-white p-6 sm:p-8 shadow-lg text-left w-full mb-6">
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Surah {verse.chapterName}</h2>
                <p className="mb-4 text-base sm:text-lg font-semibold text-gray-700">{verse.verse_key.replace(':', ' : ')}</p>
              </div>
              {verse.audioUrl && <audio ref={audioRef} src={verse.audioUrl} preload="auto" />}
              <p className="text-3xl sm:text-4xl leading-relaxed text-right dir-rtl mb-6 text-gray-800 font-quran">{verse.text_uthmani}</p>
              <p className="text-gray-800 text-base">{verse.translation}</p>
              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between gap-2">
                <button onClick={handlePrevious} disabled={isNavigating || !currentVerseNumber || currentVerseNumber <= 1} className="w-full px-3 py-2 text-sm sm:text-base bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 text-gray-800">‹ Sebelumnya</button>
                <button onClick={handleNext} disabled={isNavigating || !currentVerseNumber || currentVerseNumber >= 6236} className="w-full px-3 py-2 text-sm sm:text-base bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 text-gray-800">Berikutnya ›</button>
              </div>
            </div>

            <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {verse.audioUrl ? (
                <button onClick={handlePlayPause} disabled={isAudioLoading} className="justify-center rounded-full bg-green-500 px-4 py-3 sm:px-6 text-sm sm:text-base font-semibold text-white transition-all duration-200 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-wait">
                  {isAudioLoading ? 'Memuat...' : isPlaying ? '⏹️ Hentikan' : '▶️ Dengarkan'}
                </button>
              ) : (
                <button disabled className="justify-center rounded-full bg-gray-300 px-4 py-3 sm:px-6 text-sm sm:text-base font-semibold text-gray-500 cursor-not-allowed">Audio -</button>
              )}
              <button onClick={handleShare} className="justify-center rounded-full bg-blue-500 px-4 py-3 sm:px-6 text-sm sm:text-base font-semibold text-white transition hover:bg-blue-600">
                Bagikan ↗️
              </button>
            </div>
          </>
        )}
        
        {!verse && !isLoading && (
          <div className="text-center mb-8 mt-auto sm:mt-0">
            <h1 className="text-4xl font-bold text-gray-800">Ayat Pilihan</h1>
            <p className="mt-2 text-lg text-gray-600">Mulailah hari Anda atau temukan petunjuk di setiap momen.</p>
          </div>
        )}

        <div className={verse ? "mt-4" : "mt-auto sm:mt-8"}>
            <button onClick={fetchRandomVerse} disabled={isLoading} className="flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-xl font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:scale-100">
              {isLoading ? (<> <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"> <circle className="opacity-25" cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="4"></circle> <path className="opacity-75" fill="currentColor" d="M2 10a8 8 0 018-8v2.5a5.5 5.5 0 00-5.5 5.5H2z"></path> </svg> Mencari... </>) : ('CARI AYAT ACAK')}
            </button>
        </div>
      </div>
    </>
  );
}