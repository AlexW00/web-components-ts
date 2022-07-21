import { Observable } from "../events/Observable";

// ====================================================== //
// ====================== LiveValue ====================== //
// ====================================================== //

// Wrapper class to make any object/primitive observable

// Usage:
// 1. create a new LiveValue object: new LiveValue(data)
// 2. to listen for changes, call addEventListener(LiveValue.LIVE_DATA_CHANGED_EVENT, callback) on the LiveValue object
// 3. to get the value of the LiveValue object, call exampleLiveValue.value
// 4. to set the value of the LiveValue object, call exampleLiveValue.value = newValue

export class LiveValue<T> extends Observable {
	static LIVE_DATA_CHANGED_EVENT = "change";
	private _value!: T;

	constructor(value: T) {
		super();
		this._setValue(value);
	}

	private _setValue(value: T): void {
		this._value = typeof value == "object" ? this._createProxy(value) : value;
	}

	private _createProxy(value: Object): T {
		return new Proxy(value, this._proxyHandler) as unknown as T;
	}

	private _proxyHandler = {
		set: (object: any, key: string | symbol, value: any) => {
			if (object[key] !== value) {
				object[key] = value;
				this.notifyAll(LiveValue.LIVE_DATA_CHANGED_EVENT, value);
			}
			return true;
		},

		// return new proxy for nested objects
		// to avoid creating new proxies for already proxied objects the following code was adopted from:
		// https://stackoverflow.com/questions/41299642/how-to-use-javascript-proxy-for-nested-objects
		get: (object: any, key: string | symbol) => {
			if (key == "isProxy") return true;

			const prop = object[key];
			if (typeof prop == "undefined") return;
			else if (!prop.isProxy) {
				if (typeof prop == "object" && prop != null) {
					return this._createProxy(prop);
				}
			}

			return prop;
		},
	};

	get value(): T {
		return this._value;
	}

	set value(value: T) {
		this._setValue(value);
		this.notifyAll(LiveValue.LIVE_DATA_CHANGED_EVENT, this);
	}
}
