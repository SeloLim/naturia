# Naturia - E-commerce Skincare Pelanggan

Aplikasi e-commerce yang menghadap pelanggan untuk brand skincare fiktif "Naturia." Platform ini terintegrasi dengan API dari sistem Admin Naturia untuk menyediakan pengalaman belanja yang lengkap.

**Demo Langsung:** [https://naturia-selo-lim.vercel.app/](https://naturia-selo-lim.vercel.app/)

## Fitur Utama

* **Penjelajahan Produk:**
    * Lihat semua produk
    * Filter berdasarkan kategori
    * Pencarian produk
* **Halaman Detail Produk:** Informasi lengkap, gambar, harga.
* **Keranjang Belanja:** Tambah, lihat, ubah jumlah, hapus produk dari keranjang.
* **Proses Checkout:** Input alamat pengiriman, ringkasan pesanan.
* **Simulasi Pembayaran:** Mockup proses pembayaran.
* **Manajemen Akun Pengguna:** (Profil, riwayat pesanan, alamat pengguna)

## Tampilan Aplikasi (Contoh Screenshot)
![image](https://github.com/user-attachments/assets/d1209d41-b791-4f4c-ae4a-6605beb68bdc)
![image](https://github.com/user-attachments/assets/89299ef6-7bf6-4b84-b193-d4ba99107243)


## Teknologi yang Digunakan

* **Frontend & Backend:** Next.js (v15.3.1)
* **Bahasa:** TypeScript (v5.8.3)
* **Styling:** Tailwind CSS (v4.1.4)
* **UI Components:** Shadcn/ui
* **Database & Backend Services:** Supabase (PostgreSQL)
* **Validasi Skema:** Zod
* **Runtime:** Bun (v1.2.9)
* **Linting:** ESLint

## Memulai Proyek (Getting Started)

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Pastikan Aplikasi Naturia Admin Berjalan dan Dapat Diakses**
    Karena aplikasi ini bergantung pada API dari Naturia Admin, pastikan instance Naturia Admin (baik lokal maupun yang di-deploy) aktif dan URL API-nya diketahui.

2.  **Clone repositori:**
    ```bash
    git clone https://github.com/SeloLim/naturia.git
    cd naturia
    ```

3.  **Install dependencies menggunakan Bun:**
    ```bash
    bun install
    ```

4.  **Setup Environment Variables:**
    Buat file `.env.local` di root proyek. Anda akan membutuhkan URL API dari aplikasi Naturia Admin.
    ```env
    NEXT_PUBLIC_ADMIN_API_URL=
    ACCESS_TOKEN_KEY=
    REFRESH_TOKEN_KEY=
    ```

5.  **Jalankan server pengembangan Next.js:**
    ```bash
    bun dev
    ```
    Buka [http://localhost:3000](http://localhost:3000) (atau port lain jika 3000 sudah terpakai) di browser Anda.
---
