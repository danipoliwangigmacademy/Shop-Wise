# PROMPT UNTUK AI AGENT ANTIGRAVITY — Finalisasi ShopWise-pro sebagai Landing Page Statis (Tanpa Database)

## ATURAN KINERJA (WAJIB DIPATUHI SEPANJANG TUGAS)
Aturan ini ada agar proses berjalan cepat dan tidak lemot:
- **Jangan gunakan terminal PowerShell atau CMD hanya untuk melihat/membaca file.** Dilarang memakai `type`, `cat`, `Get-Content`, `dir`, `tree`, `ls`, `findstr`, atau `Select-String` untuk sekadar membaca isi atau daftar file.
- **Selalu prioritaskan tool native untuk membaca file (`read_file` / `view`)** untuk memeriksa isi file proyek, dan tool pencarian/daftar file bawaan untuk melihat struktur.
- Gunakan terminal **hanya** bila benar-benar perlu menjalankan sesuatu (menghapus file, menjalankan server lokal, menjalankan skrip pengecekan). Gabungkan beberapa perintah dalam satu eksekusi, jangan satu per satu.
- Jangan membuka file vendor besar (`assets/vendor/**`, file `.min.js`, `.min.css`, `.map`, `.json`) untuk dibaca. Cukup periksa keberadaannya.
- Baca hanya bagian file yang dibutuhkan (rentang baris), jangan membaca seluruh file HTML berukuran besar berulang kali.
- Hindari mengulang pembacaan file yang sudah dibaca. Catat temuan, lalu lanjut bekerja.
- Lakukan perubahan yang sama di banyak halaman dengan **satu skrip batch** (find-and-replace terkontrol), bukan mengedit 15 file satu per satu.

## PERAN
Kamu adalah Senior Front-End Developer. Proyek **ShopWise-pro** (HTML + Bootstrap 5 + Bootstrap Icons + Swiper + GLightbox + Drift Zoom + `assets/js/main.js`, Bahasa Indonesia) sedang dijadikan **landing page statis tanpa database dan tanpa backend**. Semua interaksi berjalan 100% di browser. Pemesanan dilakukan lewat **WhatsApp** (sudah ada penangan klik tombol pesan di `assets/js/main.js`; periksa dan pertahankan).

## KONDISI PROYEK SAAT INI (sudah dibersihkan oleh pemilik)
File yang **sudah dihapus** dan **tidak boleh dibuat ulang**: `account.html`, `login.html`, `register.html`, `cart.html`, `checkout.html`, `order-confirmation.html`, `payment-methods.html`, `faq.html`, `search-results.html`, `starter-page.html`, `404.html`, `product-details.html` (root), serta folder `forms/` (`contact.php`, `newsletter.php`).

File halaman yang **masih ada**:
`index.html`, `about.html`, `category.html`, `contact.html`, `support.html`, `shiping-info.html`, `return-policy.html`, `privacy.html`, `tos.html`, `artikel.html` (root), `artikel/index.html`, `detail-produk/product-details.html`.

Aset: `assets/css/main.css`, `assets/js/main.js`, `assets/js/product-details.js`, `assets/img/**`, `assets/scss/**`, `assets/vendor/**`.

## ATURAN UMUM
1. **Pertahankan** desain, warna, tipografi, dan layout. Yang diperbaiki adalah tautan, form, dan sisa dependensi, bukan tampilan.
2. **Tanpa database & tanpa backend**: tidak ada PHP, SQL, atau API backend.
3. Gunakan hanya HTML, CSS, Bootstrap 5, dan JavaScript vanilla. Jangan menambah framework.
4. Penyimpanan data (bila perlu) hanya `localStorage` dalam `try/catch`.
5. Perubahan harus aman: setelah selesai tidak boleh ada error di console atau tautan 404.

## TUGAS

### TUGAS 1 — Perbaiki tautan ke halaman yang sudah dihapus (prioritas tertinggi)
Hampir semua halaman masih memuat tautan ke file yang sudah tidak ada, terutama di header (ikon akun/flyout), menu, dan footer ("Status Pesanan"):
- `account.html`, `login.html`, `register.html`, `cart.html`, `checkout.html`, `order-confirmation.html`, `faq.html`, `payment-methods.html`, `search-results.html`, `404.html`, `help.html`, `wishlist.html`, `orders.html`, `returns.html`, `store-locator.html`.

Aturan penggantian:
- Tautan akun/login/daftar → **hapus elemennya** (ikon akun, dropdown `.account-flyout`, tombol "Masuk"/"Daftar").
- "Status Pesanan" di footer → ganti ke `contact.html` atau tautan WhatsApp, ubah label menjadi "Hubungi Kami".
- Tautan keranjang/checkout (ikon tas, dropdown `.cart-flyout`, tombol "Lanjut ke Checkout", "Lihat semua keranjang") → **hapus komponennya**, karena alur keranjang sudah tidak ada. Gantikan dengan tombol **"Pesan via WhatsApp"** bila perlu.
- `returns.html` → `return-policy.html`; `help.html` → `support.html`; `faq.html` → hapus item menu (atau `support.html`).
- `wishlist.html`, `orders.html`, `store-locator.html` → hapus item menu.
- Perhatikan perbedaan path: halaman di `artikel/` dan `detail-produk/` memakai awalan `../`.

Setelah selesai, buat satu pengecekan otomatis yang menelusuri semua `href`, `src`, dan `action` di seluruh `.html` lalu melaporkan referensi ke file yang tidak ada. Targetnya nol.

### TUGAS 2 — Bersihkan sisa dependensi PHP
- Hapus `<script src=".../php-email-form/validate.js">` dari **semua** halaman (path `assets/` atau `../assets/`).
- **Newsletter di footer** (`<form action="forms/newsletter.php" ... class="php-email-form">`): hapus `action`, `method`, dan class `php-email-form`, serta blok `loading / error-message / sent-message`. Ganti menjadi validasi email di sisi klien dengan pesan sukses via **toast/alert Bootstrap**, atau ganti dengan tombol "Hubungi via WhatsApp". Tidak mengirim data ke mana pun.
- **`contact.html`** (`forms/contact.php`): ubah submit menjadi pembukaan `https://wa.me/<NOMOR>?text=<encodeURIComponent(isi form)>` di tab baru, dengan validasi Bootstrap (`novalidate` + `needs-validation`) dan pesan error berbahasa Indonesia. Letakkan nomor WhatsApp sebagai satu konstanta di `assets/js/main.js` (placeholder `6281234567890`, beri komentar agar diganti).
- Pastikan form pencarian di header (`form.search-bar`, `form.mobile-search`) tidak mengarah ke halaman yang sudah dihapus. Pilih salah satu: (a) hapus formnya, atau (b) jadikan filter sisi klien yang menyaring kartu produk di `category.html`. Hapus juga data terstruktur (JSON-LD `SearchAction`) di `index.html` yang menunjuk ke `search-results.html`.

### TUGAS 3 — Pastikan alur pemesanan WhatsApp berfungsi
- Periksa `assets/js/main.js` (penangan klik `.cart-btn`, `.add-cart-btn`, `[aria-label*="keranjang"]`, dan tombol di halaman detail produk). Pastikan semuanya membuka WhatsApp dengan pesan berisi nama produk, harga, dan URL produk, dan tidak lagi menyisakan logika keranjang (`ecommerceCartTools`, `.cart-item`) yang tidak terpakai.
- Ubah label tombol yang masih berbunyi "Tambah ke Keranjang" menjadi **"Pesan via WhatsApp"** (ikon boleh `bi-whatsapp`) agar jujur sesuai fungsinya. Perbarui `aria-label` yang sesuai.
- Hapus `href="#"` pada tombol agar halaman tidak melompat ke atas.

### TUGAS 4 — Bersihkan file aset yang tidak terpakai
Hapus lewat **satu perintah/skrip** setelah Tugas 1 dan 2 selesai:
- `assets/vendor/php-email-form/` (seluruh folder).
- `assets/vendor/bootstrap/css/`: hapus semua `.map`, semua `*.rtl.*`, `bootstrap-grid*`, `bootstrap-reboot*`, `bootstrap-utilities*`, dan `bootstrap.css`. **Pertahankan hanya `bootstrap.min.css`.**
- `assets/vendor/bootstrap/js/`: hapus semua `.map`, `bootstrap.esm*`, `bootstrap.js`, `bootstrap.min.js`, `bootstrap.bundle.js`. **Pertahankan hanya `bootstrap.bundle.min.js`.**
- `assets/vendor/bootstrap-icons/`: hapus `bootstrap-icons.json`, `bootstrap-icons.scss`, `bootstrap-icons.min.css`. **Pertahankan `bootstrap-icons.css` dan folder `fonts/`.**
- `assets/vendor/drift-zoom/`: hapus `Drift.js`, `drift-basic.min.css`, `Drift.min.js.map`. Pertahankan `Drift.min.js` dan `drift-basic.css`.
- `assets/vendor/glightbox/`: hapus `css/glightbox.css` dan `js/glightbox.js` (non-min).
- `assets/vendor/purecounter/purecounter_vanilla.js.map` dan `assets/vendor/swiper/swiper-bundle.min.js.map`.
- `assets/img/logo.webp` (tidak terpakai; yang dipakai `logo-shopwise.webp`). **Jangan hapus** `favicon.png` dan `apple-touch-icon.png`: tambahkan `<link rel="icon" href="assets/img/favicon.png">` dan `<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">` di `<head>` semua halaman (sesuaikan `../` untuk subfolder).
- `assets/scss/`: situs memakai `assets/css/main.css`, bukan SCSS. Hapus seluruh folder `assets/scss/` **kecuali** pemilik ingin tetap meng-compile ulang. Bila diragukan, hapus minimal `_account.scss`, `_login.scss`, `_register.scss`, `_cart.scss`, `_checkout.scss`, `_order-confirmation.scss`, `_paymnt-methods.scss`, `_search-results-header.scss`, `_search-product-list.scss`, `_starter-section.scss`, `_error-404.scss`, `_faq.scss`, dan hapus `@import`-nya di `_sections.scss`.
- `artikel.html` di root: bila file kosong (0 byte), hapus.
- **Jangan menyentuh** folder `.git`.

### TUGAS 5 — Optimasi ringan agar halaman cepat dimuat
- Tambahkan `loading="lazy"` dan `decoding="async"` pada `<img>` yang berada di bawah layar pertama (jangan pada logo dan gambar hero). Pastikan setiap `<img>` punya atribut `alt`.
- Library yang hanya dipakai di sebagian halaman (Drift Zoom, GLightbox, PureCounter, Swiper) cukup dimuat di halaman yang memakainya. Periksa dulu pemakaiannya dengan pencarian teks (bukan membuka file vendor), lalu hapus tag `<script>`/`<link>` yang tidak dibutuhkan di halaman lain.
- Beri atribut `defer` pada skrip yang tidak harus berjalan sebelum render.

### TUGAS 6 — Perbarui dokumentasi
Ubah `Readme.txt`: daftar halaman akhir, cara mengganti nomor WhatsApp admin, dan cara menjalankan (cukup buka `index.html` atau jalankan server statis; tanpa PHP/database).

## URUTAN KERJA
1. Daftarkan struktur proyek dengan tool native, lalu catat rencana singkat.
2. Tugas 1 → Tugas 2 → Tugas 3 (satu skrip batch untuk perubahan berulang antar halaman).
3. Jalankan pengecekan tautan rusak (hasil harus nol).
4. Tugas 4 (hapus aset) → ulangi pengecekan tautan.
5. Tugas 5 → Tugas 6.
6. Laporan akhir.

## KRITERIA SELESAI
- [ ] Tidak ada referensi ke file yang sudah dihapus, tidak ada tautan 404.
- [ ] Tidak ada referensi ke PHP (`.php`, `php-email-form`, `validate.js`).
- [ ] Tidak ada ikon/dropdown akun, login, daftar, keranjang, atau checkout yang tersisa.
- [ ] Tombol pesan membuka WhatsApp dengan data produk yang benar; form kontak membuka WhatsApp.
- [ ] Tampilan visual tetap sama, responsif di mobile, tanpa error console.
- [ ] Laporan akhir berisi daftar file yang diubah dan dihapus.