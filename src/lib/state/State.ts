import { Observable } from "../events/Observable";

// ====================================================== //
// ====================== State ====================== //
// ====================================================== //

// Wrapper class to make any object/primitive observable

// Usage:
// 1. create a new State object: new State(data)
// 2. to listen for changes, call addEventListener(State.STATE_CHANGE_EVENT, callback) on the State object
// 3. to get the value of the State object, call exampleState.value
// 4. to set the value of the State object, call exampleState.value = newValue

// Example:
// import { State } from "./State";
// let exampleState = new State("some data");
// exampleState.addEventListener(State.STATE_CHANGE_EVENT, (data) => {...}) // listen for State.STATE_CHANGE_EVENT events
// console.log(exampleState.value) // get the value of the State object and print it (-> "some data")
// exampleState.value = "new data" // set the value of the State object (-> automatically notifies all listeners)

export default class State<T> extends Observable {
	static STATE_CHANGE_EVENT = "change";
	private _value!: T;

	private _id: string = ""; // unique id that identifies any state
	private static _stateCounts: Map<string, number> = new Map<string, number>();

	constructor(value: T) {
		super();
		this._generateId()
		this._setValue(value);
	}

	private _setValue(value: T): void {
		this._value = typeof value == "object" ? this._createProxy(value) : value;
	}

	private _createProxy(value: Object): T {
		return new Proxy(value, this._proxyHandler) as T;
	}

	private _proxyHandler = {
		set: (object: any, key: string | symbol, value: any) => {
			if (object[key] !== value) {
				object[key] = value;
				this.notifyAll(State.STATE_CHANGE_EVENT, value);
			}
			return true;
		},

		// return new proxy for nested objects
		// to avoid creating new proxies for already proxied objects, the following code was adopted from:
		// https://stackoverflow.com/questions/41299642/how-to-use-javascript-proxy-for-nested-objects
		get: (object: any, key: string | symbol) => {
			if (key == "isProxy") return true;

			const prop = object[key];
			if (typeof prop == "undefined") return;
			else if (!prop.isProxy) {
				if (typeof prop == "object") {
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
		this.notifyAll(State.STATE_CHANGE_EVENT, this);
	}

	private _generateId() {
		const name = this.constructor.name;
		let count = State._stateCounts.get(name);
		if (count === undefined) {
			count = 0;
		}
		State._stateCounts.set(name, count + 1);
		this._id = name + "-" + count;
		Object.freeze(this._id);
	}


	get id(): string {
		return this._id;
	}
}
