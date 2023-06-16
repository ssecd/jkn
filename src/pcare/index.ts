import { SendOption } from '../fetcher.js';
import { PCareBaseApi } from './base.js';

type RequestOption = SendOption;

/**
 * Implement base api directly since this is for partial support
 */
export class PCare extends PCareBaseApi {
	async request<T>(option: RequestOption) {
		return this.send<T>(option);
	}
}
