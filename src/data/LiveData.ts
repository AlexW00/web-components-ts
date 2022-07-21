import { Observable } from "../events/Observable";

// ====================================================== //
// ====================== LiveData ====================== //
// ====================================================== //

// Wrapper class to make any object observable

// Usage:
// 1. create a new LiveData object: new LiveData(data)
// 2. to listen for changes, call addEventListener(LiveData.LIVE_DATA_CHANGED_EVENT, callback) on the LiveData object
// 3. to get the value of the LiveData object, call exampleLiveData.value
// 4. to set the value of the LiveData object, call exampleLiveData.value = newValue

// Note:
// Nested changes to the LiveData object will not trigger the LiveData.LIVE_DATA_CHANGED_EVENT event
// Example: exampleLiveData.value.x = newValue will not trigger an event

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
