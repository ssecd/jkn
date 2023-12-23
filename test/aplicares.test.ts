import { describe, expect, it } from 'vitest';
import jkn from './jkn';

describe('Aplicares', () => {
	it('refKamar()', async () => {
		const { response, metadata } = await jkn.aplicares.refKamar();
		expect(response?.list.length).toBe(metadata.totalitems);
	});

	it('create()', async () => {
		const { metadata } = await jkn.aplicares.create({
			kodekelas: 'VIP',
			koderuang: 'R0001',
			namaruang: 'Ruang Sun VIP',
			kapasitas: 5,
			tersedia: 3
		});
		expect(metadata.code).toBe(1);
	});

	it('update()', async () => {
		const { metadata } = await jkn.aplicares.update({
			kodekelas: 'VIP',
			koderuang: 'R0001',
			namaruang: 'Ruang Sun VIP',
			kapasitas: 5,
			tersedia: 1
		});
		expect(metadata.code).toBe(1);
	});

	it('read()', async () => {
		const { response, metadata } = await jkn.aplicares.read({ start: 1, limit: 2 });
		expect(response?.list.length).toBe(metadata.totalitems);
	});

	it('delete()', async () => {
		const { metadata } = await jkn.aplicares.delete({
			kodekelas: 'VIP',
			koderuang: 'R0001'
		});
		expect(metadata.code).toBe(1);
	});
});
