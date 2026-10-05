========================================================================
SHOPWISE-PRO — LANDING PAGE STATIS E-COMMERCE BERBASIS WHATSAPP
========================================================================

ShopWise-pro adalah website landing page & katalog e-commerce modern yang 
100% statis (HTML, CSS, Bootstrap 5, dan Vanilla JavaScript).
Website ini TIDAK memerlukan database, PHP, atau backend server.
Semua alur pemesanan dan pertanyaan pelanggan langsung terintegrasi ke WhatsApp Admin.

------------------------------------------------------------------------
1. DAFTAR HALAMAN AKTIF
------------------------------------------------------------------------
- index.html                      : Halaman Beranda (Hero Slider, Kategori Pilihan, Produk Populer, CTA)
- about.html                      : Profil Toko, Keunggulan, Milestone & Tim
- category.html                   : Katalog Produk Lengkap (Filter Harga, Merek, Warna, Kategori & Pencarian)
- contact.html                    : Halaman Kontak dengan Form Terhubung Langsung ke WhatsApp
- support.html                    : Pusat Bantuan & Pertanyaan Umum (FAQ)
- shiping-info.html               : Kebijakan & Informasi Ekspedisi/Pengiriman
- return-policy.html              : Ketentuan Retur & Garansi Penukaran Produk
- privacy.html                    : Kebijakan Privasi
- tos.html                        : Syarat & Ketentuan Layanan
- artikel.html                    : Halaman Kumpulan Artikel, Tips Mode, dan Tren Belanja
- artikel/index.html              : Halaman Isi / Detail Membaca Artikel Inspiratif
- detail-produk/product-details.html : Detail Produk Lengkap (Zoom Gambar Drift, Pilih Varian Warna, Jumlah, dan Tombol Pesan via WhatsApp)

------------------------------------------------------------------------
2. CARA MENGGANTI NOMOR WHATSAPP ADMIN
------------------------------------------------------------------------
Nomor WhatsApp Admin dipusatkan dalam satu variabel di file JavaScript:
  File: assets/js/main.js
  Baris: ~810 (Cari komentar: PENGATURAN WHATSAPP & INTEGRASI PEMESANAN)

Contoh baris kode:
  const WHATSAPP_PHONE = '62895639068080';

Aturan penggantian nomor:
- Gunakan format internasional tanpa tanda plus (+), spasi, atau tanda strip (-).
- Contoh Indonesia: Jika nomor Anda 0812-3456-7890, ubah menjadi:
  const WHATSAPP_PHONE = '6281234567890';

Setelah diganti, seluruh tombol "Pesan via WhatsApp", "Beli Sekarang",
serta form pengiriman pesan di contact.html akan otomatis terhubung ke nomor tersebut.

------------------------------------------------------------------------
3. CARA MENJALANKAN WEBSITE
------------------------------------------------------------------------
Website ini 100% statis di sisi browser (Client-Side). Anda dapat menjalankannya dengan:

Cara A (Paling Mudah):
- Cukup klik dua kali (double click) file "index.html" untuk membukanya di browser apa pun (Chrome, Edge, Firefox, Safari).

Cara B (Menggunakan Local Server Statis - Opsional):
- Laragon / XAMPP: Cukup letakkan folder di www atau htdocs, lalu buka http://localhost/ShopWise-pro/
- Live Server (VS Code Extension): Klik kanan "index.html" -> Open with Live Server.
- Node.js (npx serve): Jalankan `npx serve .` di terminal.
- Python: Jalankan `python -m http.server 8000`.

TIDAK DIPERLUKAN:
- Tidak perlu install database MySQL / MariaDB.
- Tidak perlu Apache/PHP running untuk memproses formulir.
- Tidak ada konfigurasi server backend atau API key berbayar.

------------------------------------------------------------------------
4. FITUR UTAMA
------------------------------------------------------------------------
1. Direct WhatsApp Order:
   - Pelanggan memilih produk, ukuran/warna, dan jumlah di detail produk, lalu menekan "Pesan via WhatsApp".
   - WhatsApp Web / Aplikasi WhatsApp akan langsung terbuka dengan draf pesan otomatis berisi:
     Nama Produk, Harga, Pilihan Warna, Jumlah, dan Link URL Produk terkait.
2. Filter & Pencarian Sisi Klien:
   - Pencarian di header dan katalog secara dinamis menyaring produk tanpa reload server.
3. Desain Responsif & Cepat:
   - Menggunakan Bootstrap 5 terbaru, Bootstrap Icons, dan optimasi gambar modern (.webp).
   - Penggunaan vendor script dipisah secara modular agar halaman sangat ringan dan cepat dimuat.
4. Validasi Form Kontak & Newsletter:
   - Form kontak divalidasi dengan Bootstrap 5 needs-validation sebelum meneruskan ke WhatsApp.
   - Newsletter footer menampilkan feedback langsung via Bootstrap Toast tanpa me-refresh halaman.

========================================================================
Hak Cipta (c) ShopWise. Seluruh Hak Dilindungi.
========================================================================
