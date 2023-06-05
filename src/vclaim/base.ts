import { BaseApi } from '../base.js';

export class VClaimBaseApi extends BaseApi<'vclaim'> {
	protected type = 'vclaim' as const;
}
