# JKN

JKN (BPJS) Bridging API untuk NodeJS

## Fitur

- ✅ Aplicares
- ✅ VClaim
- ✅ Antrean
- ✅ Apotek
- ✅ i-Care
- ✅ Rekam Medis
- 🧩 PCare _([partial](https://github.com/ssecd/jkn/pull/26))_

## Demo

https://github.com/user-attachments/assets/02809ccd-30ea-48a8-bbb3-1e0df687175a

## Instalasi

Instalasi paket dapat dilakukan dengan perintah berikut:

```bash
# Node
npm install @ssecd/jkn

# Bun
bun install @ssecd/jkn

# Deno
deno install npm:@ssecd/jkn
```

Untuk dukungan _type_ pada API Rekam Medis, perlu menambahkan development dependensi `@types/fhir` dengan perintah:

```bash
npm install --save-dev @types/fhir
```

> Instalasi paket NodeJS juga dapat dilakukan menggunakan `PNPM` atau `YARN`

## Penggunaan

Penggunaan paket ini sangatlah sederhana, cukup menginisialisasi global instansi pada sebuah modul atau file seperti berikut:

```ts
// file: jkn.ts atau jkn.js

import JKN from '@ssecd/jkn';

const jkn = new JKN();

export default jkn;
```

Secara default konfigurasi seperti cons id atau cons secret akan dibaca melalui environment variable namun konfigurasi juga dapat diatur pada constructor class JKN seperti berikut:

```ts
// file: jkn.ts atau jkn.js

import JKN from '@ssecd/jkn';

const jkn = new JKN({
	consId: '<cons id dari bpjs>'
	// dan seterusnya ...
});

export default jkn;
```

Selain menggunakan objek, konfigurasi juga dapat diatur menggunakan fungsi, misalnya pada kasus membaca atau mendapatkan konfigurasi dari database:

```ts
// file: jkn.ts atau jkn.js

import JKN from '@ssecd/jkn';

const jkn = new JKN(async () => {
	const result = await sql`select * from config`;
	return {
		consId: result.consId
		// dan seterusnya ...
	};
});

export default jkn;
```

Perlu diperhatikan bahwa fungsi pada constructor parameter tersebut hanya akan dipanggil satu kali. Bila terjadi perubahan konfigurasi harap memanggil fungsi `await invalidateConfig()` pada instansi JKN untuk memperbaharui atau menerapkan perubahan konfigurasi.

Kemudian cukup impor module `jkn` tersebut di mana pun saat akan menggunakannya:

```ts
import jkn from './path/to/jkn.js';

const result = await jkn.vclaim.referensi.faskes({
	keyword: 'silampari',
	jenis: 2
});

console.log(result);
/*
{
	response: {
		faskes: [
			{
				kode: "0089S002",
				nama: "Silampari Sriwijaya Eye Centre"
			}
		]
	};
	metaData: {
		code: "200";
		message: "OK";
	};
}
*/
```

Setiap parameter dan response objek memiliki type TypeScript dan komentar dokumentasi yang dibentuk sesuai dengan dokumentasi API BPJS Kesehatan pada [TrustMark](https://dvlp.bpjs-kesehatan.go.id:8888/trust-mark/main.html) dengan demikian developer dapat membaca langsung dokumentasi cepat dari kode tanpa harus bolak-balik halaman TrustMark yang tentunya akan sangat mempersingkat proses development.

## Tipe Request & Response

Pada kasus tertentu, type dari request atau response diperlukan di luar pemanggilan API method misalnya saat ingin mendefinisikan variable request pada global scope variable atau bahkan pada module berbeda dengan tetap mempertahankan keakuratan type atau menjadikan response sebagai parameter fungsi yang menyimpan response tersebut ke database, hal tersebut dapat dilakukan seperti berikut:

```ts
import type { AntreanParams, VClaimResponse } from '@ssecd/jkn';
import jkn from './path/to/jkn.js';

const jadwal: AntreanParams<'refJadwalDokter'>[0] = {
	poli: 'MAT',
	tanggal: '2023-05-01'
};

const result = await jkn.antrean.refJadwalDokter(jadwal);
console.log(result);

// ...

function persistSep(sep: VClaimResponse<'sep', 'insertV2'>) {
	/* simpan SEP ke database */
}
```

## Events

- `onRequest`

```ts
onRequest: ((info: SendOption & { type: Type }) => MaybePromise<void>) | undefined = undefined;
```

- `onResponse`

```ts
onResponse: (<T extends Type = Type>(info: SendOption & { duration: number; type: T; }, result: SendResponse<unknown, unknown>[T]) => MaybePromise<void>) | undefined = undefined;
```

- `onError`

```ts
onError: ((error: Error) => MaybePromise<void>) | undefined = undefined;
```

Contoh penggunaan event:

```ts
jkn.onResponse = (info, result) => {
	console.log('>', Math.round(info.duration) + 'ms', info.type, info.name);
	// > 279ms vclaim Peserta -> NIK
};
```

## Konfigurasi

Konfigurasi mengikuti interface berikut:

````ts
interface Config {
	/**
	 * Kode PPK yang diberikan BPJS.
	 *
	 * Diperlukan untuk melakukan proses enkripsi
	 * pada service eRekamMedis and request pada
	 * service Aplicares
	 *
	 * @default process.env.JKN_PPK_CODE
	 */
	ppkCode: string;

	/**
	 * Cons ID dari BPJS
	 *
	 * @default process.env.JKN_CONS_ID
	 */
	consId: string;

	/**
	 * Secret key dari BPJS
	 *
	 * @default process.env.JKN_CONS_SECRET
	 */
	consSecret: string;

	/**
	 * User key Aplicares dari BPJS atau gunakan user key vclaim
	 *
	 * @default process.env.JKN_VCLAIM_USER_KEY || process.env.JKN_APLICARES_USER_KEY
	 */
	aplicaresUserKey?: string;

	/**
	 * User key VClaim dari BPJS
	 *
	 * @default process.env.JKN_VCLAIM_USER_KEY
	 */
	vclaimUserKey: string;

	/**
	 * User key Antrean dari BPJS
	 *
	 * @default process.env.JKN_ANTREAN_USER_KEY
	 */
	antreanUserKey: string;

	/**
	 * User key Apotek dari BPJS atau gunakan user key vclaim
	 *
	 * @default process.env.JKN_VCLAIM_USER_KEY || process.env.JKN_APOTEK_USER_KEY
	 */
	apotekUserKey?: string;

	/**
	 * User key PCare dari BPJS
	 *
	 * @default process.env.JKN_PCARE_USER_KEY
	 */
	pcareUserKey: string;

	/**
	 * User key i-Care dari BPJS
	 *
	 * Umumnya user key i-Care ini nilai sama dengan user key VClaim
	 * untuk FKRTL dan PCare untuk FKTP
	 *
	 * @default process.env.JKN_VCLAIM_USER_KEY || process.env.JKN_ICARE_USER_KEY
	 */
	icareUserKey?: string;

	/**
	 * User key eRekam Medis dari BPJS atau gunakan user key vclaim
	 *
	 * @default process.env.JKN_VCLAIM_USER_KEY || process.env.JKN_REKAM_MEDIS_USER_KEY
	 */
	rekamMedisUserKey?: string;

	/**
	 * Berupa mode "development" dan "production". Secara default akan
	 * membaca nilai environment variable NODE_ENV atau "development"
	 * jika NODE_ENV tidak terdapat nilai. Mode ini berpengaruh pada
	 * nilai konfigurasi yang digunakan dan JKN API base url.
	 *
	 * @default process.env.NODE_ENV || "development"
	 */
	mode: Mode;

	/**
	 * Secara default bernilai `false` sehingga setiap terjadi kesalahan
	 * saat mengirim permintaan ke server JKN menggunakan method `send()`,
	 * pesan kesalahan akan dikembalikan sebagai pesan response dan log
	 * error akan dicetak pada konsol atau terminal. Jika bernilai true,
	 * maka kesalahan akan di-throw.
	 *
	 * @default false
	 */
	throw: boolean;

	/**
	 * Base URL web service dari BPJS. Secara default sudah diatur
	 * berdasarkan base url yang ada di TrustMark. Nilai dapat diatur
	 * secara partial, misalnya:
	 *
	 * ```
	 * baseUrls: {
	 * 	vclaim: {
	 * 		development: 'http://dev.example.com',
	 * 		production: 'http://prod.example.com'
	 * 	}
	 * }
	 * ```
	 */
	baseUrls: Partial<Record<Type, Record<Mode, string>>>;
}
````

## Kontribusi

Kontribusi sangat dipersilakan dan dapat dilakukan dengan berbagai cara seperti melaporkan masalah, membuat permintaan atau menambahkan fitur melalui PR, atau sekedar memperbaiki kesalahan ketikan.

## Lisensi

[MIT](./LICENSE)

## Lainnya

- [Consent](https://github.com/ssecd/jkn/issues/6)
- [Pemecahan Masalah](https://github.com/ssecd/jkn/issues?q=is%3Aissue)
- [Laporkan Bug](https://github.com/ssecd/jkn/issues/new)
