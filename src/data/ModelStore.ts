import Model from "./Model";
import ExampleModel from "./models/ExampleModel";

// ====================================================== //
// ===================== ModelStore ===================== //
// ====================================================== //

// ModelStore is a singleton that should be used to store all models.

// Usage:
// - Call ModelStore.initModels() at the start of the application
// - Use ModelStore.addModel() to add models to the store
// - Use ModelStore.findModel(), ModelStore.findModels() and ModelStore.getModelById() retrieve models from the store

// Example:
// import ModelStore from "./data/ModelStore";
// import ExampleModel from "./data/models/ExampleModel";
// ModelStore.initModels();
// ModelStore.addModel(new ExampleModel());
// const exampleModel = ModelStore.findModel(
// 	(model) => model.name === "John",
// 	ExampleModel
// );

export default class ModelStore {
	private static _models: Map<string, Model> = new Map<string, Model>();

	// This function is used to initialize all models.
	// It should be called at the start of the application.
	public static async initModels() {
		ModelStore.addModel(new ExampleModel("John", 0));
		ModelStore.addModel(new ExampleModel("Ben", 5));
	}

	// Adds a model to the store.
	public static addModel(model: Model): void {
		this._models.set(model.id, model);
	}

	// Returns a model from the store by its id.
	public static getModelById<M extends Model>(id: string): M | undefined {
		return this._models.get(id) as M;
	}

	// Returns a model from the store, that matches the given predicate.
	// Example: ModelStore.findModel(model => model.name === "John", ExampleModel)
	public static findModel<M extends Model>(
		predicate: (model: M) => boolean,
		classConstructor: new (...args: any[]) => M
	): M | undefined {
		for (const model of this._models.values()) {
			if (model instanceof classConstructor && predicate(model)) {
				return model;
			}
		}
		return undefined;
	}

	// Returns all models from the store, that match the given predicate.
	// -> Like ModelStore.findModel(), but returns all matches.
	public static findModels<M extends Model>(
		predicate: (model: M) => boolean,
		classConstructor: new (...args: any[]) => M
	): M[] {
		const models: M[] = [];
		for (const model of this._models.values()) {
			if (model instanceof classConstructor && predicate(model)) {
				models.push(model);
			}
		}
		return models;
	}
}
