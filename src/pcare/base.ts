import { BaseApi } from '../base.js';

export class PCareBaseApi extends BaseApi<'apotek'> {
	protected type = 'apotek' as const;
}
