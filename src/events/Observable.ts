import { Event } from "./Event";

// ====================================================== //
// ===================== Observable ===================== //
// ====================================================== //

// JS-Class by Alexander Bazo (modified)

export abstract class Observable {
	listener: any = {};

	addEventListener(type: string, callback: Function) {
		if (this.listener[type] === undefined) {
			this.listener[type] = [];
		}
		this.listener[type].push(callback);
	}

	removeEventListener(type: string, callback: Function) {
		if (this.listener[type] !== undefined) {
			for (let i = 0; i < this.listener[type].length; i++) {
				if (this.listener[type][i] === callback) {
					this.listener[type].splice(i, 1);
					return;
				}
			}
		}
	}

	notifyAll(type: string, data: any) {
		const event = new Event(type, data);
		if (this.listener[event.type] !== undefined) {
			for (let i = 0; i < this.listener[event.type].length; i++) {
				this.listener[event.type][i](event);
			}
		}
	}

	clear() {
		this.listener = {};
	}
}
