// ====================================================== //
// ======================== Event ======================= //
// ====================================================== //

// Modified JS-Class by Alexander Bazo
export class Event {
	type: string;
	data: any;
	constructor(type: string, data: any) {
		this.type = type; // event type
		this.data = data; // extra data (e.g. click event data)
		Object.freeze(this);
	}
}
