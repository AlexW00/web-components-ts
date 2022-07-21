import Model from "../Model";

export default class ExampleModel extends Model {
	constructor(public name: string, public count: number) {
		super();
	}
}
