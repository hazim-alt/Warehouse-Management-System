# Sistem Pengurusan Gudang (GitHub Pages + Firebase)

Versi ini sama dengan sistem dalam claude.ai, tetapi staf log masuk dengan **emel dan kata laluan** sendiri. Mereka tak perlu akaun Claude. Halaman dihoskan di **GitHub Pages** dan data disimpan dalam **Firebase Firestore**.

Fail dalam folder ini:

| Fail | Guna |
|---|---|
| `index.html` | Sistem penuh: peta 3D/2D, stock check, transfer bin, upload, kapasiti dan tetapan rak |
| `config.js` | Maklumat projek Firebase awak (perlu diisi) |
| `firestore.rules` | Peraturan keselamatan: hanya staf dalam senarai boleh guna |

Fail `data-export.json` (data stok dan lokasi dari sistem lama) **jangan dimasukkan ke GitHub**, sebab repo GitHub Pages percuma bersifat awam. Fail ni cuma digunakan sekali untuk import.

---

## 1. Setup Firebase (sekali sahaja, lebih kurang 15 minit)

1. Pergi ke https://console.firebase.google.com dan tekan **Add project**. Beri nama, contoh `gudang-khatam`. Google Analytics boleh dimatikan.
2. **Firestore:** pergi ke menu **Build → Firestore Database → Create database**. Pilih lokasi `asia-southeast1 (Singapore)`, kemudian **Start in production mode**.
3. **Peraturan:** dalam Firestore, buka tab **Rules**. Padam semua yang ada, tampal isi fail `firestore.rules`, dan tekan **Publish**.
4. **Log masuk:** pergi ke **Build → Authentication → Get started → Sign-in method**. Hidupkan **Email/Password**.
5. **Config web:** pergi ke ⚙️ **Project settings → General → Your apps** dan tekan ikon **</>** (Web). Beri nama dan tekan Register. Salin nilai dalam `firebaseConfig`, kemudian tampal ke dalam `config.js`, menggantikan semua `ISI_...`.

## 2. Tambah staf

Setiap staf perlu **dua langkah**:

1. **Authentication → Users → Add user:** masukkan emel dan kata laluan staf.
2. **Firestore Database → Start collection:**
   - Untuk kali pertama, Collection ID: `staff`.
   - **Document ID = emel staf dalam huruf kecil** (contoh `ali@syarikat.com`).
   - Tambah satu field, contoh `nama` (string) = `Ali`. Simpan.

Tambah diri awak dulu sebagai staf pertama.

Untuk buang akses staf, padam dokumen emelnya dalam koleksi `staff`, atau disable user dalam Authentication.

## 3. Letak di GitHub Pages

1. Buat repo baru di GitHub, contoh `gudang`. Repo awam diperlukan untuk GitHub Pages percuma.
2. Upload `index.html`, `config.js`, `firestore.rules` dan `README.md`. **Jangan upload `data-export.json`.**
3. Pergi ke **Settings → Pages → Build and deployment**. Pilih Source: **Deploy from a branch**, Branch: `main`, folder `/ (root)`, kemudian **Save**.
4. Selepas 1–2 minit, pautan keluar, contoh `https://namaawak.github.io/gudang/`.
5. Dalam Firebase, pergi ke **Authentication → Settings → Authorized domains → Add domain**, dan masukkan `namaawak.github.io`.

## 4. Import data dari sistem lama (sekali sahaja)

1. Buka pautan GitHub Pages dan log masuk dengan akaun awak.
2. Sebab pangkalan data masih kosong, kotak **"Data awal belum ada"** akan keluar. Pilih fail `data-export.json`.
3. Tunggu sampai "Selesai". Halaman akan muat semula dengan semua stok, lokasi, kapasiti bin dan tetapan rak.

## 5. Guna harian

- Staf buka pautan yang sama di PC, tablet atau telefon, dan log masuk dengan emel masing-masing.
- Nama staf diisi automatik daripada emel, dan boleh diubah di atas kanan.
- **Upload Stok:** upload *Inventory Balance Detailed Report* (CSV atau Excel) untuk kemas kini lokasi bin.
- Muat turun Excel dari Transfer Bin terus dimuat turun ke komputer.
- Lupa kata laluan: tekan **Lupa kata laluan?** di skrin log masuk, dan emel tukar kata laluan akan dihantar.

## Kos

Untuk saiz gudang ni, pakej percuma **Spark** Firebase biasanya mencukupi (50,000 bacaan dan 20,000 tulisan sehari). GitHub Pages percuma.

## Nak ubah sistem nanti?

Hantar fail `index.html` terkini kepada Claude dan terangkan perubahan yang awak mahu. Selepas itu, upload semula fail baru ke repo GitHub. Data dalam Firebase tak terjejas.
