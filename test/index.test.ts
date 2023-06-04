import { describe, expect, it } from 'vitest';
import { greeting } from '../src';

describe('greeting', () => {
	it('should return "hello"', () => {
		expect(greeting).toBe('hello');
	});
});
