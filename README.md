# Dokumentasi Todo List Page - SSR & ISR dengan RTK Query

# Test - PT. EZV Service Indonesia

Skill Test - Frontend Developer

Proyek ini merupakan aplikasi **Next.js** yang menampilkan fitur `todossr` dan `todoisr`. Aplikasi ini menggunakan template `with-redux` dari Next.js dan fetch data menggunakan **Redux Toolkit RTK Query**.

## Prasyarat

Pastikan kamu memiliki:


* Node.js v20 atau lebih baru
* pnpm v10 atau lebih baru

## Setup Project

1. **Clone repository**

```bash
git clone https://github.com/bazudev/-wayan_rimba_bazudewa-_FrontEndTest_EZV.git nextjs-demoproject
cd nextjs-demoproject
```

2. **Install dependencies**

```bash
npm install
```

3. **Menjalankan development server**

```bash
npm run dev
```

Akses aplikasi di: [http://localhost:3000](http://localhost:3000)


## Fitur

* Fetch daftar todo dari [JSONPlaceholder](https://jsonplaceholder.typicode.com/todos)
* Render halaman menggunakan **SSR** dan **ISR**
* State management menggunakan **Redux Toolkit**

## Catatan

* Pastikan environment mendukung Next.js terbaru.
* SSR halaman akan selalu fetch data terbaru setiap request.
* ISR halaman akan revalidate data sesuai konfigurasi `revalidate`.


## 1. Overview

Project ini memiliki **dua versi page** untuk menampilkan daftar todo dari API JSONPlaceholder:

| Page       | Render Type | Initial Load                   | Revalidate / Cache                               |
| ---------- | ----------- | ------------------------------ | ------------------------------------------------ |
| `/todossr` | SSR         | Page  fetch setiap request    | Fetch fresh tiap request (`cache: 'no-store'`)   |
| `/todoisr` | ISR         | Page  pre-rendered statically | Regenerate page tiap 30 detik (`revalidate: 30`) |

**Client Component**: `TodoListPage`

* Menghandle **pagination client-side**
* Menambahkan todo baru di **client state / RTK Query cache**

---

## 2. Approach / Arsitektur

### Pendekatan

1. **SSR (Server-Side Rendered)**

   * Fetch **page ** dari API setiap request
   * Mengirimkan  `totalPages` ke client component
2. **ISR (Incremental Static Regeneration)**

   * Fetch **page ** saat build-time
   * Regenerate page setiap interval `revalidate` (30 detik)
   * Initial page ringan dan cepat (statis)
3. **Client-side Pagination**

   * RTK Query fetch data page 2, 3,... berdasarkan `_start` & `_limit`
4. **Add Todo**

   * JSONPlaceholder tidak menyimpan data, jadi todo baru hanya melakukan post request tanpa memunculkan effect apapun pada UI 

---

### Diagram Alur

```
SSR Page (/todossr):
Client request → Server fetch page  → Render HTML → Client receives initialTodos
Client paginate → RTK Query fetch page N
Client add todo → update client  cache

ISR Page (/todoisr):
Build-time → Server fetch page  → Generate static HTML
Revalidate tiap 30 detik → update page  di server
Client paginate → RTK Query fetch page N
Client add todo → update client  cache
```

---

## 3. Struktur File

```
app/
 ├─ todossr/
 │   └─ page.tsx             # SSR page
 ├─ todoisr/
 │   └─ page.tsx             # ISR page
 ├─ components/todo/
 │   ├─ Form.tsx             # Client component
 │   ├─ List.tsx             # Client component
 │   └─ Todo.tsx             # Client component
 ├─ layout.tsx               # Layout for pages
 └─ StoreProvider.tsx        # Redux Provider

lib/
 ├─ features/todo/
 │   └─ todoApiSlice.ts      # RTK Query slice for todos
 ├─ createAppSlice.ts
 ├─ hooks.ts
 └─ store.ts                 # Redux store

styles/
 └─ globals.css              # Global styles

public/
 └─ icon.ico

```

---



## 4. Keuntungan & Kekurangan

| Page  | Keuntungan                                             | Kekurangan                         |
| ----- | ------------------------------------------------------ | ---------------------------------- |
| SSR   | Data page  selalu fresh, cocok SEO                    | Lebih banyak load server           |
| ISR   | Page  cepat karena statis, bisa cache                 | Data page  tidak real-time selalu |
| Kedua | RTK Query + pagination fleksibel, add todo cepat di UI | Todo baru hilang saat reload page  |

---

## 5. Kesimpulan

* **SSR vs ISR** berbeda hanya di **initial page render**
* **Client-side pagination dan add todo** sama di kedua page
* Pendekatan ini **memisahkan server-side render (SSR/ISR)** dan **client-side interaksi (RTK Query + state)**

---


