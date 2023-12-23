import { BaseApi } from './base.js';

export class Aplicares extends BaseApi<'aplicares'> {
	protected type = 'aplicares' as const;
}
