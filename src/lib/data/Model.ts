import ViewModel from "./ViewModel";

// ====================================================== //
// ======================== Model ======================= //
// ====================================================== //

// A model is a basic data structure that can be used to store data.
// Extend it to create your own models. To get/set model values use ViewModels in your application.

export default abstract class Model {
	private _id: string = "";
	private _viewModel: ViewModel<this> | undefined;
	private static _modelCounts: Map<string, number> = new Map<string, number>();

	protected constructor() {
		this._generateId();
	}

	getViewModel(): ViewModel<this> {
		if (!this._viewModel) this._viewModel = new ViewModel(this);
		return this._viewModel;
	}

	private _generateId() {
		const name = this.constructor.name;
		let count = Model._modelCounts.get(name);
		if (count === undefined) {
			count = 0;
		}
		Model._modelCounts.set(name, count + 1);
		this._id = name + "-" + count;
		Object.freeze(this._id);
	}

	get id(): string {
		return this._id;
	}
}
