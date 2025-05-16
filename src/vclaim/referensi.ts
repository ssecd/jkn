import { VClaimBaseApi } from './base.js';

export class Referensi extends VClaimBaseApi {
	/**
	 * Pencarian data diagnosa (ICD-10)
	 */
	async diagnosa(params: {
		/** kode atau nama diagnosa */
		keyword: string;
	}) {
		return this.send<{ diagnosa: ReferensiResult[] }>({
			name: this.name + 'Diagnosa',
			path: `/referensi/diagnosa/${params.keyword}`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian data poli
	 */
	async poli(params: {
		/** kode atau nama poli */
		keyword: string;
	}) {
		return this.send<{ poli: ReferensiResult[] }>({
			name: this.name + 'Poli',
			path: `/referensi/poli/${params.keyword}`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian data fasilitas kesehatan
	 */
	async faskes(params: {
		/** kode atau nama faskes */
		keyword: string;

		/** jenis faskes (1 = Faskes tingkat 1) (2 = Faskes tingkat 2) */
		jenis: number;
	}) {
		return this.send<{ faskes: ReferensiResult[] }>({
			name: this.name + 'Fasilitas Kesehatan',
			path: `/referensi/faskes/${params.keyword}/${params.jenis}`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian data dokter atau DPJP untuk pengisian DPJP Layan
	 */
	async dpjp(params: {
		/** jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan) */
		jenis: number;

		/** tanggal pelayanan atau tanggal SEP dengan format YYYY-MM-DD */
		tanggal: string;

		/** kode spesialis atau sub-spesialis */
		kode: string;
	}) {
		return this.send<{ list: ReferensiResult[] }>({
			name: this.name + 'DPJP',
			path: `/referensi/dokter/pelayanan/${params.jenis}/tglPelayanan/${params.tanggal}/Spesialis/${params.kode}`,
			method: 'GET'
		});
	}

	/**
	 * Daftar provinsi di Indonesia
	 */
	async provinsi() {
		return this.send<{ list: ReferensiResult[] }>({
			name: this.name + 'Provinsi',
			path: `/referensi/propinsi`,
			method: 'GET'
		});
	}

	/**
	 * Daftar kabupaten di Indonesia berdasarkan kode provinsi
	 */
	async kabupaten(params: {
		/** kode provinsi */
		provinsi: string;
	}) {
		return this.send<{ list: ReferensiResult[] }>({
			name: this.name + 'Kabupaten',
			path: `/referensi/kabupaten/propinsi/${params.provinsi}`,
			method: 'GET'
		});
	}

	/**
	 * Daftar kecamatan di Indonesia berdasarkan kode kabupaten
	 */
	async kecamatan(params: {
		/** kode kabupaten */
		kabupaten: string;
	}) {
		return this.send<{ list: ReferensiResult[] }>({
			name: this.name + 'Kecamatan',
			path: `/referensi/kecamatan/kabupaten/${params.kabupaten}`,
			method: 'GET'
		});
	}

	/**
	 * Daftar data diagnosa program PRB
	 */
	async diagnosaPrb() {
		return this.send<{ list: ReferensiResult[] }>({
			name: this.name + 'Diagnosa PRB',
			path: `/referensi/diagnosaprb`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian data obat generik PRB berdasarkan nama obat
	 */
	async obatPrb(params: {
		/** nama obat generik */
		nama: string;
	}) {
		return this.send<{ list: ReferensiResult[] }>({
			name: this.name + 'Obat Generik PRB',
			path: `/referensi/obatprb/${params.nama}`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian data prosedur atau tindakan (hanya untuk lembar pengajuan klaim)
	 */
	async klaimProsedur(params: {
		/** nama atau kode prosedur */
		keyword: string;
	}) {
		return this.send<{ procedure: ReferensiResult[] }>({
			name: this.name + 'Prosedur (Pengajuan Klaim)',
			path: `/referensi/procedure/${params.keyword}`,
			method: 'GET'
		});
	}

	/**
	 * Daftar data kelas rawat (hanya untuk lembar pengajuan klaim)
	 */
	async klaimKelasRawat() {
		return this.send<{ list: ReferensiResult[] }>({
			name: this.name + 'Kelas Rawat (Pengajuan Klaim)',
			path: `/referensi/kelasrawat`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian data dokter berdasarkan nama (hanya untuk lembar pengajuan klaim)
	 */
	async klaimDokter(params: {
		/** nama dokter atau DPJP */
		nama: string;
	}) {
		return this.send<{ list: ReferensiResult[] }>({
			name: this.name + 'Dokter (Pengajuan Klaim)',
			path: `/referensi/dokter/${params.nama}`,
			method: 'GET'
		});
	}

	/**
	 * Daftar data spesialistik (hanya untuk lembar pengajuan klaim)
	 */
	async klaimSpesialistik() {
		return this.send<{ list: ReferensiResult[] }>({
			name: this.name + 'Spesialistik (Pengajuan Klaim)',
			path: `/referensi/spesialistik`,
			method: 'GET'
		});
	}

	/**
	 * Daftar data ruang rawat (hanya untuk lembar pengajuan klaim)
	 */
	async klaimRuangRawat() {
		return this.send<{ list: ReferensiResult[] }>({
			name: this.name + 'Ruang Rawat (Pengajuan Klaim)',
			path: `/referensi/ruangrawat`,
			method: 'GET'
		});
	}

	/**
	 * Daftar data cara keluar (hanya untuk lembar pengajuan klaim)
	 */
	async klaimCaraKeluar() {
		return this.send<{ list: ReferensiResult[] }>({
			name: this.name + 'Cara Keluar (Pengajuan Klaim)',
			path: `/referensi/carakeluar`,
			method: 'GET'
		});
	}

	/**
	 * Daftar data paska pulang (hanya untuk lembar pengajuan klaim)
	 */
	async klaimPaskaPulang() {
		return this.send<{ list: ReferensiResult[] }>({
			name: this.name + 'Paska Pulang (Pengajuan Klaim)',
			path: `/referensi/pascapulang`,
			method: 'GET'
		});
	}
}

interface ReferensiResult {
	kode: string;
	nama: string;
}
