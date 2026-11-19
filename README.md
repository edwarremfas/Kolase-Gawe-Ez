# 📸 Pembuat Kolase Kerja

Aplikasi web sederhana untuk membuat kolase foto kegiatan kerja dengan judul banner merah, langsung dari HP atau komputer. Semua proses berjalan di browser, foto tidak diunggah ke server mana pun.

## Fitur
- Tambah banyak foto sekaligus dan atur urutannya
- Judul aktivitas (bisa beberapa baris) dengan banner berwarna
- 6 pilihan tata letak, 3 pilihan ukuran (4:5, 1:1, 9:16)
- Geser dan zoom foto di dalam kotaknya
- Tanggal dan lokasi otomatis
- Simpan / bagikan hasil ke WhatsApp dan galeri
- Bisa dipasang di layar utama HP (PWA) dan dipakai offline

## Cara memasang di GitHub Pages
1. Buat repository baru di GitHub, misalnya `kolase-kerja` (Public).
2. Klik **Add file → Upload files**, lalu unggah **semua isi folder ini** (termasuk `.nojekyll`), lalu **Commit changes**.
3. Buka **Settings → Pages**.
4. Pada **Source**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
5. Tunggu 1–2 menit. Aplikasi bisa dibuka di `https://USERNAME.github.io/kolase-kerja/`.

## Pasang di layar utama HP
- **Android (Chrome):** menu ⋮ → *Install app* / *Tambahkan ke layar utama*.
- **iPhone (Safari):** tombol Bagikan → *Add to Home Screen*.

## Memperbarui aplikasi
Ganti `index.html` di repository, lalu naikkan angka versi di `sw.js` (misalnya `kolase-v1` menjadi `kolase-v2`) agar HP mengambil versi terbaru.

## Isi folder
| File | Fungsi |
|---|---|
| `index.html` | Aplikasi utama |
| `manifest.json` | Pengaturan agar bisa dipasang di layar utama |
| `sw.js` | Service worker untuk mode offline |
| `icon-192.png`, `icon-512.png` | Ikon aplikasi |
| `.nojekyll` | Agar GitHub Pages menyajikan file apa adanya |
| `LICENSE` | Lisensi MIT |

---
Dibuat oleh Muhamad Edwar Taufiq Hidayat
