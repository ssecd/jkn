import { BaseApi } from '../base.js';

export class PCareBaseApi extends BaseApi<'pcare'> {
	protected type = 'pcare' as const;
}
