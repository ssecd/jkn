import { Fetcher, SendOption, Type } from './fetcher.js';

export abstract class BaseApi<T extends Type = Type> {
	protected abstract readonly type: T;

	constructor(private readonly fetcher: Fetcher) {}

	send<R>(option: SendOption) {
		return this.fetcher.send<T, R>(this.type, option);
	}
}
