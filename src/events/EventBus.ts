import { Observable } from "./Observable";

class EventBus extends Observable {
	constructor() {
		super();
	}
}

export default new EventBus();
