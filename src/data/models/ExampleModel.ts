import Model from "../Model";

export default class ExampleModel extends Model {
	name: string;
	count: number;

	constructor(name: string, count: number) {
		super();
		this.name = name;
		this.count = count;
	}
}
