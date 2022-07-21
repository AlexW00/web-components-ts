import { Observable } from "./Observable";

// ====================================================== //
// ====================== EventBus ====================== //
// ====================================================== //

// Singleton for sending and receiving events globally

// Usage:
// - Send events: EventBus.notifyAll(eventType, eventData)
// - Listen for events: EventBus.addEventListener(eventType, callback)

class EventBus extends Observable {
	constructor() {
		super();
	}
}

export default new EventBus();
