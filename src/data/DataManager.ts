import ExampleModel from "./models/ExampleModel";

export default class DataManager {
	static async init() {
		// Do init stuff here, e.g. db connection
	}

	// Write methods to fetch or save data to Database etc here

	// Returns the example model
	static async getExampleModel(): Promise<ExampleModel> {
		// would query database here or other networking stuff
		return new ExampleModel("John", 0);
	}
}
