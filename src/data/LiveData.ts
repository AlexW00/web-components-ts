import { Observable } from "../events/Observable";

export default class LiveData<T> extends Observable {
	static LIVE_DATA_CHANGED_EVENT = "live-data-changed";
	private _value: T;

	constructor(value: T) {
		super();
		this._value = value;
	}

	get value(): T {
		return this._value;
	}

	set value(value: T) {
		this._value = value;
		this.notifyAll(LiveData.LIVE_DATA_CHANGED_EVENT, value);
	}
}
