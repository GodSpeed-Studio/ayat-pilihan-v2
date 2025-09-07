'use client';

import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function SharePage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [verseInfo, setVerseInfo] = useState<string>('Ayat Pilihan');

  useEffect(() => {
    // Ambil data gambar dan info dari sessionStorage saat halaman dimuat
    const storedImage = sessionStorage.getItem('shareImage');
    const storedInfo = sessionStorage.getItem('shareInfo');
    if (storedImage) {
      setImageUrl(storedImage);
    }
    if (storedInfo) {
      setVerseInfo(storedInfo);
    }
  }, []);

  const handleFinalShare = async () => {
    if (!imageUrl) return;

    try {
      // Ubah dataUrl kembali menjadi file untuk di-share
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `ayat-pilihan.png`, { type: 'image/png' });

      // Gunakan Web Share API yang sekarang sudah pasti didukung
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: verseInfo,
          text: `Dibagikan dari Ayat Pilihan`,
          files: [file],
        });
      } else {
        // Fallback jika ternyata masih tidak bisa (sangat jarang terjadi di browser modern)
        toast.error('Gagal membagikan. Silakan simpan gambar secara manual dengan menekan lama.');
      }
    } catch (error) {
      console.error('Share failed:', error);
      toast.error('Gagal membagikan, silakan coba lagi.');
    }
  };

  if (!imageUrl) {
    return <div className="flex items-center justify-center min-h-screen">Memuat gambar...</div>;
  }

  return (
    <>
      <Toaster />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">{verseInfo}</h1>
        <img src={imageUrl} alt="Gambar Ayat Pilihan" className="max-w-full sm:max-w-md rounded-lg shadow-xl" />
        <p className="mt-4 text-gray-600 text-center">Tekan tombol di bawah untuk berbagi, atau tekan lama pada gambar untuk menyimpan.</p>
        <button
          onClick={handleFinalShare}
          className="w-full max-w-md mt-6 rounded-lg bg-green-500 px-8 py-4 text-xl font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-600"
        >
          Bagikan Sekarang
        </button>
      </main>
    </>
  );
}