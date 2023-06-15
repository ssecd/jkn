import { BaseApi } from '../base.js';

export class ApotekBaseApi extends BaseApi<'apotek'> {
	protected type = 'apotek' as const;
}
