import { VClaimBaseApi } from './base.js';

export class Referensi extends VClaimBaseApi {
	/**
	 * Pencarian data diagnosa (ICD-10)
	 *
	 * @param keyword kode atau nama diagnosa
	 */
	async diagnosa(keyword: string) {
		return this.send<{ diagnosa: ReferensiResult[] }>({
			path: `/referensi/diagnosa/${keyword}`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian data poli
	 *
	 * @param keyword kode atau nama poli
	 */
	async poli(keyword: string) {
		return this.send<{ poli: ReferensiResult[] }>({
			path: `/referensi/poli/${keyword}`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian data fasilitas kesehatan
	 *
	 * @param keyword kode atau nama faskes
	 * @param jenis jenis faskes (1 = Faskes tingkat 1) (2 = Faskes tingkat 2)
	 */
	async faskes(keyword: string, jenis: 1 | 2) {
		return this.send<{ faskes: ReferensiResult[] }>({
			path: `/referensi/faskes/${keyword}/${jenis}`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian data dokter atau DPJP untuk pengisian DPJP Layan
	 */
	async dpjp(params: {
		/** jenis pelayanan (1 = Rawat Inap) (2 = Rawat Jalan) */
		jenis: 1 | 2;

		/** tanggal pelayanan atau tanggal SEP dengan format YYYY-MM-DD */
		tanggal: string;

		/** kode spesialis atau sub-spesialis */
		kode: string;
	}) {
		return this.send<{ list: ReferensiResult[] }>({
			path: `/referensi/dokter/pelayanan/${params.jenis}/tglPelayanan/${params.tanggal}/Spesialis/${params.kode}`,
			method: 'GET'
		});
	}

	/**
	 * Daftar provinsi di Indonesia
	 */
	async provinsi() {
		return this.send<{ list: ReferensiResult[] }>({
			path: `/referensi/propinsi`,
			method: 'GET'
		});
	}

	/**
	 * Daftar kabupaten di Indonesia berdasarkan kode provinsi
	 */
	async kabupaten(kodeProvinsi: string) {
		return this.send<{ list: ReferensiResult[] }>({
			path: `/referensi/kabupaten/propinsi/${kodeProvinsi}`,
			method: 'GET'
		});
	}

	/**
	 * Daftar kecamatan di Indonesia berdasarkan kode kabupaten
	 */
	async kecamatan(kodeKabupaten: string) {
		return this.send<{ list: ReferensiResult[] }>({
			path: `/referensi/kecamatan/kabupaten/${kodeKabupaten}`,
			method: 'GET'
		});
	}

	/**
	 * Daftar data diagnosa program PRB
	 */
	async diagnosaPrb() {
		return this.send<{ list: ReferensiResult[] }>({
			path: `/referensi/diagnosaprb`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian data obat generik PRB berdasarkan nama obat
	 *
	 * @param nama nama obat generik
	 */
	async obatPrb(nama: string) {
		return this.send<{ list: ReferensiResult[] }>({
			path: `/referensi/obatprb/${nama}`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian data prosedur atau tindakan (hanya untuk lembar pengajuan klaim)
	 *
	 * @param keyword nama atau kode prosedur
	 */
	async klaimProsedur(keyword: string) {
		return this.send<{ procedure: ReferensiResult[] }>({
			path: `/referensi/procedure/${keyword}`,
			method: 'GET'
		});
	}

	/**
	 * Daftar data kelas rawat (hanya untuk lembar pengajuan klaim)
	 */
	async klaimKelasRawat() {
		return this.send<{ list: ReferensiResult[] }>({
			path: `/referensi/kelasrawat`,
			method: 'GET'
		});
	}

	/**
	 * Pencarian data dokter berdasarkan nama (hanya untuk lembar pengajuan klaim)
	 *
	 * @param nama nama dokter atau DPJP
	 */
	async klaimDokter(nama: string) {
		return this.send<{ list: ReferensiResult[] }>({
			path: `/referensi/dokter/${nama}`,
			method: 'GET'
		});
	}

	/**
	 * Daftar data spesialistik (hanya untuk lembar pengajuan klaim)
	 */
	async klaimSpesialistik() {
		return this.send<{ list: ReferensiResult[] }>({
			path: `/referensi/spesialistik`,
			method: 'GET'
		});
	}

	/**
	 * Daftar data ruang rawat (hanya untuk lembar pengajuan klaim)
	 */
	async klaimRuangRawat() {
		return this.send<{ list: ReferensiResult[] }>({
			path: `/referensi/ruangrawat`,
			method: 'GET'
		});
	}

	/**
	 * Daftar data cara keluar (hanya untuk lembar pengajuan klaim)
	 */
	async klaimCaraKeluar() {
		return this.send<{ list: ReferensiResult[] }>({
			path: `/referensi/carakeluar`,
			method: 'GET'
		});
	}

	/**
	 * Daftar data paska pulang (hanya untuk lembar pengajuan klaim)
	 */
	async klaimPaskaPulang() {
		return this.send<{ list: ReferensiResult[] }>({
			path: `/referensi/pacsapulang`,
			method: 'GET'
		});
	}
}

interface ReferensiResult {
	kode: string;
	nama: string;
}
