"use client";

import React, { useState, useEffect, useCallback } from "react"; // Import useCallback
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Definisikan interface Banner (Pastikan sesuai dengan struktur data dari API)
interface Banner {
  id: number;
  title?: string;
  image_url: string;
  description?: string;
  redirect_url?: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

// URL API Web Admin - GANTI INI SAAT DEPLOY KE PRODUKSI
// Pastikan environment variable NEXT_PUBLIC_ADMIN_API_URL sudah disetel di web customer
const ADMIN_API_URL =
  process.env.NEXT_PUBLIC_ADMIN_API_URL + "/api/banners";

const BannerCarousel = () => {
  // State untuk menyimpan data banner yang diambil dari API
  const [banners, setBanners] = useState<Banner[]>([]);
  // State untuk indikator loading saat fetching data
  const [isLoading, setIsLoading] = useState(true);
  // State untuk error jika fetching data gagal
  const [error, setError] = useState<string | null>(null);

  // State untuk indeks slide saat ini
  const [current, setCurrent] = useState(0);
  // State untuk mengontrol auto-play
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // --- Fungsi untuk mengambil data banner dari API (sama seperti di contoh parent admin) ---
  const fetchBanners = useCallback(async () => {
    setIsLoading(true); // Set loading saat fetching
    setError(null); // Clear error sebelumnya

    try {
      const response = await fetch(ADMIN_API_URL); // Panggil API GET banners di web Admin

      if (!response.ok) {
        let errorMsg = `Failed to fetch banners: ${response.status} ${response.statusText}`;

        try {
          const errorData = await response.json();

          errorMsg = errorData.message || errorMsg;
        } catch {
          // abaikan jika respons bukan JSON
        }
        throw new Error(errorMsg);
      }

      const data: Banner[] = await response.json();
      // Filter banner yang aktif di frontend jika API mengembalikan semua banner
      const activeBanners = data.filter((banner) => banner.is_active);

      // Data dari API GET sudah diurutkan berdasarkan display_order
      setBanners(activeBanners); // Gunakan data yang sudah difilter (hanya yang aktif)
      setIsLoading(false);
    } catch (err: unknown) {
      let errorMessage = "Failed to load banners";

      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      setIsLoading(false);
    }
  }, []); // Dependency array kosong karena URL API konstan

  // --- Effect untuk memuat data saat komponen pertama kali di-mount ---
  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]); // Panggil fetchBanners saat pertama kali di-mount (karena fetchBanners di-memoize oleh useCallback)

  // Fungsi untuk pindah ke slide berikutnya
  const nextSlide = useCallback(() => {
    // Pindah ke slide berikutnya, kembali ke 0 jika sudah di slide terakhir
    // Gunakan banners.length untuk jumlah slide yang sebenarnya
    setCurrent(current === banners.length - 1 ? 0 : current + 1);
  }, [current, banners.length]); // Dependency: current dan banners.length

  // Fungsi untuk pindah ke slide sebelumnya
  const prevSlide = useCallback(() => {
    // Pindah ke slide sebelumnya, kembali ke slide terakhir jika sudah di slide pertama
    // Gunakan banners.length untuk jumlah slide yang sebenarnya
    setCurrent(current === 0 ? banners.length - 1 : current - 1);
  }, [current, banners.length]); // Dependency: current dan banners.length

  // --- Auto play carousel ---
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isAutoPlaying && banners.length > 1) {
      // Auto play hanya jika ada > 1 banner
      interval = setInterval(() => {
        nextSlide();
      }, 5000); // Ganti 5000ms (5 detik) sesuai keinginan
    }

    // Cleanup function untuk membersihkan interval
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [current, isAutoPlaying, banners.length, nextSlide]); // Dependency: current, isAutoPlaying, banners.length, dan nextSlide

  // --- Tampilan Loading, Error, atau No Banners ---
  if (isLoading) {
    return (
      <div className="relative w-full max-w-7xl mx-auto h-[600px] flex items-center justify-center bg-gray-100 rounded-md shadow-lg">
        Loading Banners...
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full max-w-7xl mx-auto h-[600px] flex items-center justify-center bg-red-100 text-red-800 rounded-md shadow-lg">
        Error loading banners: {error}
      </div>
    );
  }

  // Tampilkan pesan jika tidak ada banner aktif setelah fetching
  if (banners.length === 0) {
    return (
      <div className="relative w-full max-w-7xl mx-auto h-[600px] flex items-center justify-center bg-gray-100 rounded-md shadow-lg">
        No active banners available.
      </div>
    );
  }

  // --- Tampilan Carousel jika data berhasil dimuat dan ada banner ---
  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-md shadow-lg">
      <div className="relative h-[400px] md:h-[600px] bg-gray-100">
        {" "}
        {/* Sesuaikan tinggi sesuai desain banner */}
        {/* Slides */}
        {banners.map(
          (
            banner,
            index, // Map dari state 'banners'
          ) => (
            <div
              key={banner.id} // Gunakan ID banner sebagai key
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                index === current ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* Gunakan tag <a> untuk membuat banner bisa diklik */}
              {/* Arahkan ke redirect_url banner jika ada, atau '#' jika tidak */}
              <Link
                href={banner.redirect_url || "#"}
                rel={banner.redirect_url ? "noopener noreferrer" : undefined}
                target={banner.redirect_url ? "_blank" : "_self"}
              >
                <Image
                  alt={banner.title || `Banner ${banner.id}`} // Gunakan title atau ID sebagai alt text
                  className="object-cover w-full h-full"
                  // Atur ukuran width dan height sesuai rekomendasi atau ukuran umum carousel
                  // Ini membantu next/image menentukan layout, tidak harus ukuran persis file
                  height={400} // Sesuaikan dengan tinggi div parent atau rasio gambar
                  priority={index === 0} // Prioritaskan loading gambar pertama
                  src={banner.image_url} // Gunakan image_url dari data banner
                  width={1200}
                />
              </Link>

              {/* Shop Now Button - Opsional, bisa dihapus jika banner itu sendiri yang diklik */}
              {/* Jika tombol ini dibutuhkan, sesuaikan href/onClick nya */}
              {/* <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
               <button className="bg-white text-textColor-primary font-bold py-3 px-8 rounded-full hover:bg-logo-secondary hover:text-white transition duration-300 shadow-lg">
                 Shop Now
               </button>
             </div> */}
            </div>
          ),
        )}
        {/* Arrow Controls */}
        {/* Tampilkan kontrol panah hanya jika ada lebih dari satu banner */}
        {banners.length > 1 && (
          <>
            <button
              aria-label="Previous Slide" // Aksesibilitas
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 z-10"
              onClick={prevSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              aria-label="Next Slide" // Aksesibilitas
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-70 z-10"
              onClick={nextSlide}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
        {/* Indicators */}
        {/* Tampilkan indikator hanya jika ada lebih dari satu banner */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            <div className="bg-black/30 backdrop-blur-lg rounded-full px-2">
              {banners.map(
                (
                  _,
                  index, // Map dari state 'banners'
                ) => (
                  <button
                    key={index} // Index aman digunakan untuk key di sini
                    aria-label={`Go to slide ${index + 1}`} // Aksesibilitas
                    className={`w-3 h-3 rounded-full mx-1 ${
                      index === current
                        ? "bg-white" // Ganti dengan warna indikator aktif
                        : "bg-white/50 " // Ganti dengan warna indikator non-aktif
                    }`}
                    onClick={() => {
                      setCurrent(index);
                      setIsAutoPlaying(false); // Matikan auto-play saat indikator diklik
                    }}
                    onMouseEnter={() => setIsAutoPlaying(false)} // Matikan auto-play saat mouse diarahkan
                    onMouseLeave={() => setIsAutoPlaying(true)}
                  />
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerCarousel;
