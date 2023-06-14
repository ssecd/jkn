import { BaseApi } from '../base.js';

export class VClaimBaseApi extends BaseApi<'apotek'> {
	protected type = 'apotek' as const;
}
