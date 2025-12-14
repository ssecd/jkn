import { BaseApi } from './base.js';

export class Antrean extends BaseApi<'antrean'> {
	protected type = 'antrean' as const;

	/**
	 * Melihat referensi poli yang ada pada Aplikasi HFIS
	 */
	async refPoli() {
		return this.send<
			{
				nmpoli: string;
				nmsubspesialis: string;
				kdsubspesialis: string;
				kdpoli: string;
			}[]
		>({
			name: 'Referensi Poli',
			path: '/ref/poli',
			method: 'GET'
		});
	}

	/**
	 * Melihat referensi dokter yang ada pada Aplikasi HFIS
	 */
	async refDokter() {
		return this.send<
			{
				namadokter: string;
				kodedokter: number;
			}[]
		>({
			name: 'Referensi Dokter',
			path: '/ref/dokter',
			method: 'GET'
		});
	}

	/**
	 * Melihat referensi jadwal dokter yang ada pada Aplikasi HFIS
	 */
	async refJadwalDokter(params: {
		/** kode poli BPJS misalnya MAT untuk poli mata */
		poli: string;

		/** tanggal dengan format YYYY-MM-DD */
		tanggal: string;
	}) {
		return this.send<
			{
				kodesubspesialis: string;
				hari: number;
				kapasitaspasien: number;
				libur: number;
				namahari: string;
				jadwal: string;
				namasubspesialis: string;
				namadokter: string;
				kodepoli: string;
				namapoli: string;
				kodedokter: number;
			}[]
		>({
			name: 'Referensi Jadwal Dokter',
			path: ['/jadwaldokter/kodepoli/:poli/tanggal/:tanggal', params],
			method: 'GET'
		});
	}

	/**
	 * Melihat referensi poli finger print
	 */
	async refPoliFp() {
		return this.send<
			{
				kodesubspesialis: string;
				namasubspesialis: string;
				kodepoli: string;
				namapoli: string;
			}[]
		>({
			name: 'Referensi Poli Fingerprint',
			path: '/ref/poli/fp',
			method: 'GET'
		});
	}

	/**
	 * Melihat referensi pasien finger print
	 */
	async refPasienFp(params: {
		/** `"nik"` atau `"noka"` (Nomor kartu BPJS) */
		jenis: string;

		/** nomor identitas sesuai jenis */
		nomor: string;
	}) {
		return this.send<{
			nomorkartu: string;
			nik: string;
			tgllahir: string;
			daftarfp: number;
		}>({
			name: 'Referensi Pasien Fingerprint',
			path: ['/ref/pasien/fp/identitas/:jenis/noidentitas/:nomor', params],
			method: 'GET'
		});
	}

	/**
	 * Update jadwal dokter yang ada pada Aplikasi HFIS
	 *
	 * Catatan:
	 * Data yang berhasil disimpan menunggu approval dari BPJS atau otomatis approve
	 * jadwal dokter oleh sistem, misal pengajuan perubahan jadwal oleh RS diantara
	 * jam 00.00 - 20.00 , kemudian alokasi approve manual oleh BPJS/cabang di jam
	 * 20.01-00.00. Jika pukul 00.00 belum dilakukan approval oleh kantor cabang,
	 * maka otomatis approve by sistem akan dilaksanakan setelah jam 00.00 dan yang
	 * berubah-nya esoknya (H+1).
	 *
	 * @param data data jadwal update
	 */
	async updateJadwalDokter(data: {
		/** kode poli BPJS */
		kodepoli: string;

		/** kode sub-spesialis BPJS */
		kodesubspesialis: string;

		/** kode dokter BPJS */
		kodedokter: number;
		jadwal: {
			/**
			 * 1) senin
			 * 2) selasa
			 * 3) rabu
			 * 4) kamis
			 * 5) jumat
			 * 6) sabtu
			 * 7) minggu
			 * 8) hari libur nasional
			 */
			hari: string;
			buka: string;
			tutup: string;
		}[];
	}) {
		return this.send({
			name: 'Update Jadwal Dokter',
			path: `/jadwaldokter/updatejadwaldokter`,
			method: 'POST',
			data
		});
	}

	/**
	 * Menambah Antrean RS
	 *
	 * @param data data antrean pasien
	 */
	async tambah(data: {
		/** kode booking antrean yang dibuat unik */
		kodebooking: string;

		/** JKN | NON JKN */
		jenispasien: string;

		/** nomor kartu pasien BPJS, diisi kosong jika NON JKN */
		nomorkartu: string;

		nik: string;

		/** nomor handphone pasien */
		nohp: string;

		/** memakai kode sub-spesialis BPJS */
		kodepoli: string;

		namapoli: string;

		/**
		 * 1 = Ya
		 *
		 * 0 = Tidak
		 */
		pasienbaru: number;

		/** nomor rekam medis pasien */
		norm: string;

		/** tanggal periksa dengan format YYYY-MM-DD */
		tanggalperiksa: string;

		/** kode dokter BPJS */
		kodedokter: string;

		namadokter: string;

		/** contoh 08:00-16:00 */
		jampraktek: string;

		/**
		 * 1 = Rujukan FKTP
		 *
		 * 2 = Rujukan Internal
		 *
		 * 3 = Kontrol
		 *
		 * 4 = Rujukan Antar RS
		 */
		jeniskunjungan: number;

		/** nomor rujukan / kontrol pasien JKN, diisi kosong jika NON JKN */
		nomorreferensi: string;

		/** contoh A003 */
		nomorantrean: string;

		/** contoh 3 */
		angkaantrean: number;

		/** waktu estimasi dilayani dalam milliseconds */
		estimasidilayani: number;

		sisakuotajkn: number;
		kuotajkn: number;
		sisakuotanonjkn: number;
		kuotanonjkn: number;

		/** informasi untuk pasien */
		keterangan: string;
	}) {
		return this.send({
			name: 'Tambah Antrean',
			path: `/antrean/add`,
			method: 'POST',
			data
		});
	}

	/**
	 * Menambah Antrean Farmasi RS
	 *
	 * @param data data antrean pasien
	 */
	async tambahFarmasi(data: {
		kodebooking: string;

		/** 'racikan' | 'non racikan' */
		jenisresep: string;

		nomorantrean: number;
		keterangan: string;
	}) {
		return this.send({
			name: 'Tambah Antrean Farmasi',
			path: `/antrean/farmasi/add`,
			method: 'POST',
			data
		});
	}

	/**
	 * Mengirimkan waktu tunggu atau waktu layan
	 *
	 * Catatan:
	 * - Alur Task Id Pasien Baru: 1-2-3-4-5 (apabila ada obat tambah 6-7)
	 * - Alur Task Id Pasien Lama: 3-4-5 (apabila ada obat tambah 6-7)
	 * - Sisa antrean berkurang pada task 5
	 * - Pemanggilan antrean poli pasien muncul pada task 4
	 * - Cek in / mulai waktu tunggu untuk pasien baru mulai pada task 1
	 * - Cek in / mulai waktu tunggu untuk pasien lama mulai pada task 3
	 * - Agar terdapat validasi pada sistem RS agar alur pengiriman Task Id berurutan
	 * dari awal, dan waktu Task Id yang kecil lebih dahulu daripada Task Id yang besar
	 * (misal task Id 1=08.00, task Id 2= 08.05)
	 * - jenisresep : Tidak ada/Racikan/Non racikan (jenisresep khusus untuk rs
	 * yang sudah implementasi antrean farmasi. Jika belum/tidak kolom jenisresep
	 * dapat dihilangkan)
	 *
	 * @param data data waktu antrean
	 */
	async updateWaktu(data: {
		/** kodebooking yang didapat dari servis tambah antrean */
		kodebooking: string;

		/**
		 * 1 = mulai waktu tunggu admisi
		 *
		 * 2 = akhir waktu tunggu admisi / mulai waktu layan admisi
		 *
		 * 3 = akhir waktu layan admisi / mulai waktu tunggu poli
		 *
		 * 4 = akhir waktu tunggu poli / mulai waktu layan poli
		 *
		 * 5 = akhir waktu layan poli / mulai waktu tunggu farmasi
		 *
		 * 6 = akhir waktu tunggu farmasi / mulai waktu layan farmasi membuat obat
		 *
		 * 7 = akhir waktu obat selesai dibuat
		 *
		 * 99 = tidak hadir / batal
		 */
		taskid: number;

		/** waktu dalam timestamp millisecond */
		waktu: number;

		/** khusus yang sudah implementasi antrean farmasi */
		jenisresep?: 'Tidak ada' | 'Racikan' | 'Non racikan';
	}) {
		return this.send({
			name: 'Update Waktu Antrean',
			path: `/antrean/updatewaktu`,
			method: 'POST',
			data
		});
	}

	/**
	 * Membatalkan antrean pasien
	 *
	 * @param data kode booking dan keterangan
	 */
	async batal(data: {
		/** kodebooking yang didapat dari servis tambah antrean */
		kodebooking: string;

		/** alasan pembatalan */
		keterangan: string;
	}) {
		return this.send({
			name: 'Batal Antrean',
			path: `/antrean/batal`,
			method: 'POST',
			data
		});
	}

	/**
	 * Melihat waktu task id yang telah dikirim ke BPJS
	 */
	async listTaskId(params: {
		/** kode booking yang didapat dari servis tambah antrean */
		kodeBooking: string;
	}) {
		return this.send<
			{
				/** contoh "16-03-2021 11:32:49 WIB" */
				wakturs: string;

				/** contoh "24-03-2021 12:55:23 WIB" */
				waktu: string;

				/** contoh "mulai waktu tunggu admisi" */
				taskname: string;

				taskid: number;

				kodebooking: string;
			}[]
		>({
			name: 'List Waktu TaskId',
			path: `/antrean/getlisttask`,
			method: 'POST',
			data: { kodebooking: params.kodeBooking }
		});
	}

	/**
	 * Dashboard waktu per tanggal
	 *
	 * Catatan:
	 * - Waktu Task 1 = Waktu tunggu admisi dalam detik
	 * - Waktu Task 2 = Waktu layan admisi dalam detik
	 * - Waktu Task 3 = Waktu tunggu poli dalam detik
	 * - Waktu Task 4 = Waktu layan poli dalam detik
	 * - Waktu Task 5 = Waktu tunggu farmasi dalam detik
	 * - Waktu Task 6 = Waktu layan farmasi dalam detik
	 * - Insertdate = Waktu pengambilan data, timestamp dalam millisecond
	 * - Waktu server adalah data waktu (task 1-6) yang dicatat oleh server BPJS Kesehatan
	 * setelah RS mengirimkan data, sedangkan waktu rs adalah data waktu (task 1-6) yang
	 * dikirimkan oleh RS
	 */
	async dashboardPerTanggal(params: {
		/** tanggal antrean */
		tanggal: string;

		/** jenis waktu (rs atau server) */
		waktu: string;
	}) {
		return this.send<{ list: AntreanDashboard[] }>({
			name: 'Dashboard Per-Tanggal',
			path: `/dashboard/waktutunggu/tanggal/${params.tanggal}/waktu/${params.waktu}`,
			method: 'GET',
			skipDecrypt: true
		});
	}

	/**
	 * Dashboard waktu per bulan
	 *
	 * Catatan:
	 * - Waktu Task 1 = Waktu tunggu admisi dalam detik
	 * - Waktu Task 2 = Waktu layan admisi dalam detik
	 * - Waktu Task 3 = Waktu tunggu poli dalam detik
	 * - Waktu Task 4 = Waktu layan poli dalam detik
	 * - Waktu Task 5 = Waktu tunggu farmasi dalam detik
	 * - Waktu Task 6 = Waktu layan farmasi dalam detik
	 * - Insertdate = Waktu pengambilan data, timestamp dalam millisecond
	 * - Waktu server adalah data waktu (task 1-6) yang dicatat oleh server BPJS Kesehatan setelah
	 * RS mengirimkan data, sedangkan waktu rs adalah data waktu (task 1-6) yang dikirimkan oleh RS
	 *
	 * @param params parameter berupa bulan, tahun, dan jenis waktu
	 */
	async dashboardPerBulan(params: {
		/** 1 sampai 12 */
		bulan: number;

		/** contoh 2023 */
		tahun: number;

		/** jenis waktu (rs atau server) */
		waktu: string;
	}) {
		const bulan = String(params.bulan).padStart(2, '0');
		return this.send<{ list: AntreanDashboard[] }>({
			name: 'Dashboard Per-Bulan',
			path: `/dashboard/waktutunggu/bulan/${bulan}/tahun/${params.tahun}/waktu/${params.waktu}`,
			method: 'GET',
			skipDecrypt: true
		});
	}

	/**
	 * Melihat pendaftaran antrean per tanggal
	 *
	 * @param tanggal tanggal pendaftaran antrean
	 */
	async perTanggal(tanggal: string) {
		return this.send<AntreanDetail[]>({
			name: 'Antrean Per-Tanggal',
			path: `/antrean/pendaftaran/tanggal/${tanggal}`,
			method: 'GET'
		});
	}

	/**
	 * Melihat pendaftaran antrean per kode booking
	 *
	 * @param kodeBooking kode booking yang didapat dari servis tambah antrean
	 */
	async perKodeBooking(kodeBooking: string) {
		return this.send<AntreanDetail[]>({
			name: 'Antrean Per-KodeBooking',
			path: ['/antrean/pendaftaran/kodebooking/:kodeBooking', { kodeBooking }],
			method: 'GET'
		});
	}

	/**
	 * Melihat pendaftaran antrean belum dilayani
	 */
	async belumDilayani() {
		return this.send<AntreanDetail[]>({
			name: 'Antrean Belum Dilayani',
			path: `/antrean/pendaftaran/aktif`,
			method: 'GET'
		});
	}

	/**
	 * Melihat pendaftaran antrean belum dilayani per poli per dokter per hari per jam praktik
	 */
	async belumDilayaniPredikat(params: {
		/** kode poli diambil dari referensi poli */
		poli: string;

		/** kode dokter diambil dari referensi dokter */
		dokter: string;

		/** hari mulai dari 1 sampai 7 */
		hari: number;

		/** jam praktik */
		jam: string;
	}) {
		return this.send<AntreanDetail[]>({
			name: 'Antrean Belum Dilayani Per-(Poli, Dokter, Hari, dan Jam Praktik)',
			path: [
				'/antrean/pendaftaran/kodepoli/:poli/kodedokter/:dokter/hari/:hari/jampraktek/:jam',
				params
			],
			method: 'GET'
		});
	}
}

interface AntreanDetail {
	/** kodebooking yang didapat dari servis tambah antrean */
	kodebooking: string;

	/** tanggal antrean dengan format YYYY-MM-DD */
	tanggal: string;

	/** kode poli BPJS */
	kodepoli: string;

	/** kode dokter BPJS */
	kodedokter: number;

	/** contoh 08:00-17:00 */
	jampraktek: string;

	/** NIK pasien */
	nik: string;

	nokapst: string;

	nohp: string;

	norekammedis: string;

	/**
	 * 1 = Rujukan FKTP
	 *
	 * 2 = Rujukan Internal
	 *
	 * 3 = Kontrol
	 *
	 * 4 = Rujukan Antar RS
	 */
	jeniskunjungan: 1 | 2 | 3 | 4;

	/** nomor rujukan / kontrol pasien JKN, diisi kosong jika NON JKN */
	nomorreferensi: string;

	/** contoh "Mobile JKN" */
	sumberdata: string;

	/**
	 * 1 = Ya
	 *
	 * 0 = Tidak
	 */
	ispeserta: 1 | 0;

	noantrean: string;

	/** waktu dalam timestamp millisecond */
	estimasidilayani: number;

	/** waktu dalam timestamp millisecond */
	createdtime: number;

	/** contoh "Selesai dilayani" */
	status: string;
}

interface AntreanDashboard {
	kdppk: string;
	waktu_task1: number;
	avg_waktu_task4: number;
	jumlah_antrean: number;
	avg_waktu_task3: number;
	namapoli: string;
	avg_waktu_task6: number;
	avg_waktu_task5: number;
	nmppk: string;
	avg_waktu_task2: number;
	avg_waktu_task1: number;
	kodepoli: string;
	waktu_task5: number;
	waktu_task4: number;
	waktu_task3: number;

	/** waktu dalam timestamp millisecond */
	insertdate: number;

	/** tanggal dengan format YYYY-MM-DD */
	tanggal: string;
	waktu_task2: number;
	waktu_task6: number;
}
