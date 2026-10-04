/**
 * ShopWise - Dynamic Product Details Loader
 * Enables product pages to dynamically load product content based on URL parameters or product ID.
 */

(function() {
  'use strict';

  // Comprehensive Product Database for all items in index.html and catalog
  const PRODUCTS_CATALOG = {
    'hub-audio-presisi': {
      id: 'hub-audio-presisi',
      title: 'Hub Audio Presisi',
      category: 'Audio & Elektronik',
      badge: 'Terlaris',
      price: 219.00,
      oldPrice: 299.00,
      image: 'assets/img/product/product-6.webp',
      thumbnails: [
        'assets/img/product/product-6.webp',
        'assets/img/product/product-1.webp',
        'assets/img/product/product-3.webp',
        'assets/img/product/product-4.webp',
        'assets/img/product/product-10.webp'
      ],
      rating: 4.8,
      reviewsCount: 210,
      stock: 15,
      description: 'Hub Audio Presisi menghadirkan performa audio resolusi tinggi dengan transmisi nirkabel tanpa latensi, material paduan aluminium premium, dan peredam bising aktif untuk kenyamanan mendengarkan sepanjang hari.',
      specs: [
        { label: 'Konektivitas', value: 'Bluetooth 5.3 & USB-C Audio' },
        { label: 'Respons Frekuensi', value: '20 Hz – 40.000 Hz' },
        { label: 'Daya Tahan Baterai', value: 'Hingga 36 Jam Pemakaian' },
        { label: 'Material', value: 'Anodized Aluminum & Memory Foam' },
        { label: 'Garansi', value: '2 Tahun Resmi Distributor' }
      ]
    },
    'jam-tangan-pintar-pro': {
      id: 'jam-tangan-pintar-pro',
      title: 'Jam Tangan Pintar Pro',
      category: 'Smartwatch & Aksesori',
      badge: 'Sedang Trending',
      price: 159.00,
      oldPrice: 229.00,
      image: 'assets/img/product/product-3.webp',
      thumbnails: [
        'assets/img/product/product-3.webp',
        'assets/img/product/product-9.webp',
        'assets/img/product/product-4.webp',
        'assets/img/product/product-11.webp',
        'assets/img/product/product-6.webp'
      ],
      rating: 4.7,
      reviewsCount: 185,
      stock: 22,
      description: 'Jam Tangan Pintar Pro dengan layar retina AMOLED tajam, pelacakan kebugaran dan detak jantung real-time, GPS presisi tinggi, dan daya tahan air 5ATM untuk mendukung gaya hidup aktif Anda.',
      specs: [
        { label: 'Layar', value: '1.43" AMOLED Always-on Display' },
        { label: 'Sensor Kesehatan', value: 'Detak Jantung, SpO2, Kualitas Tidur' },
        { label: 'Ketahanan Air', value: '5 ATM (hingga 50 meter)' },
        { label: 'Kapasitas Baterai', value: 'Hingga 14 Hari Pemakaian Normal' },
        { label: 'Konektivitas', value: 'Bluetooth 5.2, GPS Terintegrasi' }
      ]
    },
    'kamera-pendamping-harian': {
      id: 'kamera-pendamping-harian',
      title: 'Kamera Pendamping Harian',
      category: 'Kamera & Fotografi',
      badge: 'Baru Diluncurkan',
      price: 99.00,
      oldPrice: 149.00,
      image: 'assets/img/product/product-10.webp',
      thumbnails: [
        'assets/img/product/product-10.webp',
        'assets/img/product/product-3.webp',
        'assets/img/product/product-6.webp',
        'assets/img/product/product-4.webp',
        'assets/img/product/product-9.webp'
      ],
      rating: 4.6,
      reviewsCount: 94,
      stock: 12,
      description: 'Desain ringkas dan tangguh dengan fitur canggih untuk mengabadikan setiap momen terbaik Anda. Dilengkapi sensor sensitivitas tinggi dan lensa sudut lebar untuk foto dan video 4K jernih.',
      specs: [
        { label: 'Resolusi Sensor', value: '24 Megapiksel 4K Ultra HD' },
        { label: 'Lensa', value: 'Wide Angle f/2.0 Glass Lens' },
        { label: 'Stabilisasi Gambar', value: 'Optical Image Stabilization (OIS)' },
        { label: 'Penyimpanan', value: 'Slot MicroSD hingga 256GB' },
        { label: 'Konektivitas', value: 'Wi-Fi & Bluetooth Instant Share' }
      ]
    },
    'lampu-meja-ergonomis': {
      id: 'lampu-meja-ergonomis',
      title: 'Lampu Meja Ergonomis',
      category: 'Rumah & Kantor',
      badge: 'Populer',
      price: 64.00,
      oldPrice: 85.00,
      image: 'assets/img/product/product-5.webp',
      thumbnails: [
        'assets/img/product/product-5.webp',
        'assets/img/product/product-2.webp',
        'assets/img/product/product-8.webp',
        'assets/img/product/product-4.webp',
        'assets/img/product/product-9.webp'
      ],
      rating: 4.5,
      reviewsCount: 88,
      stock: 30,
      description: 'Pencahayaan ramah mata dan hemat energi untuk produktivitas maksimal. Desain leher fleksibel 360 derajat dengan kontrol sentuh pengaturan temperatur warna dan tingkat kecerahan.',
      specs: [
        { label: 'Daya', value: '12W LED Hemat Energi' },
        { label: 'Temperatur Warna', value: '3000K – 6500K (5 Pilihan Warna)' },
        { label: 'Tingkat Kecerahan', value: '10 Tingkat Kontrol Sentuh' },
        { label: 'Fitur Tambahan', value: 'Port USB Pengisi Daya Smartphone' }
      ]
    },
    'diffuser-aroma-keramik': {
      id: 'diffuser-aroma-keramik',
      title: 'Diffuser Aroma Keramik',
      category: 'Rumah & Gaya Hidup',
      badge: 'Aromaterapi',
      price: 42.00,
      oldPrice: 58.00,
      image: 'assets/img/product/product-8.webp',
      thumbnails: [
        'assets/img/product/product-8.webp',
        'assets/img/product/product-5.webp',
        'assets/img/product/product-2.webp',
        'assets/img/product/product-4.webp',
        'assets/img/product/product-9.webp'
      ],
      rating: 4.7,
      reviewsCount: 104,
      stock: 25,
      description: 'Menyebarkan aroma relaksasi alami untuk kenyamanan ruangan Anda. Dibuat dengan lapisan keramik bertekstur matte buatan tangan dan teknologi ultrasonik hening.',
      specs: [
        { label: 'Kapasitas Tangki', value: '300 ml (Hingga 10 Jam Kabut)' },
        { label: 'Teknologi', value: 'Ultrasonik Dingin 2.4 MHz' },
        { label: 'Pencahayaan', value: 'Lampu LED Hangat dengan Mode Redup' },
        { label: 'Keamanan', value: 'Auto Shut-off saat Air Habis' }
      ]
    },
    'jam-dinding-minimalis': {
      id: 'jam-dinding-minimalis',
      title: 'Jam Dinding Minimalis',
      category: 'Dekorasi Rumah',
      badge: 'Diskon',
      price: 37.00,
      oldPrice: 55.00,
      image: 'assets/img/product/product-2.webp',
      thumbnails: [
        'assets/img/product/product-2.webp',
        'assets/img/product/product-8.webp',
        'assets/img/product/product-5.webp',
        'assets/img/product/product-1.webp',
        'assets/img/product/product-6.webp'
      ],
      rating: 4.4,
      reviewsCount: 62,
      stock: 19,
      description: 'Sentuhan estetika modern dan elegan untuk mempercantik dinding rumah. Gerakan jarum jam senyap (silent sweep) tanpa suara detak mengganggu kenyamanan istirahat.',
      specs: [
        { label: 'Diameter', value: '30 cm / 12 Inci' },
        { label: 'Gerakan Mesin', value: 'Quartz Sweep Silent Movement' },
        { label: 'Material Kaca', value: 'Kaca Mineral Anti Pantul' },
        { label: 'Daya', value: '1 x Baterai AA (Tahan 12 Bulan)' }
      ]
    },
    'bantalan-pengisi-daya-nirkabel': {
      id: 'bantalan-pengisi-daya-nirkabel',
      title: 'Bantalan Pengisi Daya Nirkabel',
      category: 'Elektronik & Aksesori',
      badge: 'Terpanas',
      price: 29.00,
      oldPrice: 45.00,
      image: 'assets/img/product/product-9.webp',
      thumbnails: [
        'assets/img/product/product-9.webp',
        'assets/img/product/product-3.webp',
        'assets/img/product/product-4.webp',
        'assets/img/product/product-6.webp',
        'assets/img/product/product-10.webp'
      ],
      rating: 4.8,
      reviewsCount: 156,
      stock: 45,
      description: 'Pengisian daya cepat tanpa kabel kusut untuk ponsel pintar Anda. Mendukung fast charging hingga 15W dengan sistem pendingin pintar untuk keamanan baterai gawai.',
      specs: [
        { label: 'Output Daya', value: '15W / 10W / 7.5W / 5W Fast Charge' },
        { label: 'Kompatibilitas', value: 'Perangkat Berstandar Qi (iPhone & Android)' },
        { label: 'Konektor Input', value: 'USB Type-C' },
        { label: 'Ketebalan', value: 'Hanya 6.5 mm (Ultra Tipis)' }
      ]
    },
    'stasiun-daya-portabel': {
      id: 'stasiun-daya-portabel',
      title: 'Stasiun Daya Portabel',
      category: 'Elektronik & Outdoor',
      badge: 'Kapasitas Tinggi',
      price: 175.00,
      oldPrice: 240.00,
      image: 'assets/img/product/product-4.webp',
      thumbnails: [
        'assets/img/product/product-4.webp',
        'assets/img/product/product-9.webp',
        'assets/img/product/product-6.webp',
        'assets/img/product/product-3.webp',
        'assets/img/product/product-10.webp'
      ],
      rating: 4.9,
      reviewsCount: 73,
      stock: 8,
      description: 'Kapasitas daya besar dan andal untuk aktivitas luar ruangan maupun darurat pemadaman listrik. Dilengkapi stopkontak AC, USB-C 65W PD, dan indikator baterai digital.',
      specs: [
        { label: 'Kapasitas', value: '80.000 mAh (296 Wh)' },
        { label: 'Output AC', value: '220V Pure Sine Wave 300W Peak' },
        { label: 'Port Output', value: '2x USB-A, 1x USB-C PD, 1x AC, 1x DC' },
        { label: 'Fitur', value: 'Lampu Senter LED Darurat Multi-Mode' }
      ]
    },
    'ransel-teknologi-urban': {
      id: 'ransel-teknologi-urban',
      title: 'Ransel Teknologi Urban',
      category: 'Tas & Ransel',
      badge: 'Baru',
      price: 89.00,
      oldPrice: 120.00,
      image: 'assets/img/product/product-1.webp',
      thumbnails: [
        'assets/img/product/product-1.webp',
        'assets/img/product/product-6.webp',
        'assets/img/product/product-8.webp',
        'assets/img/product/product-11.webp',
        'assets/img/product/product-12.webp'
      ],
      rating: 4.6,
      reviewsCount: 112,
      stock: 20,
      description: 'Kompartemen cerdas tahan cuaca yang ideal bagi para profesional modern. Dilengkapi saku laptop berbusa tebal, material tahan percikan air, dan port pengisian daya eksternal.',
      specs: [
        { label: 'Kompartemen Laptop', value: 'Muat hingga 15.6 Inci' },
        { label: 'Kapasitas', value: '22 Liter' },
        { label: 'Material', value: 'Polyester Oxford 900D Tahan Air' },
        { label: 'Keamanan', value: 'Saku Belakang Tersembunyi Anti Maling' }
      ]
    },
    'sendal-slip-on': {
      id: 'sendal-slip-on',
      title: 'Sendal Slip-on',
      category: 'Sepatu & Sandal',
      badge: 'Edisi Terbatas',
      price: 149.00,
      oldPrice: 189.00,
      image: 'assets/img/product/product-5.webp',
      thumbnails: [
        'assets/img/product/product-5.webp',
        'assets/img/product/product-8.webp',
        'assets/img/product/product-11.webp',
        'assets/img/product/product-2.webp',
        'assets/img/product/product-7.webp'
      ],
      rating: 4.2,
      reviewsCount: 24,
      stock: 14,
      description: 'Sendal slip-on ergonomis dengan bantalan telapak empuk berbahan EVA premium yang memberikan kenyamanan maksimal saat melangkah sepanjang hari di segala cuaca.',
      specs: [
        { label: 'Material Upper', value: 'Kulit Sintetis Lembut Breathable' },
        { label: 'Material Sol', value: 'Molded EVA Foam Anti-Slip' },
        { label: 'Gaya', value: 'Casual Slip-on' },
        { label: 'Warna Tersedia', value: 'Hitam, Biru Navy, Putih' }
      ]
    },
    'sepatu-canvas': {
      id: 'sepatu-canvas',
      title: 'Sepatu Canvas',
      category: 'Sepatu Kasual',
      badge: 'Diskon 25%',
      price: 165.00,
      oldPrice: 220.00,
      image: 'assets/img/product/product-8.webp',
      thumbnails: [
        'assets/img/product/product-8.webp',
        'assets/img/product/product-11.webp',
        'assets/img/product/product-5.webp',
        'assets/img/product/product-1.webp',
        'assets/img/product/product-2.webp'
      ],
      rating: 4.7,
      reviewsCount: 58,
      stock: 16,
      description: 'Sepatu canvas klasik dengan sol karet vulkanisir anti-slip dan sirkulasi udara optimal. Tampilan kasual yang selalu stylish dan awet digunakan bertahun-tahun.',
      specs: [
        { label: 'Material Atas', value: 'Kanvas Katun 12oz Berkualitas' },
        { label: 'Sol Bawah', value: 'Karet Vulkanisir Tahan Aus' },
        { label: 'Insole', value: 'Cushioned Footbed Nyaman' },
        { label: 'Tipe Tali', value: 'Tali Katun Kuat' }
      ]
    },
    'sepatu-sneakers': {
      id: 'sepatu-sneakers',
      title: 'Sepatu Sneakers',
      category: 'Sepatu Olahraga',
      badge: 'Produk Terbaru',
      price: 89.00,
      oldPrice: 119.00,
      image: 'assets/img/product/product-11.webp',
      thumbnails: [
        'assets/img/product/product-11.webp',
        'assets/img/product/product-8.webp',
        'assets/img/product/product-5.webp',
        'assets/img/product/product-2.webp',
        'assets/img/product/product-3.webp'
      ],
      rating: 3.8,
      reviewsCount: 12,
      stock: 18,
      description: 'Sneakers modern dengan bantalan responsif, material rajut elastis yang breathable, dan traksi mantap untuk jogging maupun penggunaan gaya kasual harian.',
      specs: [
        { label: 'Upper', value: 'Engineered Flyknit Mesh' },
        { label: 'Midsole', value: 'Air Cushion Responsive Bounce' },
        { label: 'Bobot', value: 'Sangat Ringan (sekitar 240g)' },
        { label: 'Ukuran Tersedia', value: '39, 40, 41, 42, 43, 44' }
      ]
    },
    'kursi-klasik': {
      id: 'kursi-klasik',
      title: 'Kursi Klasik',
      category: 'Furnitur & Kursi',
      badge: 'Trending',
      price: 199.00,
      oldPrice: 249.00,
      image: 'assets/img/product/product-2.webp',
      thumbnails: [
        'assets/img/product/product-2.webp',
        'assets/img/product/product-5.webp',
        'assets/img/product/product-8.webp',
        'assets/img/product/product-4.webp',
        'assets/img/product/product-6.webp'
      ],
      rating: 4.9,
      reviewsCount: 71,
      stock: 9,
      description: 'Kursi klasik dengan rangka kayu jati solid pilihan dan pelapis kain premium yang empuk, menghadirkan estetika timeless dan kenyamanan maksimal di ruang keluarga.',
      specs: [
        { label: 'Rangka', value: 'Kayu Solid Oven Anti Rayap' },
        { label: 'Pelapis', value: 'Kain Linen Beludru Premium' },
        { label: 'Kapasitas Beban', value: 'Maksimal 150 kg' },
        { label: 'Dimensi', value: '65 x 70 x 82 cm' }
      ]
    },
    'tas-jinjing-buatan-tangan': {
      id: 'tas-jinjing-buatan-tangan',
      title: 'Tas Jinjing Buatan Tangan',
      category: 'Tas & Aksesori',
      badge: 'Baru',
      price: 92.00,
      oldPrice: 115.00,
      image: 'assets/img/product/product-1.webp',
      thumbnails: [
        'assets/img/product/product-1.webp',
        'assets/img/product/product-6.webp',
        'assets/img/product/product-9.webp',
        'assets/img/product/product-12.webp',
        'assets/img/product/product-8.webp'
      ],
      rating: 4.5,
      reviewsCount: 31,
      stock: 14,
      description: 'Tas jinjing handmade istimewa dengan jahitan kuat dan detail anyaman artistik, memberikan sentuhan elegan dan ruang luas untuk belanja atau kerja harian.',
      specs: [
        { label: 'Pembuatan', value: 'Handmade Artisan 100%' },
        { label: 'Material', value: 'Serat Alam Organik & Kulit Nabati' },
        { label: 'Lapisan Dalam', value: 'Furing Katun Halus dengan Ritsleting' },
        { label: 'Kapasitas', value: 'Muat Tablet 11 Inci & Dokumen A4' }
      ]
    },
    'kacamata-hitam-cokelat': {
      id: 'kacamata-hitam-cokelat',
      title: 'Kacamata Hitam Cokelat',
      category: 'Aksesori Fashion',
      badge: 'Sedang Trending',
      price: 44.50,
      oldPrice: 59.00,
      image: 'assets/img/product/product-3.webp',
      thumbnails: [
        'assets/img/product/product-3.webp',
        'assets/img/product/product-10.webp',
        'assets/img/product/product-4.webp',
        'assets/img/product/product-9.webp',
        'assets/img/product/product-6.webp'
      ],
      rating: 5.0,
      reviewsCount: 53,
      stock: 28,
      description: 'Kacamata hitam berdesain timeless dengan lensa terpolarisasi UV400 untuk perlindungan mata optimal di bawah terik sinar matahari dengan frame kokoh dan ringan.',
      specs: [
        { label: 'Perlindungan', value: 'UV400 Polarized Lens 100%' },
        { label: 'Material Frame', value: 'Acetate Ringan & Engsel Logam Kuat' },
        { label: 'Kelengkapan', value: 'Hardcase Kulit & Lap Pembersih Microfiber' }
      ]
    },
    'sendal-slip-on-trending': {
      id: 'sendal-slip-on-trending',
      title: 'Sendal Slip-On Kasual',
      category: 'Sepatu & Sandal',
      badge: 'Trending',
      price: 49.00,
      oldPrice: 65.00,
      image: 'assets/img/product/product-5.webp',
      thumbnails: [
        'assets/img/product/product-5.webp',
        'assets/img/product/product-8.webp',
        'assets/img/product/product-11.webp',
        'assets/img/product/product-2.webp',
        'assets/img/product/product-7.webp'
      ],
      rating: 4.0,
      reviewsCount: 22,
      stock: 35,
      description: 'Sandal slip-on ringan dan fleksibel, tahan air serta cepat kering, pas untuk santai di pantai maupun berjalan santai di sekitar rumah.',
      specs: [
        { label: 'Insole', value: 'Ergonomic Arch Support' },
        { label: 'Tahan Air', value: 'Ya, Cepat Kering (Quick-Dry)' },
        { label: 'Bobot', value: 'Sangat Ringan (180g)' }
      ]
    },
    'baju-polo-biru-navy': {
      id: 'baju-polo-biru-navy',
      title: 'Baju Polo Biru Navy',
      category: 'Pakaian Pria',
      badge: '-15%',
      price: 68.00,
      oldPrice: 80.00,
      image: 'assets/img/product/product-10.webp',
      thumbnails: [
        'assets/img/product/product-10.webp',
        'assets/img/product/product-2.webp',
        'assets/img/product/product-7.webp',
        'assets/img/product/product-3.webp',
        'assets/img/product/product-6.webp'
      ],
      rating: 4.7,
      reviewsCount: 45,
      stock: 20,
      description: 'Kaus polo katun pique premium berwarna biru navy yang adem, tidak mudah kusut, dan memberikan siluet tegap rapi sepanjang hari.',
      specs: [
        { label: 'Bahan', value: '100% Katun Pique Sisir 24s' },
        { label: 'Potongan', value: 'Modern Regular Fit' },
        { label: 'Kancing', value: 'Kancing Mutiara Kuat' }
      ]
    },
    'celana-denim-pas-badan': {
      id: 'celana-denim-pas-badan',
      title: 'Celana Denim Pas Badan',
      category: 'Pakaian Pria & Wanita',
      badge: '-20%',
      price: 64.00,
      oldPrice: 80.00,
      image: 'assets/img/product/product-2.webp',
      thumbnails: [
        'assets/img/product/product-2.webp',
        'assets/img/product/product-10.webp',
        'assets/img/product/product-8.webp',
        'assets/img/product/product-11.webp',
        'assets/img/product/product-1.webp'
      ],
      rating: 5.0,
      reviewsCount: 93,
      stock: 25,
      description: 'Celana jeans slim-fit dengan serat stretch elastis yang nyaman mengikuti gerakan tubuh tanpa rasa sesak, tahan lama dan warna tidak mudah luntur.',
      specs: [
        { label: 'Material', value: '98% Cotton Denim, 2% Spandex Stretch' },
        { label: 'Tipe Potongan', value: 'Slim Fit Mid-Rise' },
        { label: 'Resleting', value: 'YKK Brass Zipper' }
      ]
    },
    'tas-pesta-rantai-berbantalan': {
      id: 'tas-pesta-rantai-berbantalan',
      title: 'Tas Pesta Rantai Berbantalan',
      category: 'Tas Wanita',
      badge: 'Rating Tertinggi',
      price: 134.99,
      oldPrice: 169.00,
      image: 'assets/img/product/product-6.webp',
      thumbnails: [
        'assets/img/product/product-6.webp',
        'assets/img/product/product-9.webp',
        'assets/img/product/product-1.webp',
        'assets/img/product/product-12.webp',
        'assets/img/product/product-7.webp'
      ],
      rating: 4.5,
      reviewsCount: 68,
      stock: 11,
      description: 'Tas pesta quilted bertekstur empuk dengan tali rantai emas mewah, cocok untuk acara formal, pesta makan malam, maupun pesta pernikahan.',
      specs: [
        { label: 'Bahan Luar', value: 'Kulit Sintetis Quilted Lembut' },
        { label: 'Tali', value: 'Rantai Paduan Logam Gold Plated' },
        { label: 'Penutup', value: 'Kunci Putar Magnetik Elegan' }
      ]
    },
    'ransel-harian-urban': {
      id: 'ransel-harian-urban',
      title: 'Ransel Harian Urban',
      category: 'Tas & Ransel',
      badge: 'Terpanas',
      price: 99.50,
      oldPrice: 129.00,
      image: 'assets/img/product/product-8.webp',
      thumbnails: [
        'assets/img/product/product-8.webp',
        'assets/img/product/product-1.webp',
        'assets/img/product/product-6.webp',
        'assets/img/product/product-11.webp',
        'assets/img/product/product-4.webp'
      ],
      rating: 5.0,
      reviewsCount: 119,
      stock: 17,
      description: 'Ransel multifungsi dengan kompartemen terorganisir untuk laptop 15 inci, botol minum, serta kantong rahasia anti-maling di bagian punggung.',
      specs: [
        { label: 'Kapasitas', value: '24 Liter' },
        { label: 'Kompartemen Laptop', value: 'Busa Pelindung hingga 15.6"' },
        { label: 'Fitur', value: 'Tali Koper (Luggage Strap) & Saku Paspor' }
      ]
    },
    'tas-pinggang-heritage': {
      id: 'tas-pinggang-heritage',
      title: 'Tas Pinggang Heritage',
      category: 'Tas & Aksesori',
      badge: 'Populer',
      price: 76.00,
      oldPrice: 95.00,
      image: 'assets/img/product/product-11.webp',
      thumbnails: [
        'assets/img/product/product-11.webp',
        'assets/img/product/product-1.webp',
        'assets/img/product/product-6.webp',
        'assets/img/product/product-9.webp',
        'assets/img/product/product-12.webp'
      ],
      rating: 4.8,
      reviewsCount: 87,
      stock: 21,
      description: 'Waist bag bergaya heritage vintage berbahan kanvas tebal dan aksen kulit asli, praktis untuk membawa dompet, ponsel, dan kunci saat bepergian.',
      specs: [
        { label: 'Material', value: 'Heavy Canvas & Crazy Horse Leather' },
        { label: 'Pengait', value: 'Buckle Logam Vintage Tahan Karat' },
        { label: 'Saku', value: '3 Kompartemen Beritsleting' }
      ]
    },
    'gaun-lilit-lipit': {
      id: 'gaun-lilit-lipit',
      title: 'Gaun Lilit Lipit',
      category: 'Pakaian Wanita',
      badge: 'Pilihan Khusus',
      price: 79.00,
      oldPrice: 99.00,
      image: 'assets/img/product/product-7.webp',
      thumbnails: [
        'assets/img/product/product-7.webp',
        'assets/img/product/product-2.webp',
        'assets/img/product/product-6.webp',
        'assets/img/product/product-9.webp',
        'assets/img/product/product-10.webp'
      ],
      rating: 4.0,
      reviewsCount: 38,
      stock: 15,
      description: 'Gaun lilit wanita dengan detail lipit feminin dan bahan flowy yang jatuh anggun, memberikan siluet ramping menawan untuk berbagai acara santai dan formal.',
      specs: [
        { label: 'Bahan', value: 'Sifon Crepe Lembut Bernapas' },
        { label: 'Model', value: 'Wrap Dress dengan Sabuk Ikat Sendiri' },
        { label: 'Perawatan', value: 'Cuci Lembut dengan Air Dingin' }
      ]
    },
    'sepasang-anting-geometris': {
      id: 'sepasang-anting-geometris',
      title: 'Sepasang Anting Geometris',
      category: 'Perhiasan & Aksesori',
      badge: 'Terbatas',
      price: 47.99,
      oldPrice: 65.00,
      image: 'assets/img/product/product-4.webp',
      thumbnails: [
        'assets/img/product/product-4.webp',
        'assets/img/product/product-3.webp',
        'assets/img/product/product-9.webp',
        'assets/img/product/product-6.webp',
        'assets/img/product/product-12.webp'
      ],
      rating: 4.5,
      reviewsCount: 51,
      stock: 19,
      description: 'Anting berdesain geometris kontemporer berlapis emas 18K anti-alergi, ringan dipakai dan menambahkan sentuhan kilau modern pada gaya Anda.',
      specs: [
        { label: 'Lapisan', value: '18K Gold Plated Brass' },
        { label: 'Karakteristik', value: 'Bebas Nikel & Hipoalergenik' },
        { label: 'Berat', value: 'Sangat Ringan (3 gram per anting)' }
      ]
    },
    'tas-jinjing-gesper-vintage': {
      id: 'tas-jinjing-gesper-vintage',
      title: 'Tas Jinjing Gesper Vintage',
      category: 'Tas Wanita',
      badge: 'Pilihan Khusus',
      price: 94.99,
      oldPrice: 120.00,
      image: 'assets/img/product/product-9.webp',
      thumbnails: [
        'assets/img/product/product-9.webp',
        'assets/img/product/product-1.webp',
        'assets/img/product/product-6.webp',
        'assets/img/product/product-12.webp',
        'assets/img/product/product-8.webp'
      ],
      rating: 5.0,
      reviewsCount: 72,
      stock: 13,
      description: 'Tas jinjing dengan pengait gesper logam bernuansa vintage klasik, ruang dalam berfuring halus dengan sekat fungsional untuk kebutuhan harian.',
      specs: [
        { label: 'Bahan', value: 'Kulit Sintetis Bertekstur Retro' },
        { label: 'Aksesoris', value: 'Gesper Logam Antik Tahan Karat' },
        { label: 'Dimensi', value: '32 x 12 x 25 cm' }
      ]
    },
    'dompet-kanvas-minimalis': {
      id: 'dompet-kanvas-minimalis',
      title: 'Dompet Kanvas Minimalis',
      category: 'Dompet & Aksesori',
      badge: 'Baru',
      price: 32.00,
      oldPrice: 45.00,
      image: 'assets/img/product/product-12.webp',
      thumbnails: [
        'assets/img/product/product-12.webp',
        'assets/img/product/product-1.webp',
        'assets/img/product/product-9.webp',
        'assets/img/product/product-6.webp',
        'assets/img/product/product-8.webp'
      ],
      rating: 4.3,
      reviewsCount: 29,
      stock: 38,
      description: 'Dompet lipat kanvas minimalis berfitur proteksi RFID blocker, muat hingga 8 kartu dan uang tunai tanpa membuat kantong celana tebal.',
      specs: [
        { label: 'Keamanan', value: 'RFID Blocking Technology' },
        { label: 'Kapasitas', value: '8 Slot Kartu, 1 Slot Uang Kertas' },
        { label: 'Material', value: 'Kanvas Balistik Ultra Awet' }
      ]
    },
    'tas-ransel-kulit': {
      id: 'tas-ransel-kulit',
      title: 'Tas Ransel Kulit',
      category: 'Tas Kulit',
      badge: '-45%',
      price: 98.00,
      oldPrice: 179.00,
      image: 'assets/img/product/product-6.webp',
      thumbnails: [
        'assets/img/product/product-6.webp',
        'assets/img/product/product-1.webp',
        'assets/img/product/product-8.webp',
        'assets/img/product/product-9.webp',
        'assets/img/product/product-11.webp'
      ],
      rating: 4.6,
      reviewsCount: 312,
      stock: 18,
      description: 'Tas ini terbuat dari bahan kulit premium dengan desain yang elegan dan modern. Cocok untuk digunakan dalam berbagai aktivitas, baik formal maupun kasual.',
      specs: [
        { label: 'Bahan Utama', value: 'Kulit Asli Premium (Full Grain)' },
        { label: 'Lapisan Dalam', value: 'Poliester Lembut & Tahan Robek' },
        { label: 'Slot Laptop', value: 'Maksimal hingga 15.6 Inci' },
        { label: 'Kapasitas Volume', value: '20 Liter' }
      ]
    },
    'sepatu-lari-pria': {
      id: 'sepatu-lari-pria',
      title: 'Sepatu Lari Pria',
      category: 'Sepatu Olahraga',
      badge: '-50%',
      price: 60.00,
      oldPrice: 120.00,
      image: 'assets/img/product/product-11.webp',
      thumbnails: [
        'assets/img/product/product-11.webp',
        'assets/img/product/product-8.webp',
        'assets/img/product/product-5.webp',
        'assets/img/product/product-2.webp',
        'assets/img/product/product-3.webp'
      ],
      rating: 5.0,
      reviewsCount: 478,
      stock: 30,
      description: 'Sepatu lari pria dengan bantalan sol busa penyerap guncangan tingkat tinggi, menjaga lutut tetap nyaman saat berlari jarak jauh maupun sprint cepat.',
      specs: [
        { label: 'Sol Luar', value: 'Karet Karbon Traksi Basah & Kering' },
        { label: 'Midsole', value: 'Superfoam Cushioning Bouncy' },
        { label: 'Upper', value: 'Seamless Engineered Breathable Mesh' }
      ]
    },
    'kursi-klasik-flash': {
      id: 'kursi-klasik-flash',
      title: 'Kursi Klasik Elegan',
      category: 'Furnitur Ruangan',
      badge: '-35%',
      price: 136.00,
      oldPrice: 210.00,
      image: 'assets/img/product/product-2.webp',
      thumbnails: [
        'assets/img/product/product-2.webp',
        'assets/img/product/product-5.webp',
        'assets/img/product/product-8.webp',
        'assets/img/product/product-4.webp',
        'assets/img/product/product-6.webp'
      ],
      rating: 4.0,
      reviewsCount: 189,
      stock: 7,
      description: 'Kursi santai klasik dengan sandaran punggung ergonomis berlapis busa densitas tinggi dan kaki kayu kokoh bernuansa hangat untuk ruangan Anda.',
      specs: [
        { label: 'Rangka', value: 'Kayu Solid Hardwood' },
        { label: 'Pelapis', value: 'Kain Katun Linen Berkualitas' },
        { label: 'Beban Maksimum', value: '140 kg' }
      ]
    },
    'sendal-slip-on-flash': {
      id: 'sendal-slip-on-flash',
      title: 'Sendal Slip-on Fleksibel',
      category: 'Sepatu & Sandal',
      badge: '-55%',
      price: 43.00,
      oldPrice: 95.00,
      image: 'assets/img/product/product-5.webp',
      thumbnails: [
        'assets/img/product/product-5.webp',
        'assets/img/product/product-8.webp',
        'assets/img/product/product-11.webp',
        'assets/img/product/product-2.webp',
        'assets/img/product/product-7.webp'
      ],
      rating: 5.0,
      reviewsCount: 245,
      stock: 40,
      description: 'Sandal slip-on ekstra ringan dengan sol anti selip yang cocok untuk segala aktivitas santai baik di luar maupun dalam ruangan.',
      specs: [
        { label: 'Bahan', value: 'High Elasticity EVA Foam' },
        { label: 'Keunggulan', value: 'Tahan Air, Anti Licin, Sangat Ringan' }
      ]
    }
  };

  /**
   * Helper to format price to string in Rupiah
   */
  function formatMoney(amount) {
    if (typeof amount === 'number') {
      const val = amount < 1000 ? Math.round(amount * 1000) : Math.round(amount);
      return 'Rp ' + val.toLocaleString('id-ID');
    }
    if (typeof amount === 'string') {
      let clean = amount.replace(/[$€£]/g, '').replace(/\./g, '').trim();
      let num = parseFloat(clean);
      if (!isNaN(num)) {
        const val = num < 1000 ? Math.round(num * 1000) : Math.round(num);
        return 'Rp ' + val.toLocaleString('id-ID');
      }
      return clean.startsWith('Rp') ? clean : 'Rp ' + clean;
    }
    return '';
  }

  function resolveAsset(path) {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('/') || path.startsWith('../')) return path;
    const loc = window.location.pathname || window.location.href;
    if (loc.includes('detail-produk')) {
      return '../' + path;
    }
    return path;
  }

  /**
   * Populate product details page with product object
   */
  function renderProduct(product) {
    if (!product) return;

    // 1. Update Document Title
    document.title = product.title + ' - ShopWise';

    // 2. Breadcrumbs & Page Heading
    const breadcrumbCurrent = document.querySelector('.breadcrumbs li.current');
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = product.title;

    const pageTitleHeading = document.querySelector('.page-title h1');
    if (pageTitleHeading) pageTitleHeading.textContent = product.title;

    // 3. Product Heading in detail card
    const productHeading = document.querySelector('.product-heading');
    if (productHeading) productHeading.textContent = product.title;

    // 4. Type / Category Badge
    const typeBadge = document.querySelector('.type-badge');
    if (typeBadge) {
      typeBadge.textContent = product.badge || product.category || 'Produk';
    }

    // 5. Main Product Image & Zoom
    const mainImg = document.getElementById('main-product-image');
    if (mainImg) {
      const resolvedImg = resolveAsset(product.image);
      mainImg.src = resolvedImg;
      mainImg.setAttribute('data-zoom', resolvedImg);
      mainImg.alt = product.title;
    }

    // 6. Discount Badge in gallery
    const discountBadge = document.querySelector('.main-image-container .discount-badge');
    if (discountBadge) {
      if (product.oldPrice && product.oldPrice > product.price) {
        const pct = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
        discountBadge.textContent = '-' + pct + '%';
        discountBadge.style.display = 'inline-block';
      } else if (product.badge && product.badge.includes('%')) {
        discountBadge.textContent = product.badge;
        discountBadge.style.display = 'inline-block';
      } else {
        discountBadge.style.display = 'none';
      }
    }

    // 7. Thumbnails
    const thumbStrip = document.querySelector('.thumb-strip');
    if (thumbStrip && product.thumbnails && product.thumbnails.length) {
      thumbStrip.innerHTML = '';
      product.thumbnails.forEach((thumbSrc, idx) => {
        const resolvedThumb = resolveAsset(thumbSrc);
        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'thumb-cell thumbnail-item' + (idx === 0 ? ' active' : '');
        thumbDiv.setAttribute('data-image', resolvedThumb);
        thumbDiv.innerHTML = `<img src="${resolvedThumb}" alt="Tampilan ${idx + 1}" class="img-fluid">`;
        thumbStrip.appendChild(thumbDiv);
      });
    }

    // 8. Prices
    const priceNow = document.querySelector('.price-now');
    if (priceNow) priceNow.textContent = formatMoney(product.price);

    const priceWas = document.querySelector('.price-was');
    const saveTag = document.querySelector('.save-tag');
    if (product.oldPrice && product.oldPrice > product.price) {
      if (priceWas) {
        priceWas.textContent = formatMoney(product.oldPrice);
        priceWas.style.display = 'inline-block';
      }
      if (saveTag) {
        const pOld = product.oldPrice < 1000 ? product.oldPrice * 1000 : product.oldPrice;
        const pNow = product.price < 1000 ? product.price * 1000 : product.price;
        const diff = Math.round(pOld - pNow);
        saveTag.textContent = 'Hemat Rp ' + diff.toLocaleString('id-ID');
        saveTag.style.display = 'inline-block';
      }
    } else {
      if (priceWas) priceWas.style.display = 'none';
      if (saveTag) saveTag.style.display = 'none';
    }

    // 9. Review summary
    if (product.rating) {
      const scoreText = document.querySelector('.review-summary .score-text');
      if (scoreText) scoreText.textContent = product.rating;
    }
    if (product.reviewsCount) {
      const reviewsAnchor = document.querySelector('.review-summary .reviews-anchor');
      if (reviewsAnchor) reviewsAnchor.textContent = `${product.reviewsCount} penilaian`;
    }
    if (product.stock) {
      const unitsLeft = document.querySelector('.review-summary .units-left');
      if (unitsLeft) unitsLeft.textContent = `Tersisa ${product.stock}`;
    }

    // 10. Summary description
    const summaryText = document.querySelector('.summary-text');
    if (summaryText) summaryText.textContent = product.description;

    // 11. Description Tab
    const descContent = document.querySelector('#product-details-tab-desc .desc-content');
    if (descContent) {
      const pFirst = descContent.querySelector('p');
      if (pFirst) pFirst.textContent = product.description;

      // Update Highlight feature cards
      const highlightCards = descContent.querySelectorAll('.highlight-card');
      if (highlightCards.length >= 4) {
        const featureSets = {
          'Audio & Elektronik': [
            { title: 'Audio Resolusi Tinggi', desc: 'Output suara studio jernih dan detail' },
            { title: 'Peredam Bising Aktif', desc: 'Meredam kebisingan luar hingga 98%' },
            { title: 'Baterai Super Awet', desc: 'Pemakaian nonstop hingga 36 jam' },
            { title: 'Material Logam Premium', desc: 'Bodi aluminium elegan dan ringan' }
          ],
          'Smartwatch & Aksesori': [
            { title: 'Layar Retina AMOLED', desc: 'Tampilan tajam dan responsif selalu aktif' },
            { title: 'Monitor Kesehatan 24/7', desc: 'Sensor detak jantung & SpO2 akurat' },
            { title: 'Tahan Air 5ATM', desc: 'Aman untuk renang dan aktivitas luar' },
            { title: 'Baterai Hingga 14 Hari', desc: 'Pengisian cepat tanpa perlu sering cas' }
          ],
          'Kamera & Fotografi': [
            { title: 'Sensor 24MP 4K', desc: 'Foto jernih & perekaman video resolusi tinggi' },
            { title: 'Lensa Sudut Lebar', desc: 'Menangkap pemandangan luas secara tajam' },
            { title: 'Stabilisasi Gambar OIS', desc: 'Hasil bidikan bebas guncangan dan blur' },
            { title: 'Konektivitas Instan', desc: 'Transfer cepat via Wi-Fi & Bluetooth' }
          ]
        };

        const features = featureSets[product.category] || [
          { title: 'Kualitas Premium', desc: 'Dibuat dari material pilihan berstandar tinggi' },
          { title: 'Ketahanan Ekstra', desc: 'Kuat, awet, dan tahan pemakaian harian' },
          { title: 'Desain Ergonomis', desc: 'Nyaman digunakan untuk setiap aktivitas' },
          { title: 'Estetika Modern', desc: 'Tampilan elegan yang mengikuti tren terkini' }
        ];

        highlightCards.forEach((card, idx) => {
          if (features[idx]) {
            const h5 = card.querySelector('h5');
            const p = card.querySelector('p');
            if (h5) h5.textContent = features[idx].title;
            if (p) p.textContent = features[idx].desc;
          }
        });
      }

      // Update included-box list
      const includedList = descContent.querySelector('.included-box ul');
      if (includedList && product.specs && product.specs.length) {
        let listHtml = '';
        product.specs.forEach(s => {
          listHtml += `<li><i class="bi bi-check2-circle"></i> <strong>${s.label}:</strong> ${s.value}</li>`;
        });
        listHtml += `<li><i class="bi bi-check2-circle"></i> 100% Produk Original &amp; Bergaransi</li>`;
        includedList.innerHTML = listHtml;
      }
    }

    // 12. Specifications Tab
    if (product.specs && product.specs.length) {
      const specsTable = document.querySelector('#product-details-tab-specs .data-table tbody');
      if (specsTable) {
        let specsHtml = '';
        product.specs.forEach(s => {
          specsHtml += `<tr><td>${s.label}</td><td>${s.value}</td></tr>`;
        });
        specsTable.innerHTML = specsHtml;
      }
    }
  }

  /**
   * Main function to read URL parameters and render product
   */
  function initProductDetailsLoader() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const paramTitle = urlParams.get('title') || urlParams.get('name');

    let matchedProduct = null;

    if (productId && PRODUCTS_CATALOG[productId]) {
      matchedProduct = PRODUCTS_CATALOG[productId];
    } else if (paramTitle) {
      // Find by title or slug
      const normalizedTitle = paramTitle.toLowerCase().trim();
      for (const key in PRODUCTS_CATALOG) {
        if (PRODUCTS_CATALOG[key].title.toLowerCase() === normalizedTitle || key === normalizedTitle) {
          matchedProduct = PRODUCTS_CATALOG[key];
          break;
        }
      }
    }

    // If not in catalog, construct from query params if available
    if (!matchedProduct && paramTitle) {
      const priceVal = parseFloat(urlParams.get('price')) || 99000;
      const oldPriceVal = parseFloat(urlParams.get('oldPrice')) || null;
      const imgVal = urlParams.get('image') || urlParams.get('img') || 'assets/img/product/product-6.webp';
      const badgeVal = urlParams.get('badge') || '';
      const catVal = urlParams.get('cat') || urlParams.get('category') || 'Produk';
      const descVal = urlParams.get('desc') || 'Produk unggulan berkualitas tinggi dari koleksi eksklusif ShopWise.';

      matchedProduct = {
        id: 'custom-product',
        title: paramTitle,
        category: catVal,
        badge: badgeVal,
        price: priceVal,
        oldPrice: oldPriceVal,
        image: imgVal,
        thumbnails: [imgVal, 'assets/img/product/product-1.webp', 'assets/img/product/product-3.webp'],
        rating: 4.8,
        reviewsCount: 45,
        stock: 12,
        description: descVal,
        specs: [
          { label: 'Kategori', value: catVal },
          { label: 'Kondisi', value: '100% Baru & Original' },
          { label: 'Garansi', value: 'Garansi Resmi ShopWise' }
        ]
      };
    }

    if (matchedProduct) {
      renderProduct(matchedProduct);
    }
  }

  // Execute on initial script execution and on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductDetailsLoader);
  } else {
    initProductDetailsLoader();
  }

  // Expose catalog globally if needed
  window.ShopWiseProducts = PRODUCTS_CATALOG;
  window.renderShopWiseProduct = renderProduct;
})();
