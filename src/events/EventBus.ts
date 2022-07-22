import { Observable } from "./Observable";

// ====================================================== //
// ====================== EventBus ====================== //
// ====================================================== //

// Singleton for sending and receiving events globally

// Usage:
// - Send events: EventBus.notifyAll(eventType, eventData)
// - Listen for events: EventBus.addEventListener(eventType, callback)

// Example:
// import { EventBus } from "./EventBus";
// EventBus.addEventListener("someEvent", (data) => {...}) // listen for "someEvent" events
// EventBus.notifyAll("someEvent", {some: "data"}) // send "someEvent" event

class EventBus extends Observable {
	constructor() {
		super();
	}
}

export default new EventBus();
